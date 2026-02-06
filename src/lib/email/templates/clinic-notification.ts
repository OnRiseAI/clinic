import {
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  TRAVEL_READINESS_OPTIONS,
} from '@/lib/validations/enquiry'

interface ClinicNotificationProps {
  patientName: string
  patientEmail: string
  patientPhone: string
  procedureInterest: string
  willingToTravel: string
  preferredDestinations: string[]
  budgetRange?: string
  timeline: string
  message?: string
  clinicName: string
  dashboardUrl: string
}

function getReadableValue(
  value: string,
  options: readonly { value: string; label: string }[]
): string {
  const option = options.find((o) => o.value === value)
  return option?.label || value
}

export function clinicNotificationTemplate({
  patientName,
  patientEmail,
  patientPhone,
  procedureInterest,
  willingToTravel,
  preferredDestinations,
  budgetRange,
  timeline,
  message,
  clinicName,
  dashboardUrl,
}: ClinicNotificationProps): string {
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
  <title>New Patient Enquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                New Patient Enquiry
              </h1>
              <p style="margin: 8px 0 0; color: #ccfbf1; font-size: 14px;">
                ${clinicName}
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="background-color: #ffffff; padding: 32px;">
              <!-- Patient Info Card -->
              <div style="background-color: #f0fdfa; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 12px; color: #0d9488; font-size: 16px; font-weight: 600;">
                  Patient Details
                </h2>
                <p style="margin: 0 0 8px; color: #1c1917; font-size: 18px; font-weight: 600;">
                  ${patientName}
                </p>
                <p style="margin: 0 0 4px; color: #57534e; font-size: 14px;">
                  <a href="mailto:${patientEmail}" style="color: #0d9488; text-decoration: none;">${patientEmail}</a>
                </p>
                <p style="margin: 0; color: #57534e; font-size: 14px;">
                  <a href="tel:${patientPhone}" style="color: #0d9488; text-decoration: none;">${patientPhone}</a>
                </p>
              </div>

              <!-- Enquiry Details -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4;">
                    <span style="color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Procedure of Interest</span>
                    <p style="margin: 4px 0 0; color: #1c1917; font-size: 16px; font-weight: 500;">
                      ${procedureInterest}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4;">
                    <span style="color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Travel Readiness</span>
                    <p style="margin: 4px 0 0; color: #1c1917; font-size: 16px; font-weight: 500;">
                      ${travelText}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4;">
                    <span style="color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Preferred Destinations</span>
                    <p style="margin: 4px 0 0; color: #1c1917; font-size: 16px; font-weight: 500;">
                      ${destinationsText}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4;">
                    <span style="color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Budget Range</span>
                    <p style="margin: 4px 0 0; color: #1c1917; font-size: 16px; font-weight: 500;">
                      ${budgetText}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4;">
                    <span style="color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Timeline</span>
                    <p style="margin: 4px 0 0; color: #1c1917; font-size: 16px; font-weight: 500;">
                      ${timelineText}
                    </p>
                  </td>
                </tr>
                ${message
      ? `
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Additional Message</span>
                    <p style="margin: 4px 0 0; color: #1c1917; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
                      ${message}
                    </p>
                  </td>
                </tr>
                `
      : ''
    }
              </table>

              <!-- CTA Button -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="${dashboardUrl}" style="display: inline-block; background-color: #f97316; color: #ffffff; padding: 14px 32px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                  View in Dashboard
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f5f4; padding: 24px 32px; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0 0 8px; color: #78716c; font-size: 12px;">
                This enquiry was submitted through MeetYourClinic.
              </p>
              <p style="margin: 0; color: #a8a29e; font-size: 11px;">
                Respond promptly to increase your chances of converting this lead.
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
