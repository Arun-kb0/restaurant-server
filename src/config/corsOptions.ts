import { CorsOptions } from 'cors'
import { allowOrigins } from './allowOrigins'

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === 'null' || allowOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS.'))
    }
  },
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-VERIFY",
    "X-MERCHANT-ID"
  ],
}