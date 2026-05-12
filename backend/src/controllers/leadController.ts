import type { Request, Response } from 'express'
import { createLead } from '../services/leadService.js'
import type { LeadInputDto } from '../validators/leadValidator.js'

export async function captureLead(request: Request, response: Response) {
  const lead = request.body as LeadInputDto
  const result = await createLead(lead)

  response.status(result.duplicate ? 200 : 201).json({
    data: result,
  })
}
