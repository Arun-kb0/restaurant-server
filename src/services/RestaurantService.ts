import { PaginationRestaurants, ServiceReturnType } from "../constants/types";
import IRestaurant from "../interfaces/IRestaurant";
import IRestaurantRepo from "../interfaces/IRestaurantRepo";
import IRestaurantService from "../interfaces/IRestaurantService";
import {  handleServiceData } from "../util/handleService";

class RestaurantService implements IRestaurantService {

  constructor(
    private restaurantRepo: IRestaurantRepo,
    private limit: number
  ) { }
  

  async getRestaurants(page: number): ServiceReturnType<PaginationRestaurants> {
    try {
      const startIndex = (page - 1) * this.limit
      const total = await this.restaurantRepo.countRestaurants()
      const numberOfPages = Math.ceil(total / this.limit)
      const restaurants = await this.restaurantRepo.findRestaurants(this.limit, startIndex)
      const paginationData: PaginationRestaurants = {
        restaurants,
        currentPage: page,
        numberOfPages
      }
      return handleServiceData(paginationData)
    } catch (error) {
      throw error
    }
  }

  createRestaurant(restaurant: IRestaurant): ServiceReturnType<IRestaurant | null> {
    throw new Error("Method not implemented.");
  }
  updateRestaurant(restaurantId: string, restaurant: IRestaurant): ServiceReturnType<IRestaurant | null> {
    throw new Error("Method not implemented.");
  }
  deleteRestaurant(restaurantId: string): ServiceReturnType<IRestaurant | null> {
    throw new Error("Method not implemented.");
  }

}

export default RestaurantService