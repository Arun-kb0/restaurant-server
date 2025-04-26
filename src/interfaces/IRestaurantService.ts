import { PaginationRestaurants, ServiceReturnType } from "../constants/types"
import IRestaurant from "./IRestaurant"

interface IRestaurantService {
  getRestaurants(page: number): ServiceReturnType<PaginationRestaurants>
  createRestaurant(restaurant: IRestaurant): ServiceReturnType<IRestaurant | null>
  updateRestaurant(restaurantId: string, restaurant: IRestaurant): ServiceReturnType<IRestaurant | null>
  deleteRestaurant(restaurantId: string): ServiceReturnType<IRestaurant | null>
}

export default IRestaurantService