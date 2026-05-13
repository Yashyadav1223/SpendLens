import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '../src/app.js'

describe('audit routes', () => {
  it('returns a normalized audit response for valid input', async () => {
    const response = await request(app)
      .post('/api/audit')
      .send({
        teamSize: 2,
        useCase: 'Coding',
        tools: [
          {
            monthlySpend: 80,
            plan: 'Teams',
            seats: 2,
            tool: 'Cursor',
          },
        ],
      })
      .expect(200)

    expect(response.body.data.totalMonthlySavings).toBe(40)
    expect(response.body.data.breakdown[0].recommendedPlan).toBe('Pro')
  })

  it('returns clean validation errors for invalid audit input', async () => {
    const response = await request(app)
      .post('/api/audit')
      .send({
        teamSize: 0,
        tools: [],
        useCase: 'Coding',
      })
      .expect(400)

    expect(response.body.error.message).toBe('Validation failed')
    expect(response.body.error.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: 'tools',
        }),
        expect.objectContaining({
          path: 'teamSize',
        }),
      ]),
    )
  })
})
