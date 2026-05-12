import { z } from 'zod'
import { auditInputSchema } from './auditValidator.js'

export const createReportSchema = z.object({
  auditInput: auditInputSchema.optional(),
  auditResult: z.record(z.string(), z.unknown()),
  title: z.string().min(2).max(140).default('Spendlens AI Spend Audit'),
})

export type CreateReportDto = z.infer<typeof createReportSchema>
