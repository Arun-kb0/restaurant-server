
interface IRestaurantBaseRepo<T, U> {
  count(): Promise<number>
  findAll(limit: number, startIndex: number): Promise<U[]>
  create(restaurant: T): Promise<U | null>
  findByIdAndUpdate(restaurantId: string, restaurant: Partial<T>): Promise<U | null>
  findByIdAndDelete(restaurantId: string): Promise<U | null>
}

export default IRestaurantBaseRepo