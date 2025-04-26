import dotenv from 'dotenv'
dotenv.config()
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { corsOptions } from './config/corsOptions'
import HttpError from './util/HttpError'
import httpStatus from './constants/httpStatus'
import errorHandler from './middleware/errorHandler'
import logger from './middleware/logger'
import restaurantRouter from './routes/restaurantRoutes'

const PORT = process.env.PORT || 3001

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(logger)

app.use('/', restaurantRouter)

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(httpStatus.NOT_FOUND, 'route not found')
  next(error)
})

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`server is running on localhost ${PORT}`)
})