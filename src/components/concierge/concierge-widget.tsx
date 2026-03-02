'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { useConversation } from '@elevenlabs/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Mic,
  MicOff,
  X,
  Send,
  Volume2,
  VolumeX,
  Loader2,
  AlertCircle,
  RefreshCw,
  Keyboard,
  PhoneCall,
  Sparkles
} from 'lucide-react'
import { Link } from '@/i18n/navigation'

// =============================================================================
// TYPES
// =============================================================================

type WidgetState = 'idle' | 'listening' | 'speaking' | 'loading' | 'error' | 'text'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  clinicLinks?: Array<{ name: string; slug: string; category?: string }>
}

interface ConciergeWidgetProps {
  agentId?: string
  headshotSrc?: string
}

interface EnquiryPrefillPayload {
  fullName?: string
  email?: string
  phone?: string
  procedureInterest?: string
  timeline?: string
  message?: string
  country?: string
  jumpToContact?: boolean
}

const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
const PHONE_REGEX = /(\+?\d[\d\s().-]{7,}\d)/i

// =============================================================================
// HOOK: useVoiceConversation
// Uses native WebSocket for ElevenLabs Conversational AI
// =============================================================================

function useVoiceConversation(agentId: string | undefined) {
  const [transcript, setTranscript] = useState<string>('')
  const [agentMessage, setAgentMessage] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [micMuted, setMicMuted] = useState(false)
  const [enquiryPrefill, setEnquiryPrefill] = useState<EnquiryPrefillPayload | null>(null)
  const enquiryPrefillRef = useRef<EnquiryPrefillPayload | null>(null)

  useEffect(() => {
    enquiryPrefillRef.current = enquiryPrefill
  }, [enquiryPrefill])

  const normalizePrefillPayload = useCallback((raw: unknown): EnquiryPrefillPayload => {
    if (!raw || typeof raw !== 'object') return {}
    const input = raw as Record<string, unknown>
    const asString = (value: unknown) => (typeof value === 'string' ? value : undefined)
    const asBool = (value: unknown) => (typeof value === 'boolean' ? value : undefined)

    return {
      fullName: asString(input.fullName ?? input.full_name ?? input.name),
      email: asString(input.email),
      phone: asString(input.phone ?? input.phoneNumber ?? input.phone_number),
      procedureInterest: asString(input.procedureInterest ?? input.procedure_interest ?? input.procedure),
      timeline: asString(input.timeline),
      message: asString(input.message ?? input.notes),
      country: asString(input.country),
      jumpToContact: asBool(input.jumpToContact ?? input.jump_to_contact),
    }
  }, [])

  const inferPrefillFromText = useCallback((text: string): EnquiryPrefillPayload => {
    const lower = text.toLowerCase()
    const inferred: EnquiryPrefillPayload = {}

    const email = text.match(EMAIL_REGEX)?.[0]
    if (email) inferred.email = email

    const phone = text.match(PHONE_REGEX)?.[0]
    if (phone) inferred.phone = phone.trim()

    const nameMatch =
      text.match(/(?:my name is|i am|i'm)\s+([a-z][a-z\s'-]{1,60})/i) ||
      text.match(/name[:\s]+([a-z][a-z\s'-]{1,60})/i)
    if (nameMatch?.[1]) {
      inferred.fullName = nameMatch[1].trim().replace(/\s{2,}/g, ' ')
    }

    const procedureMatch =
      text.match(/(?:interested in|looking for|need|want)\s+([a-z][a-z\s-]{2,60})/i) ||
      text.match(/\b(dental veneers|veneers|implants|hair transplant|rhinoplasty|ivf|bbl|liposuction)\b/i)
    if (procedureMatch?.[1]) {
      inferred.procedureInterest = procedureMatch[1].trim()
    }

    if (/(within\s*1[-–]?\s*3\s*months|1[-–]?\s*3\s*months)/i.test(lower)) {
      inferred.timeline = '1_3_months'
    } else if (/(within\s*1\s*month|as soon as possible|urgent)/i.test(lower)) {
      inferred.timeline = 'within_1_month'
    } else if (/(3[-–]?\s*6\s*months)/i.test(lower)) {
      inferred.timeline = '3_6_months'
    } else if (/(research|just browsing|just exploring)/i.test(lower)) {
      inferred.timeline = 'researching'
    }

    return inferred
  }, [])

  const applyPrefillToForm = useCallback((payload?: EnquiryPrefillPayload) => {
    const nextPayload = payload || enquiryPrefillRef.current
    if (!nextPayload) return false
    window.dispatchEvent(
      new CustomEvent('prefill-enquiry-form', {
        detail: {
          ...nextPayload,
          jumpToContact: nextPayload.jumpToContact ?? true,
        },
      })
    )
    return true
  }, [])

  const handleClientToolCall = useCallback((toolName: string, rawParameters: unknown) => {
    let parameters: unknown = {}

    if (typeof rawParameters === 'string') {
      try {
        parameters = JSON.parse(rawParameters)
      } catch {
        parameters = {}
      }
    } else {
      parameters = rawParameters
    }

    if (toolName === 'prefill_enquiry_form') {
      const normalized = normalizePrefillPayload(parameters)
      setEnquiryPrefill((prev) => {
        const merged: EnquiryPrefillPayload = { ...(prev || {}), ...normalized }
        enquiryPrefillRef.current = merged
        return merged
      })
      return 'Captured lead details. Ask the user to tap "Apply to form" to continue.'
    }

    if (toolName === 'apply_enquiry_prefill') {
      const normalized = normalizePrefillPayload(parameters)
      const candidate =
        Object.keys(normalized).length > 0
          ? { ...(enquiryPrefillRef.current || {}), ...normalized }
          : enquiryPrefillRef.current || undefined
      const applied = applyPrefillToForm(candidate)
      return applied
        ? 'Applied captured details to the enquiry form.'
        : 'No captured lead details are available yet.'
    }

    return `Unknown client tool: ${toolName}`
  }, [applyPrefillToForm, normalizePrefillPayload])

  const mergePrefill = useCallback((partial: EnquiryPrefillPayload) => {
    if (Object.keys(partial).length === 0) return
    setEnquiryPrefill((prev) => {
      const merged = { ...(prev || {}), ...partial }
      enquiryPrefillRef.current = merged
      return merged
    })
  }, [])

  const conversation = useConversation({
    micMuted,
    clientTools: {
      // Tool name should match ElevenLabs agent tool config.
      prefill_enquiry_form: (parameters: EnquiryPrefillPayload) => {
        return handleClientToolCall('prefill_enquiry_form', parameters)
      },
      // Optional helper tool to let the agent trigger immediate prefill.
      apply_enquiry_prefill: () => {
        return handleClientToolCall('apply_enquiry_prefill', {})
      },
    },
    // Defensive fallback: handle tool calls even if ElevenLabs marks them unhandled.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUnhandledClientToolCall: (toolCall: any) => {
      const toolName = String(toolCall?.tool_name || toolCall?.name || '')
      void handleClientToolCall(toolName, toolCall?.parameters)
    },
    onConnect: () => {
      setError(null)
    },
    onDisconnect: () => {
      setMicMuted(false)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onMessage: (message: any) => {
      const text: string | undefined =
        typeof message?.message === 'string'
          ? message.message
          : typeof message?.text === 'string'
            ? message.text
            : typeof message?.transcript === 'string'
              ? message.transcript
              : undefined

      if (!text) return

      const source = String(message?.source || message?.role || message?.type || '').toLowerCase()
      if (source.includes('user') || source.includes('transcript')) {
        mergePrefill(inferPrefillFromText(text))
        if (/(yes|yeah|yep|go ahead|apply|fill( it)?( in)?)/i.test(text)) {
          void applyPrefillToForm()
        }
        setTranscript(text)
        return
      }

      if (/(i('|’)ve applied|applied your details|details have been applied)/i.test(text)) {
        void applyPrefillToForm()
      }
      setAgentMessage((prev) => (prev ? `${prev} ${text}` : text))
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (e: any) => {
      const message =
        typeof e?.message === 'string' ? e.message : typeof e === 'string' ? e : 'Connection error. Please try again.'
      setError(message)
    },
  })

  const connect = useCallback(async () => {
    if (!agentId) {
      setError('Voice assistant not configured. Using text chat.')
      return
    }

    try {
      setError(null)
      setTranscript('')
      setAgentMessage('')
      setEnquiryPrefill(null)
      enquiryPrefillRef.current = null

      await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      })

      await conversation.startSession({
        agentId,
        connectionType: 'webrtc',
        // Also pass tools at session start for compatibility across SDK/runtime paths.
        clientTools: {
          prefill_enquiry_form: (parameters: EnquiryPrefillPayload) =>
            handleClientToolCall('prefill_enquiry_form', parameters),
          apply_enquiry_prefill: () =>
            handleClientToolCall('apply_enquiry_prefill', {}),
        },
      })
    } catch (err) {
      console.error('Error connecting:', err)
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        setError('Microphone access denied. Please enable microphone permissions.')
      } else {
        const message = err instanceof Error ? err.message : 'Failed to connect. Please try again.'
        setError(message)
      }
    }
  }, [agentId, conversation, handleClientToolCall])

  const disconnect = useCallback(() => {
    void conversation.endSession()
    setMicMuted(false)
    setTranscript('')
    setAgentMessage('')
    setEnquiryPrefill(null)
    enquiryPrefillRef.current = null
  }, [conversation])

  const toggleMute = useCallback(() => {
    setMicMuted((prev) => !prev)
  }, [])

  return {
    status: conversation.status as 'disconnected' | 'connecting' | 'connected',
    isSpeaking: conversation.isSpeaking,
    isListening: conversation.status === 'connected' && !micMuted,
    transcript,
    agentMessage,
    enquiryPrefill,
    error,
    connect,
    disconnect,
    applyPrefillToForm,
    toggleMute,
  }
}

// =============================================================================
// HOOK: useTextChat
// =============================================================================

function useTextChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const sessionIdRef = useRef<string>('')

  useEffect(() => {
    // Generate session ID on mount
    sessionIdRef.current = `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Add initial greeting
    setMessages([{
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your medical tourism advisor. I can help you find the right clinic abroad for your needs. What treatment are you looking for?",
      timestamp: new Date(),
    }])

    // Create session
    fetch('/api/concierge/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionIdRef.current, mode: 'text' }),
    }).catch(console.error)
  }, [])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await generateResponse(content.trim(), messages)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        clinicLinks: response.clinicLinks,
      }

      setMessages(prev => [...prev, assistantMessage])

      // Update session
      fetch('/api/concierge/session', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionIdRef.current,
          turns: messages.length + 2,
          clinics_recommended: response.clinicLinks?.map(c => c.slug) || [],
        }),
      }).catch(console.error)

    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return { messages, sendMessage, isLoading }
}

// Keyword-based response generator
async function generateResponse(
  userMessage: string,
  _history: Message[]
): Promise<{ content: string; clinicLinks?: Array<{ name: string; slug: string; category?: string }> }> {
  const lower = userMessage.toLowerCase()

  // Check for procedure keywords
  const procedures = ['dental', 'veneers', 'implants', 'hair', 'transplant', 'rhinoplasty', 'liposuction', 'tummy tuck', 'facelift', 'lasik', 'ivf', 'cosmetic', 'plastic surgery', 'nose', 'teeth', 'smile']
  const foundProcedure = procedures.find(p => lower.includes(p))

  // Check for country keywords
  const countries = ['turkey', 'mexico', 'spain', 'thailand', 'poland', 'hungary', 'czech', 'croatia', 'portugal']
  const foundCountry = countries.find(c => lower.includes(c))

  if (foundProcedure) {
    try {
      const response = await fetch('/api/concierge/search-clinics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          procedure: foundProcedure,
          country: foundCountry,
          limit: 3,
        }),
      })

      const data = await response.json()

      if (data.clinics && data.clinics.length > 0) {
        const clinicList = data.clinics.map((c: { name: string; rating: number | null; city: string | null; country: string | null; price_range: string | null; accreditations: string[] }, i: number) => {
          const rating = c.rating ? `⭐ ${c.rating.toFixed(1)}` : ''
          const location = [c.city, c.country].filter(Boolean).join(', ')
          const price = c.price_range || ''
          const accred = c.accreditations.length > 0 ? `✓ ${c.accreditations[0]}` : ''

          return `**${i + 1}. ${c.name}**\n   📍 ${location} ${rating}\n   ${[price, accred].filter(Boolean).join(' • ')}`
        }).join('\n\n')

        const intro = foundCountry
          ? `${foundCountry.charAt(0).toUpperCase() + foundCountry.slice(1)} is an excellent choice for ${foundProcedure}!`
          : `I found some great clinics for ${foundProcedure}.`

        return {
          content: `${intro}\n\nHere are my top recommendations:\n\n${clinicList}\n\nWould you like more details about any of these, or shall I help you send an enquiry?`,
          clinicLinks: data.clinics.map((c: { name: string; slug: string; category_slug?: string }) => ({ name: c.name, slug: c.slug, category: c.category_slug || 'dental' })),
        }
      }
    } catch (error) {
      console.error('Error searching clinics:', error)
    }
  }

  // Destination questions
  if (lower.includes('where') || lower.includes('destination') || lower.includes('country') || lower.includes('best place') || lower.includes('recommend')) {
    return {
      content: "The best destination depends on your treatment! Here are top choices:\n\n🇹🇷 **Turkey** — Hair transplants, dental work, cosmetic surgery\n🇲🇽 **Mexico** — Dental, bariatric surgery (close to US)\n🇹🇭 **Thailand** — Cosmetic surgery, world-class hospitals\n🇪🇸 **Spain** — High quality, easy for Europeans\n🇭🇺 **Hungary** — Dental capital of Europe\n\nWhat treatment are you considering? I can recommend the best destinations for your needs.",
    }
  }

  // Cost/price questions
  if (lower.includes('cost') || lower.includes('price') || lower.includes('how much') || lower.includes('expensive') || lower.includes('cheap') || lower.includes('save') || lower.includes('budget')) {
    return {
      content: "Medical tourism typically saves 40-80% compared to UK/US prices! Examples:\n\n🦷 **Dental veneers**: £800/tooth UK → €200-400 Turkey\n💇 **Hair transplant**: £8000+ UK → €2000-4000 Turkey\n👃 **Rhinoplasty**: £6000+ UK → €2500-4000 abroad\n\nWhat specific treatment interests you? I can give you accurate pricing.",
    }
  }

  // Safety/quality questions
  if (lower.includes('safe') || lower.includes('quality') || lower.includes('accredited') || lower.includes('trust') || lower.includes('risk') || lower.includes('reliable')) {
    return {
      content: "Safety is our top priority! Here's how we ensure quality:\n\n✅ **JCI Accreditation** — Gold standard in global healthcare\n✅ **Verified Reviews** — Real Google reviews from patients\n✅ **Qualified Doctors** — We verify credentials\n✅ **Claimed Profiles** — Clinics verify their info\n\nAll our recommended clinics meet strict quality standards. What procedure are you considering?",
    }
  }

  // Enquiry/contact
  if (lower.includes('enquiry') || lower.includes('contact') || lower.includes('book') || lower.includes('appointment')) {
    return {
      content: "I'd be happy to help you reach out to clinics! Here's how it works:\n\n1. Tell me which clinic interests you\n2. I'll show you their profile with full details\n3. You can send an enquiry directly through their profile\n4. They typically respond within 24-48 hours\n\nWhich clinic would you like to contact?",
    }
  }

  // Greeting
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower === 'help') {
    return {
      content: "Hello! 👋 I'm here to help you find the perfect clinic abroad.\n\nI can help with:\n• Finding clinics for your treatment\n• Comparing destinations\n• Understanding costs and savings\n• Answering questions about medical tourism\n\nWhat treatment are you interested in?",
    }
  }

  // Thank you
  if (lower.includes('thank') || lower.includes('thanks')) {
    return {
      content: "You're welcome! 😊 Is there anything else I can help you with? I'm happy to find more clinics, compare options, or answer any other questions.",
    }
  }

  // Default response
  return {
    content: "I'd love to help you find the right clinic! To give you the best recommendations, could you tell me:\n\n1. What treatment are you looking for?\n2. Do you have a preferred destination?\n3. What's your approximate budget?\n\nFeel free to ask anything about medical tourism!",
  }
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function WaveformAnimation({ isActive, color = 'primary' }: { isActive: boolean; color?: 'primary' | 'accent' }) {
  const colorClass = color === 'accent' ? 'bg-accent-500' : 'bg-primary-500'

  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {[...Array(7)].map((_, i) => (
        <m.div
          key={i}
          className={cn('w-1 rounded-full', colorClass)}
          animate={{
            height: isActive ? [8, 24 + Math.random() * 24, 8] : 8,
          }}
          transition={{
            duration: 0.5,
            repeat: isActive ? Infinity : 0,
            delay: i * 0.08,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function PulseButton({
  onClick,
  isActive,
  headshotSrc,
}: {
  onClick: () => void
  isActive: boolean
  headshotSrc?: string
}) {
  return (
    <m.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative w-[220px] overflow-hidden rounded-2xl border text-left shadow-xl transition-all',
        isActive
          ? 'border-red-300 bg-red-50'
          : 'border-accent-200 bg-white hover:border-accent-300 hover:shadow-2xl'
      )}
      aria-label={isActive ? 'Close AI Concierge' : 'Talk to AI Concierge'}
    >
      {!isActive && (
        <m.span
          className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-accent-200"
          animate={{ opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <div className="relative z-10 flex items-center gap-3 p-3">
        <div className="h-14 w-14 overflow-hidden rounded-xl border border-accent-200 bg-accent-50">
          {headshotSrc ? (
            <img
              src={headshotSrc}
              alt="AI concierge assistant"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-accent-700">
              <Sparkles className="h-6 w-6" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-700">
            Instant Help
          </p>
          <p className="truncate text-sm font-semibold text-neutral-900">
            Talk to our AI concierge
          </p>
          <p className="text-xs text-neutral-600">Voice-first support</p>
        </div>
      </div>
    </m.button>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ConciergeWidget({
  agentId,
  headshotSrc = '/headshot-example-4-removebg-preview.png',
}: ConciergeWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<'voice' | 'text'>(agentId ? 'voice' : 'text')
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const voice = useVoiceConversation(agentId)
  const textChat = useTextChat()

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [textChat.messages])

  // Listen for global open events
  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-concierge', handleOpen)
    return () => window.removeEventListener('open-concierge', handleOpen)
  }, [])

  // Auto-switch to text if voice errors
  useEffect(() => {
    if (voice.error && !agentId) {
      setMode('text')
    }
  }, [voice.error, agentId])

  // Determine widget state
  const getWidgetState = (): WidgetState => {
    if (mode === 'text') return 'text'
    if (voice.error) return 'error'
    if (voice.status === 'connecting') return 'loading'
    if (voice.isSpeaking) return 'speaking'
    if (voice.status === 'connected') return 'listening'
    return 'idle'
  }

  const widgetState = getWidgetState()

  const handleVoiceToggle = () => {
    if (voice.status === 'connected') {
      voice.disconnect()
    } else {
      voice.connect()
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      textChat.sendMessage(inputValue)
      setInputValue('')
    }
  }

  const handleClose = () => {
    voice.disconnect()
    setIsOpen(false)
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                'overflow-hidden bg-white shadow-2xl flex flex-col',
                // Mobile: fullscreen overlay
                'fixed inset-4 rounded-2xl',
                // Desktop: anchored panel
                'sm:absolute sm:inset-auto sm:bottom-16 sm:right-0 sm:mb-2',
                'sm:w-[400px] sm:max-h-[500px] sm:rounded-2xl'
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-100 bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Concierge</h3>
                    <p className="text-xs text-primary-100">
                      {widgetState === 'listening' && '🎤 Listening...'}
                      {widgetState === 'speaking' && '🔊 Speaking...'}
                      {widgetState === 'loading' && '⏳ Connecting...'}
                      {widgetState === 'text' && '💬 Text chat'}
                      {widgetState === 'idle' && '🎙️ Click mic to start'}
                      {widgetState === 'error' && '⚠️ Connection issue'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {mode === 'voice' && voice.status === 'connected' && (
                    <button
                      onClick={voice.toggleMute}
                      className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                      aria-label={voice.isListening ? 'Mute microphone' : 'Unmute microphone'}
                    >
                      {voice.isListening ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                    </button>
                  )}
                  <button
                    onClick={handleClose}
                    className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden flex flex-col">
                {mode === 'voice' ? (
                  // Voice Mode
                  <div className="flex h-full flex-col">
                    {/* Voice Visualization */}
                    <div className="flex flex-1 flex-col items-center justify-center p-6">
                      {widgetState === 'error' ? (
                        <div className="text-center">
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                            <AlertCircle className="h-8 w-8 text-red-500" />
                          </div>
                          <p className="text-neutral-600 mb-4">{voice.error}</p>
                          <div className="flex gap-3 justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleVoiceToggle}
                            >
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Retry
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => setMode('text')}
                            >
                              Use Text Chat
                            </Button>
                          </div>
                        </div>
                      ) : widgetState === 'loading' ? (
                        <div className="text-center">
                          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary-500" />
                          <p className="mt-4 text-neutral-600">Connecting to voice assistant...</p>
                        </div>
                      ) : (
                        <>
                          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-accent-100">
                            <WaveformAnimation
                              isActive={widgetState === 'speaking' || widgetState === 'listening'}
                              color={widgetState === 'speaking' ? 'accent' : 'primary'}
                            />
                          </div>

                          {voice.status === 'connected' && (
                            <div className="w-full max-w-sm space-y-3">
                              {voice.transcript && (
                                <div className="rounded-lg bg-primary-50 p-3">
                                  <p className="text-xs text-primary-600 font-medium mb-1">You said:</p>
                                  <p className="text-sm text-neutral-700">{voice.transcript}</p>
                                </div>
                              )}
                              {voice.agentMessage && (
                                <div className="rounded-lg bg-accent-50 p-3">
                                  <p className="text-xs text-accent-600 font-medium mb-1">Assistant:</p>
                                  <p className="text-sm text-neutral-700">{voice.agentMessage}</p>
                                </div>
                              )}
                              {voice.enquiryPrefill && (
                                <div className="rounded-lg border border-primary-200 bg-primary-50 p-3 text-left">
                                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">
                                    Quote Draft Ready
                                  </p>
                                  <div className="mt-2 space-y-1 text-xs text-neutral-700">
                                    {voice.enquiryPrefill.fullName && <p>Name: {voice.enquiryPrefill.fullName}</p>}
                                    {voice.enquiryPrefill.email && <p>Email: {voice.enquiryPrefill.email}</p>}
                                    {voice.enquiryPrefill.phone && <p>Phone: {voice.enquiryPrefill.phone}</p>}
                                    {voice.enquiryPrefill.procedureInterest && <p>Procedure: {voice.enquiryPrefill.procedureInterest}</p>}
                                    {voice.enquiryPrefill.timeline && <p>Timeline: {voice.enquiryPrefill.timeline}</p>}
                                  </div>
                                  <Button
                                    className="mt-3 w-full"
                                    size="sm"
                                    variant="primary"
                                    onClick={() => {
                                      voice.applyPrefillToForm()
                                    }}
                                  >
                                    Apply to Form
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}

                          {widgetState === 'idle' && (
                            <div className="text-center">
                              <p className="text-neutral-600 mb-2">
                                Click the microphone to start
                              </p>
                              <p className="text-sm text-neutral-400">
                                Ask about treatments, clinics, or destinations
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Voice Controls */}
                    <div className="border-t border-neutral-100 bg-neutral-50 p-4">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={handleVoiceToggle}
                          disabled={widgetState === 'loading'}
                          className={cn(
                            'flex h-14 w-14 items-center justify-center rounded-full transition-all',
                            voice.status === 'connected'
                              ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-200'
                              : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200',
                            widgetState === 'loading' && 'opacity-50 cursor-not-allowed'
                          )}
                          aria-label={voice.status === 'connected' ? 'End call' : 'Start call'}
                        >
                          {voice.status === 'connected' ? (
                            <PhoneCall className="h-6 w-6" />
                          ) : (
                            <Mic className="h-6 w-6" />
                          )}
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          voice.disconnect()
                          setMode('text')
                        }}
                        className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                      >
                        <Keyboard className="h-4 w-4" />
                        Prefer to type? Switch to text
                      </button>
                    </div>
                  </div>
                ) : (
                  // Text Mode
                  <div className="flex h-full flex-col">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {textChat.messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            'flex',
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                          )}
                        >
                          <div
                            className={cn(
                              'max-w-[85%] rounded-2xl px-4 py-2.5',
                              message.role === 'user'
                                ? 'bg-primary-600 text-white'
                                : 'bg-neutral-100 text-neutral-900'
                            )}
                          >
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                            {message.clinicLinks && message.clinicLinks.length > 0 && (
                              <div className="mt-3 pt-2 border-t border-neutral-200/50 space-y-1.5">
                                {message.clinicLinks.map((clinic) => (
                                  <Link
                                    key={clinic.slug}
                                    href={`/clinics/${clinic.category || 'dental'}/${clinic.slug}`}
                                    className="flex items-center gap-1 text-xs font-medium text-primary-700 hover:text-primary-800"
                                  >
                                    View {clinic.name} →
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {textChat.isLoading && (
                        <div className="flex justify-start">
                          <div className="rounded-2xl bg-neutral-100 px-4 py-3">
                            <div className="flex gap-1">
                              <m.div
                                className="w-2 h-2 bg-neutral-400 rounded-full"
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                              />
                              <m.div
                                className="w-2 h-2 bg-neutral-400 rounded-full"
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                              />
                              <m.div
                                className="w-2 h-2 bg-neutral-400 rounded-full"
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Text Input */}
                    <div className="border-t border-neutral-100 bg-white p-4">
                      <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Ask about treatments, clinics..."
                          className="flex-1 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all"
                          disabled={textChat.isLoading}
                        />
                        <button
                          type="submit"
                          disabled={!inputValue.trim() || textChat.isLoading}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white transition-all hover:bg-primary-700 disabled:bg-neutral-200 disabled:text-neutral-400"
                          aria-label="Send message"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </form>
                      {agentId && (
                        <button
                          onClick={() => setMode('voice')}
                          className="mt-3 flex w-full items-center justify-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                        >
                          <Mic className="h-4 w-4" />
                          Switch to voice
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <AnimatePresence mode="wait">
          {!isOpen && (
            <PulseButton
              onClick={() => setIsOpen(true)}
              isActive={false}
              headshotSrc={headshotSrc}
            />
          )}
          {isOpen && (
            <m.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClose}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-800 text-white shadow-lg hover:bg-neutral-900 transition-colors"
              aria-label="Close AI Concierge"
            >
              <X className="h-6 w-6" />
            </m.button>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  )
}
