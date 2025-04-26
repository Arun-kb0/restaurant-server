class HttpError extends Error {
  isOperational: boolean
  status: string

  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message)
    this.statusCode = statusCode
    if (statusCode >= 400 && statusCode <= 500) {
      this.status = 'fail'
    } else if (statusCode < 400) {
      this.status = 'success'
    } else {
      this.status = 'error'
    }

    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }


}

export default HttpError
