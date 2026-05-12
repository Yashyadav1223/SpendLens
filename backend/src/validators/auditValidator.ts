import { z } from 'zod'

export const toolSpendSchema = z.object({
  tool: z.string().min(1).max(80),
  plan: z.string().min(1).max(80),
  seats: z.coerce.number().int().min(0).max(10000),
  monthlySpend: z.coerce.number().min(0).max(5_000_000),
  usageType: z.string().max(120).optional(),
})

export const auditInputSchema = z.object({
  tools: z.array(toolSpendSchema).min(1).max(50),
  teamSize: z.coerce.number().int().min(1).max(100000),
  useCase: z.enum(['Coding', 'Writing', 'Research', 'Data Analysis', 'Mixed']),
  monthlyAiBudget: z.coerce.number().min(0).max(50_000_000).optional(),
  painPoints: z.array(z.string().min(1).max(120)).max(20).optional(),
})

export type AuditInputDto = z.infer<typeof auditInputSchema>
