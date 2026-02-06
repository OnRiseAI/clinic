import Imap from 'imapflow'
import { simpleParser } from 'mailparser'
import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const supabaseUrl = process.env.SUPABASE_URL || 'https://dpewhfmgipjympxlxwij.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)
const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

async function parseAlert(email) {
  const text = email.text || ''
  const html = email.html || ''

  const queryMatch = email.subject.match(/Google Alert for:\s*(.+)/i)
  const query = queryMatch ? queryMatch[1].trim() : ''

  const urlMatch = text.match(/https?:\/\/[^\s\n]+/i) || html.match(/https?:\/\/[^\s\n]+/i)
  const url = urlMatch ? urlMatch[0] : ''

  let title = query
  let snippet = text.substring(0, 500)

  if (html) {
    const titleMatch = html.match(/<h3[^>]*>(.*?)<\/h3>/i)
    if (titleMatch) title = titleMatch[1].replace(/<[^>]+>/g, '').trim()

    const snippetMatch = html.match(/<p[^>]*>(.*?)<\/p>/i)
    if (snippetMatch) snippet = snippetMatch[1].replace(/<[^>]+>/g, '').trim()
  }

  return { query, url, title, snippet, date: email.date }
}

async function generateContentIdea(alert) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a medical tourism content strategist. Return valid JSON.' },
      {
        role: 'user',
        content: `Generate blog post idea from this alert: ${JSON.stringify(alert)}. Return JSON with: suggested_title, target_keywords, target_audience, search_intent, suggested_outline, word_count_estimate, seo_priority_score, topic, urgency`
      }
    ],
    temperature: 0.7,
    max_tokens: 1500,
    response_format: { type: 'json_object' }
  })

  return JSON.parse(response.choices[0].message.content)
}

function generateSlug(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').substring(0, 100)
}

async function saveContentIdea(alert, idea) {
  await supabase.from('content_ideas').insert({
    title: `Content Idea: ${alert.title}`,
    slug: generateSlug(idea.suggested_title),
    source: 'google_alerts',
    topic: idea.topic,
    urgency: idea.urgency,
    alert_query: alert.query,
    alert_date: alert.date?.toISOString(),
    original_url: alert.url,
    source_title: alert.title,
    source_snippet: alert.snippet,
    target_keywords: idea.target_keywords,
    target_audience: idea.target_audience,
    search_intent: idea.search_intent,
    suggested_title: idea.suggested_title,
    suggested_outline: idea.suggested_outline,
    word_count_estimate: idea.word_count_estimate,
    seo_priority_score: idea.seo_priority_score,
    status: 'pending'
  })
}

async function markAsRead(client, uid) {
  await client.messageStoreFlags(uid, ['\\Seen'], false)
}

async function runAutomation() {
  let processed = 0, skipped = 0, errors = 0

  const client = new Imap({
    host: 'imap.gmail.com', port: 993, secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    logger: false
  })

  try {
    await client.connect()
    await client.mailboxOpen('INBOX')

    const messages = await client.search({
      from: 'googlealerts-noreply@google.com',
      seen: false
    })

    console.log(`Found ${messages.length} unread Google Alerts`)

    for (const uid of messages) {
      const message = await client.fetchOne(uid, { source: true })
      const email = await simpleParser(message.source)

      try {
        const alert = parseAlert(email)

        if (!alert.query) {
          console.log('Skipped: not an alert')
