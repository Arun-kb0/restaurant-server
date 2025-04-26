import IRestaurant from "./IRestaurant"

interface IRestaurantRepo {
  countRestaurants(): Promise<number>
  findRestaurants(limit: number, startIndex: number): Promise<IRestaurant[]>
  createRestaurant(restaurant: IRestaurant): Promise<IRestaurant | null >
  findRestaurantByIdAndUpdate(restaurantId: string, restaurant: Partial<IRestaurant>): Promise<IRestaurant | null>
  findRestaurantByIdAndDelete(restaurantId: string): Promise<IRestaurant | null>
}

export default IRestaurantRepo