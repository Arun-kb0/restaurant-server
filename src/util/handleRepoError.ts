import HttpError from './HttpError'
import httpStatus from '../constants/httpStatus'
import { Prisma } from '../generated/prisma/client'


const handleRepoError = (error: any): never => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new HttpError(httpStatus.CONFLICT, "Duplicate entry");
      case "P2003":
        throw new HttpError(httpStatus.BAD_REQUEST, "Invalid relation");
      default:
        throw new HttpError(httpStatus.BAD_REQUEST, error.message);
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    throw new HttpError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new HttpError(httpStatus.BAD_REQUEST, error.message);
  }
  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new HttpError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
  if (error instanceof Error) {
    throw new HttpError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }

  throw new HttpError(httpStatus.INTERNAL_SERVER_ERROR, "Unknown repository error");
}

export default handleRepoError