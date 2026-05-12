import { z } from 'zod'

export const summaryInputSchema = z.object({
  auditResult: z.record(z.string(), z.unknown()),
  companyName: z.string().min(2).max(120).optional(),
})

export type SummaryInputDto = z.infer<typeof summaryInputSchema>
