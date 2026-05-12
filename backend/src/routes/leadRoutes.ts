import { Router } from 'express'
import { captureLead } from '../controllers/leadController.js'
import { leadRateLimiter } from '../middleware/rateLimiter.js'
import { validateBody } from '../middleware/validateRequest.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { leadInputSchema } from '../validators/leadValidator.js'

export const leadRouter = Router()

leadRouter.post(
  '/',
  leadRateLimiter,
  validateBody(leadInputSchema),
  asyncHandler(captureLead),
)
