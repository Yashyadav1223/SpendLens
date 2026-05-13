import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env, isTest } from './config/env.js'
import { errorHandler } from './middleware/errorHandler.js'
import { notFoundHandler } from './middleware/notFoundHandler.js'
import { auditRouter } from './routes/auditRoutes.js'
import { healthRouter } from './routes/healthRoutes.js'
import { leadRouter } from './routes/leadRoutes.js'
import { reportRouter } from './routes/reportRoutes.js'
import { summaryRouter } from './routes/summaryRoutes.js'

export const app = express()

// Trust proxy required for Render deployment and express-rate-limit
app.set('trust proxy', 1)

app.use(helmet())
app.use(
  cors({
    origin:
      env.CORS_ORIGIN === '*'
        ? true
        : env.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
  }),
)
app.use(express.json({ limit: '1mb' }))

app.use('/health', healthRouter)
app.use('/api/audit', auditRouter)
app.use('/api/summary', summaryRouter)
app.use('/api/leads', leadRouter)
app.use('/api/report', reportRouter)

app.use(notFoundHandler)
app.use(errorHandler)

if (!isTest) {
  app.listen(env.PORT)
}
