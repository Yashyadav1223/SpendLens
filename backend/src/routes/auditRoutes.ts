import { Router } from 'express'
import { createAudit } from '../controllers/auditController.js'
import { auditRateLimiter } from '../middleware/rateLimiter.js'
import { validateBody } from '../middleware/validateRequest.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { auditInputSchema } from '../validators/auditValidator.js'

export const auditRouter = Router()

auditRouter.post(
  '/',
  auditRateLimiter,
  validateBody(auditInputSchema),
  asyncHandler(createAudit),
)
