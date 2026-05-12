import { Router } from 'express'
import { createSummary } from '../controllers/summaryController.js'
import { aiRateLimiter } from '../middleware/rateLimiter.js'
import { validateBody } from '../middleware/validateRequest.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { summaryInputSchema } from '../validators/summaryValidator.js'

export const summaryRouter = Router()

summaryRouter.post(
  '/',
  aiRateLimiter,
  validateBody(summaryInputSchema),
  asyncHandler(createSummary),
)
