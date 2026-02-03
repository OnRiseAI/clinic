import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromNumber = process.env.TWILIO_PHONE_NUMBER

let client: twilio.Twilio | null = null

function getClient() {
  if (!client && accountSid && authToken) {
    client = twilio(accountSid, authToken)
  }
  return client
}

export interface SendSmsOptions {
  to: string
  message: string
}

export async function sendSms({ to, message }: SendSmsOptions): Promise<boolean> {
  const twilioClient = getClient()

  if (!twilioClient || !fromNumber) {
    console.warn('SMS service not configured. Skipping SMS notification.')
    return false
  }

  // Validate phone number format
  const cleanedNumber = to.replace(/[^\d+]/g, '')
  if (!cleanedNumber.startsWith('+')) {
    console.warn('Invalid phone number format. Phone numbers must include country code.')
    return false
  }

  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: fromNumber,
      to: cleanedNumber,
    })

    console.log(`SMS sent successfully. SID: ${result.sid}`)
    return true
  } catch (error) {
    console.error('Failed to send SMS:', error)
    return false
  }
}

export function formatClinicNotificationSms(
  patientName: string,
  procedureInterest: string
): string {
  const platformName = process.env.PLATFORM_NAME || 'MediTravel'
  return `New patient enquiry on ${platformName}! ${patientName} is interested in ${procedureInterest}. Check your dashboard or email for details.`
}
