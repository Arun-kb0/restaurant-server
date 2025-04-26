import IRestaurant, { IRestaurantDb } from '../interfaces/IRestaurant'

export const convertIRestaurantDbToIRestaurant = (restaurantDb: IRestaurantDb): IRestaurant => {
  return {
    id: restaurantDb.id, 
    name: restaurantDb.name, 
    address: {
      city: restaurantDb.address.city.name,
      state: restaurantDb.address.city.state.name,
      pinCode: restaurantDb.address.pinCode,
    },
    phone: restaurantDb.phone, 
    email: restaurantDb.email, 
    createdAt: restaurantDb.createdAt, 
    updatedAt: restaurantDb.updatedAt, 
  }
}

