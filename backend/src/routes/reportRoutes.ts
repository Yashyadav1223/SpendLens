import { Router } from 'express'
import { createReport, getReport } from '../controllers/reportController.js'
import { auditRateLimiter } from '../middleware/rateLimiter.js'
import { validateBody } from '../middleware/validateRequest.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { createReportSchema } from '../validators/reportValidator.js'

export const reportRouter = Router()

reportRouter.post(
  '/',
  auditRateLimiter,
  validateBody(createReportSchema),
  asyncHandler(createReport),
)
reportRouter.get('/:id', asyncHandler(getReport))
