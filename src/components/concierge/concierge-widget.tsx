'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
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
}

// =============================================================================
// HOOK: useVoiceConversation
// Uses native WebSocket for ElevenLabs Conversational AI
// =============================================================================

function useVoiceConversation(agentId: string | undefined) {
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState<string>('')
  const [agentMessage, setAgentMessage] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const connectionRef = useRef<WebSocket | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const audioQueueRef = useRef<ArrayBuffer[]>([])
  const isPlayingRef = useRef(false)

  // Play audio from queue
  const playNextAudio = useCallback(async () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) return

    const audioData = audioQueueRef.current.shift()
    if (!audioData) return

    isPlayingRef.current = true
    setIsSpeaking(true)

    try {
      const audioContext = new AudioContext()
      const audioBuffer = await audioContext.decodeAudioData(audioData)
      const source = audioContext.createBufferSource()
      source.buffer = audioBuffer
      source.connect(audioContext.destination)

      source.onended = () => {
        isPlayingRef.current = false
        setIsSpeaking(audioQueueRef.current.length > 0)
        playNextAudio()
      }

      source.start()
    } catch (e) {
      console.error('Error playing audio:', e)
      isPlayingRef.current = false
      setIsSpeaking(false)
    }
  }, [])

  const connect = useCallback(async () => {
    if (!agentId) {
      setError('Voice assistant not configured. Using text chat.')
      return
    }

    try {
      setStatus('connecting')
      setError(null)

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        }
      })
      mediaStreamRef.current = stream

      // Create audio context
      audioContextRef.current = new AudioContext({ sampleRate: 16000 })

      // Connect to ElevenLabs WebSocket
      const ws = new WebSocket(
        `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}`
      )

      ws.binaryType = 'arraybuffer'

      ws.onopen = () => {
        setStatus('connected')
        setIsListening(true)

        // Set up audio processing
        if (audioContextRef.current && mediaStreamRef.current) {
          const source = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current)
          const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1)

          processor.onaudioprocess = (e) => {
            if (!isListening) return

            const inputData = e.inputBuffer.getChannelData(0)
            const pcmData = new Int16Array(inputData.length)

            for (let i = 0; i < inputData.length; i++) {
              pcmData[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768))
            }

            if (ws.readyState === WebSocket.OPEN) {
              const base64 = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)))
              ws.send(JSON.stringify({
                type: 'audio',
                audio: base64
              }))
            }
          }

          source.connect(processor)
          processor.connect(audioContextRef.current.destination)
          processorRef.current = processor
        }
      }

      ws.onmessage = (event) => {
        // Handle binary audio data
        if (event.data instanceof ArrayBuffer) {
          audioQueueRef.current.push(event.data)
          playNextAudio()
          return
        }

        // Handle JSON messages
        try {
          const data = JSON.parse(event.data)

          switch (data.type) {
            case 'user_transcript':
              setTranscript(data.text || '')
              break
            case 'agent_response':
              setAgentMessage(prev => prev + (data.text || ''))
              break
            case 'agent_response_end':
              // Response complete
              break
            case 'interruption':
              // User interrupted
              audioQueueRef.current = []
              setIsSpeaking(false)
              break
            case 'error':
              setError(data.message || 'An error occurred')
              break
          }
        } catch (e) {
          // Not JSON, might be binary audio
        }
      }

      ws.onerror = () => {
        setError('Connection error. Please try again.')
        setStatus('disconnected')
      }

      ws.onclose = () => {
        setStatus('disconnected')
        setIsSpeaking(false)
        setIsListening(false)
      }

      connectionRef.current = ws
    } catch (err) {
      console.error('Error connecting:', err)
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        setError('Microphone access denied. Please enable microphone permissions.')
      } else {
        setError('Failed to connect. Please try again.')
      }
      setStatus('disconnected')
    }
  }, [agentId, playNextAudio])

  const disconnect = useCallback(() => {
    if (connectionRef.current) {
      connectionRef.current.close()
      connectionRef.current = null
    }

    if (processorRef.current) {
      processorRef.current.disconnect()
      processorRef.current = null
    }

    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }

    audioQueueRef.current = []
    setStatus('disconnected')
    setIsSpeaking(false)
    setIsListening(false)
    setTranscript('')
    setAgentMessage('')
  }, [])

  const toggleMute = useCallback(() => {
    setIsListening(prev => !prev)
  }, [])

  return {
    status,
    isSpeaking,
    isListening,
    transcript,
    agentMessage,
    error,
    connect,
    disconnect,
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

function PulseButton({ onClick, isActive }: { onClick: () => void; isActive: boolean }) {
  return (
    <m.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors',
        isActive
          ? 'bg-red-500 text-white'
          : 'bg-accent-500 text-white hover:bg-accent-600'
      )}
      aria-label={isActive ? 'Close AI Concierge' : 'Open AI Concierge'}
    >
      {!isActive && (
        <>
          <m.span
            className="absolute inset-0 rounded-full bg-accent-400"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <m.span
            className="absolute inset-0 rounded-full bg-accent-400"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
        </>
      )}
      {isActive ? (
        <X className="h-6 w-6 relative z-10" />
      ) : (
        <Sparkles className="h-6 w-6 relative z-10" />
      )}
    </m.button>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ConciergeWidget({ agentId }: ConciergeWidgetProps) {
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
