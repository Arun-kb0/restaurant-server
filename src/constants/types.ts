import httpStatus from '../constants/httpStatus'
import IRestaurant from '../interfaces/IRestaurant'

export type ServiceReturnType<T> = Promise<{
  data: T | undefined
  error: string | undefined
  statusCode: httpStatus | undefined
}>

export type ServiceReturnNoPromiseType<T> = {
  data: T | undefined
  error: string | undefined
  statusCode: httpStatus | undefined
}

export type ResponseType = {
  data: any | undefined
  error: string | undefined
  statusCode: httpStatus | undefined
}

export type PaginationRestaurants = {
  restaurants: IRestaurant[]
  currentPage: number
  numberOfPages: number
}