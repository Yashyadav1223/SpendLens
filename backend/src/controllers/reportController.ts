import type { Request, Response } from 'express'
import { createShareableReport, getShareableReport } from '../services/reportService.js'
import { ApiError } from '../utils/ApiError.js'
import type { CreateReportDto } from '../validators/reportValidator.js'

export async function createReport(request: Request, response: Response) {
  const payload = request.body as CreateReportDto
  const report = await createShareableReport(payload)

  response.status(201).json({
    data: report,
  })
}

export async function getReport(request: Request, response: Response) {
  const report = await getShareableReport(String(request.params.id))

  if (!report) {
    throw new ApiError(404, 'Report not found')
  }

  response.status(200).json({
    data: report,
  })
}
