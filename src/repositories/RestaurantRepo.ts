import { Prisma, PrismaClient } from "../generated/prisma";
import { DefaultArgs } from "../generated/prisma/runtime/library";
import IRestaurant, { IRestaurantDb } from "../interfaces/IRestaurant";
import IRestaurantBaseRepo from "../interfaces/IRestaurantBaseRepo";
import IRestaurantRepo from "../interfaces/IRestaurantRepo";
import { convertIRestaurantDbToIRestaurant } from '../util/converters'
import handleRepoError from '../util/handleRepoError'

// class RestaurantRepo implements IRestaurantRepo {

//   constructor(
//     private prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
//   ) { }

//   async countRestaurants(): Promise<number> {
//     try {
//       const count = await this.prisma.restaurant.count()
//       return count
//     } catch (error) {
//       return handleRepoError(error)
//     }
//   }


//   async findRestaurants(limit: number, startIndex: number): Promise<IRestaurant[]> {
//     try {
//       const restaurants = await this.prisma.restaurant.findMany({
//         skip: startIndex,
//         take: limit,
//         orderBy: { updatedAt: 'desc' },
//         include: {
//           address: {
//             include: {
//               city: {
//                 include: {
//                   state: true,
//                 },
//               },
//             },
//           },
//         },
//       })
//       return restaurants.map(item => convertIRestaurantDbToIRestaurant(item))
//     } catch (error) {
//       return handleRepoError(error)
//     }
//   }

//   async createRestaurant(restaurant: IRestaurant): Promise<IRestaurant> {
//     try {
//       const newRestaurant = await this.prisma.restaurant.create({
//         data: {
//           name: restaurant.name,
//           phone: restaurant.phone,
//           email: restaurant.email,
//           address: {
//             create: {
//               pinCode: restaurant.address.pinCode,
//               city: {
//                 connectOrCreate: {
//                   where: { name: restaurant.address.city },
//                   create: {
//                     name: restaurant.address.city,
//                     state: {
//                       connectOrCreate: {
//                         where: { name: restaurant.address.state },
//                         create: {
//                           name: restaurant.address.state
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         },
//         include: {
//           address: {
//             include: {
//               city: {
//                 include: {
//                   state: true
//                 }
//               }
//             }
//           }
//         }
//       })
//       return convertIRestaurantDbToIRestaurant(newRestaurant)
//     } catch (error) {
//       return handleRepoError(error)
//     }
//   }

//   async findRestaurantByIdAndUpdate(restaurantId: string, restaurant: Partial<IRestaurant>): Promise<IRestaurant> {
//     const data: any = {};
//     if (restaurant.name) data.name = restaurant.name;
//     if (restaurant.phone) data.phone = restaurant.phone;
//     if (restaurant.email) data.email = restaurant.email;

//     if (restaurant.address) {
//       const addrUpdate: any = {};

//       if (restaurant.address.pinCode) {
//         addrUpdate.pinCode = restaurant.address.pinCode;
//       }

//       if (restaurant.address.city) {
//         addrUpdate.city = {
//           connectOrCreate: {
//             where: { name: restaurant.address.city },
//             create: {
//               name: restaurant.address.city,
//               state: {
//                 connectOrCreate: {
//                   where: { name: restaurant.address.state! },
//                   create: { name: restaurant.address.state! },
//                 },
//               },
//             },
//           },
//         };
//       }

//       // Only include address.update if there's something to do
//       if (Object.keys(addrUpdate).length > 0) {
//         data.address = { update: addrUpdate };
//       }
//     }

//     try {
//       const updatedRestaurant = await this.prisma.restaurant.update({
//         where: { id: restaurantId },
//         data,
//         include: {
//           address: {
//             include: {
//               city: { include: { state: true } },
//             },
//           },
//         },
//       })

//       return convertIRestaurantDbToIRestaurant(updatedRestaurant)
//     } catch (error: unknown) {
//       return handleRepoError(error);
//     }
//   }

//   async findRestaurantByIdAndDelete(restaurantId: string): Promise<IRestaurant> {
//     try {
//       const restaurant = await this.prisma.restaurant.findUnique({
//         where: { id: restaurantId },
//         include: {
//           address: {
//             include: {
//               city: {
//                 include: {
//                   state: true
//                 }
//               },
//             },
//           },
//         },
//       })
//       if (!restaurant) {
//         throw new Error(`Restaurant ${restaurantId} not found`);
//       }

//       await this.prisma.$transaction([
//         this.prisma.restaurant.delete({ where: { id: restaurantId } }),
//         this.prisma.address.delete({ where: { id: restaurant.addressId } })
//       ])

//       return convertIRestaurantDbToIRestaurant(restaurant)
//     } catch (error) {
//       return handleRepoError(error)
//     }
//   }

// }

class RestaurantRepo implements IRestaurantRepo {

  constructor(
    private restaurantBaseRepo: IRestaurantBaseRepo<IRestaurant, IRestaurantDb>
  ) { }

  async countRestaurants(): Promise<number> {
    try {
      return await this.restaurantBaseRepo.count();
    } catch (error) {
      throw error
    }
  }

  async findRestaurants(limit: number, startIndex: number): Promise<IRestaurant[]> {
    try {
      const restaurants = await this.restaurantBaseRepo.findAll(limit, startIndex);
      return restaurants.map(item => convertIRestaurantDbToIRestaurant(item))
    } catch (error) {
      throw error
    }
  }

  async createRestaurant(restaurant: IRestaurant): Promise<IRestaurant | null> {
    try {
      const newRestaurant = await this.restaurantBaseRepo.create(restaurant);
      return newRestaurant ? convertIRestaurantDbToIRestaurant(newRestaurant) : null
    } catch (error) {
      throw error
    }
  }

  async findRestaurantByIdAndUpdate(restaurantId: string, restaurant: Partial<IRestaurant>): Promise<IRestaurant | null> {
    try {
      const updatedRestaurant = await this.restaurantBaseRepo.findByIdAndUpdate(restaurantId, restaurant);
      return updatedRestaurant ? convertIRestaurantDbToIRestaurant(updatedRestaurant) : null
    } catch (error) {
      throw error
    }
  }

  async findRestaurantByIdAndDelete(restaurantId: string): Promise<IRestaurant | null> {
    try {
      const deletedRestaurant = await this.restaurantBaseRepo.findByIdAndDelete(restaurantId);
      return deletedRestaurant ? convertIRestaurantDbToIRestaurant(deletedRestaurant) : null
    } catch (error) {
      throw error
    }
  }


}

export default RestaurantRepo