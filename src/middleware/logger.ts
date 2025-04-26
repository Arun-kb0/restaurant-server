
import { NextFunction, Request, Response } from "express";

const formattedLog = (req: Request, res: Response) => {
  return {
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


const logger = (req: Request, res: Response, next: NextFunction) => {
  const jsonString = JSON.stringify(formattedLog(req, res))
  console.log("\x1b[32m%s\x1b[0m", jsonString)
  next()
}

export default logger