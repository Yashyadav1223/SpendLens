import { env } from '../config/env.js'
import { resend } from '../lib/resend.js'
import type { LeadInputDto } from '../validators/leadValidator.js'

export async function sendLeadConfirmationEmail(lead: LeadInputDto) {
  if (!resend) {
    return { sent: false, reason: 'RESEND_API_KEY is not configured' }
  }

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: lead.email,
    subject: 'Spendlens audit request received',
    html: `
      <div style="font-family: Inter, Arial, sans-serif; line-height: 1.6;">
        <h2>Credex will review your AI spend audit</h2>
        <p>Thanks for submitting your Spendlens request for ${lead.companyName}.</p>
        <p>We will follow up with AI infrastructure credit opportunities, vendor consolidation ideas, and next steps for your team.</p>
      </div>
    `,
  })

  return { sent: true }
}
