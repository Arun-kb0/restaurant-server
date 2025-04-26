import httpStatus from '../constants/httpStatus'
import { ResponseType, ServiceReturnNoPromiseType, ServiceReturnType } from '../constants/types'

export const handleServiceError = (error: any): ResponseType => {
  let response: ResponseType = {
    data: undefined,
    error: undefined,
    statusCode: undefined
  }

  if (error instanceof Error) {
    response = {
      data: undefined,
      error: error?.name,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR
    }
  }
  return response
}

export const handleServiceData = <T>(data: T): ServiceReturnNoPromiseType<T> => {
  const newData = Array.isArray(data) ? [] : undefined;
  return {
    data: data ? data : newData as T,
    error: undefined,
    statusCode: httpStatus.OK
  };
}
