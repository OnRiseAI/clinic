import {
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  TRAVEL_READINESS_OPTIONS,
} from '@/lib/validations/enquiry'

interface PatientConfirmationProps {
  patientName: string
  clinicName: string
  procedureInterest: string
  willingToTravel: string
  preferredDestinations: string[]
  budgetRange?: string
  timeline: string
  message?: string
  enquiriesUrl: string
  browseUrl: string
}

function getReadableValue(
  value: string,
  options: readonly { value: string; label: string }[]
): string {
  const option = options.find((o) => o.value === value)
  return option?.label || value
}

export function patientConfirmationTemplate({
  patientName,
  clinicName,
  procedureInterest,
  willingToTravel,
  preferredDestinations,
  budgetRange,
  timeline,
  message,
  enquiriesUrl,
  browseUrl,
}: PatientConfirmationProps): string {
  const destinationsText =
    preferredDestinations.length > 0 ? preferredDestinations.join(', ') : 'No preference'

  const budgetText = budgetRange
    ? getReadableValue(budgetRange, BUDGET_OPTIONS)
    : 'Not specified'

  const timelineText = getReadableValue(timeline, TIMELINE_OPTIONS)
  const travelText = getReadableValue(willingToTravel, TRAVEL_READINESS_OPTIONS)

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enquiry Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
              <div style="margin-bottom: 16px;">
                <div style="display: inline-block; background-color: rgba(255,255,255,0.2); border-radius: 50%; padding: 12px;">
                  <span style="font-size: 32px;">✓</span>
                </div>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                Enquiry Sent Successfully
              </h1>
              <p style="margin: 8px 0 0; color: #ccfbf1; font-size: 14px;">
                Your message is on its way to ${clinicName}
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="background-color: #ffffff; padding: 32px;">
              <p style="margin: 0 0 24px; color: #1c1917; font-size: 16px; line-height: 1.6;">
                Hi ${patientName},
              </p>
              <p style="margin: 0 0 24px; color: #57534e; font-size: 15px; line-height: 1.6;">
                Thank you for your interest in <strong style="color: #1c1917;">${clinicName}</strong>.
                We've sent your enquiry and the clinic will be in touch with you soon.
              </p>

              <!-- Response Time Notice -->
              <div style="background-color: #f0fdfa; border-left: 4px solid #0d9488; padding: 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #0f766e; font-size: 14px;">
                  <strong>Expected response time:</strong> Most clinics respond within 24 hours.
                </p>
              </div>

              <!-- Enquiry Summary -->
              <h2 style="margin: 0 0 16px; color: #1c1917; font-size: 16px; font-weight: 600;">
                Your Enquiry Summary
              </h2>

              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fafaf9; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px; border-bottom: 1px solid #e7e5e4;">
                    <span style="color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Clinic</span>
                    <p style="margin: 4px 0 0; color: #1c1917; font-size: 15px; font-weight: 500;">
                      ${clinicName}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; border-bottom: 1px solid #e7e5e4;">
                    <span style="color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Procedure</span>
                    <p style="margin: 4px 0 0; color: #1c1917; font-size: 15px; font-weight: 500;">
                      ${procedureInterest}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; border-bottom: 1px solid #e7e5e4;">
                    <span style="color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Travel Readiness</span>
                    <p style="margin: 4px 0 0; color: #1c1917; font-size: 15px; font-weight: 500;">
                      ${travelText}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; border-bottom: 1px solid #e7e5e4;">
                    <span style="color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Preferred Destinations</span>
                    <p style="margin: 4px 0 0; color: #1c1917; font-size: 15px; font-weight: 500;">
                      ${destinationsText}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; border-bottom: 1px solid #e7e5e4;">
                    <span style="color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Budget</span>
                    <p style="margin: 4px 0 0; color: #1c1917; font-size: 15px; font-weight: 500;">
                      ${budgetText}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px;${message ? ' border-bottom: 1px solid #e7e5e4;' : ''}">
                    <span style="color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Timeline</span>
                    <p style="margin: 4px 0 0; color: #1c1917; font-size: 15px; font-weight: 500;">
                      ${timelineText}
                    </p>
                  </td>
                </tr>
                ${message
      ? `
                <tr>
                  <td style="padding: 16px;">
                    <span style="color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Your Message</span>
                    <p style="margin: 4px 0 0; color: #57534e; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">
                      ${message}
                    </p>
                  </td>
                </tr>
                `
      : ''
    }
              </table>

              <!-- CTA Buttons -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="${enquiriesUrl}" style="display: inline-block; background-color: #f97316; color: #ffffff; padding: 14px 32px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px; margin-bottom: 12px;">
                  View Your Enquiries
                </a>
                <br>
                <a href="${browseUrl}" style="display: inline-block; color: #0d9488; padding: 14px 32px; font-size: 14px; font-weight: 500; text-decoration: none;">
                  Continue Browsing Clinics →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f5f4; padding: 24px 32px; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0 0 8px; color: #78716c; font-size: 12px;">
                Need help? Reply to this email or contact our support team.
              </p>
              <p style="margin: 0; color: #a8a29e; font-size: 11px;">
                © MeetYourClinic — Your trusted medical tourism companion.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}
