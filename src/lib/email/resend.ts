import { Resend } from 'resend'

// Lazy initialization to avoid build-time errors
let resend: Resend | null = null

function getResendClient() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn('RESEND_API_KEY not configured. Email sending will be disabled.')
      return null
    }
    resend = new Resend(apiKey)
  }
  return resend
}

export interface SendEmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
  const client = getResendClient()

  if (!client) {
    console.warn('Email service not configured. Skipping email to:', to)
    return null
  }

  const fromEmail = from || process.env.EMAIL_FROM || 'MeetYourClinic <noreply@meetyourclinic.com>'

  try {
    const { data, error } = await client.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
    })

    if (error) {
      console.error('Failed to send email:', error)
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
}
