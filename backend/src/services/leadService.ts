import { randomUUID } from 'node:crypto'
import { getSupabaseClient } from '../lib/supabase.js'
import { ApiError } from '../utils/ApiError.js'
import type { LeadInputDto } from '../validators/leadValidator.js'
import { sendLeadConfirmationEmail } from './emailService.js'

export async function createLead(lead: LeadInputDto) {
  const supabase = getSupabaseClient()

  if (!supabase) {
    const email = await sendLeadConfirmationEmail(lead)
    return {
      id: `local_${randomUUID()}`,
      duplicate: false,
      stored: false,
      email,
    }
  }

  const { data: existingLead, error: lookupError } = await supabase
    .from('leads')
    .select('id,email')
    .eq('email', lead.email)
    .maybeSingle()

  if (lookupError) {
    throw new ApiError(500, 'Could not check existing lead', lookupError.message)
  }

  if (existingLead) {
    return {
      id: existingLead.id,
      duplicate: true,
      stored: true,
      email: { sent: false, reason: 'Lead already exists' },
    }
  }

  const { data, error } = await supabase
    .from('leads')
    .insert({
      email: lead.email,
      company_name: lead.companyName,
      role: lead.role,
      team_size: lead.teamSize,
    })
    .select('id')
    .single()

  if (error) {
    throw new ApiError(500, 'Could not store lead', error.message)
  }

  const email = await sendLeadConfirmationEmail(lead)

  return {
    id: data.id,
    duplicate: false,
    stored: true,
    email,
  }
}
