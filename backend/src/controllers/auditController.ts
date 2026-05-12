import type { Request, Response } from 'express'
import { runAudit } from '../services/auditEngine.js'
import type { AuditInputDto } from '../validators/auditValidator.js'

export async function createAudit(request: Request, response: Response) {
  const auditInput = request.body as AuditInputDto
  const auditResult = runAudit(auditInput)

  response.status(200).json({
    data: auditResult,
  })
}
