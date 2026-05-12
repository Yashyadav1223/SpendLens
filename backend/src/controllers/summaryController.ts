import type { Request, Response } from 'express'
import { generateAuditSummary } from '../services/summaryService.js'
import type { SummaryInputDto } from '../validators/summaryValidator.js'

export async function createSummary(request: Request, response: Response) {
  const payload = request.body as SummaryInputDto
  const result = await generateAuditSummary(payload)

  response.status(200).json({
    data: result,
  })
}
