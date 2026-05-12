import { z } from 'zod'

export const leadInputSchema = z.object({
  email: z.string().email(),
  companyName: z.string().min(2).max(120),
  role: z.string().min(2).max(120),
  teamSize: z.coerce.number().int().min(1).max(100000),
})

export type LeadInputDto = z.infer<typeof leadInputSchema>
