import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { ApiError } from '../utils/ApiError.js'
import { isProduction } from '../config/env.js'

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ApiError) {
    response.status(error.statusCode).json({
      error: {
        message: error.message,
        details: error.details,
      },
    })
    return
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      error: {
        message: 'Validation failed',
        details: error.flatten(),
      },
    })
    return
  }

  response.status(500).json({
    error: {
      message: 'Internal server error',
      details: isProduction ? undefined : String(error),
    },
  })
}
