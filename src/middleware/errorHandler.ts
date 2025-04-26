import { NextFunction, Request, Response } from "express";
import httpStatus from '../constants/httpStatus'
import HttpError from '../util/HttpError'

const formattedErrorLog = (error: HttpError, req: Request, res: Response) => {
  return {
    errorName: error.name,
    errorMessage: error.message,
    errorStack: error.stack,
    request: {
      method: req.method,
      url: req.url,
      origin: req.headers.origin,
      host: req.headers.host,
      clientIp: req?.headers['x-forwarded-for'] || req.socket.remoteAddress,
    },
    response: {
      header: res.getHeaders(),
      statusCode: res.statusCode
    }
  }
}


const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("errorHandler")
  console.log(error)

  let resJson: any = {}
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR

  if (error instanceof HttpError) {
    statusCode = error.statusCode
    resJson = {
      status: error.status,
      name: error.name,
      message: error.message
    }
  } else if (error instanceof Error) {
    resJson = {
      status: 'error',
      name: error.name,
      message: error.message
    }
  }

  console.log(formattedErrorLog(error, req, res))
  const jsonString  = JSON.stringify(formattedErrorLog(error, req, res))
  console.log(`\x1b[31m${jsonString}\x1b[0m`)
  res.status(statusCode).json(resJson)
}

export default errorHandler