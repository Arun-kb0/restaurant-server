import IRestaurantBaseRepo from "../../interfaces/IRestaurantBaseRepo";
import handleRepoError from '../../util/handleRepoError'
import { Prisma, PrismaClient } from "../../generated/prisma";
import { DefaultArgs } from "../../generated/prisma/runtime/library";
import IRestaurant, { IRestaurantDb } from "../../interfaces/IRestaurant";

class RestaurantBaseRepo<T extends IRestaurant, U extends IRestaurantDb>
  implements IRestaurantBaseRepo<T, U> {

  constructor(
    private prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) { }

  async count(): Promise<number> {
    try {
      const count = await this.prisma.restaurant.count()
      return count
    } catch (error) {
      return handleRepoError(error)
    }
  }

  async findAll(limit: number, startIndex: number): Promise<U[]> {
    try {
      const restaurants = await this.prisma.restaurant.findMany({
        skip: startIndex,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          address: {
            include: {
              city: {
                include: {
                  state: true,
                },
              },
            },
          },
        },
      })
      return restaurants as unknown as U[]
    } catch (error) {
      return handleRepoError(error)
    }
  }

  async create(restaurant: T): Promise<U | null> {
    try {
      const newRestaurant = await this.prisma.restaurant.create({
        data: {
          name: restaurant.name,
          phone: restaurant.phone,
          email: restaurant.email,
          address: {
            create: {
              pinCode: restaurant.address.pinCode,
              city: {
                connectOrCreate: {
                  where: { name: restaurant.address.city },
                  create: {
                    name: restaurant.address.city,
                    state: {
                      connectOrCreate: {
                        where: { name: restaurant.address.state },
                        create: {
                          name: restaurant.address.state
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        include: {
          address: {
            include: {
              city: {
                include: {
                  state: true
                }
              }
            }
          }
        }
      })
      return newRestaurant as unknown as U
    } catch (error) {
      return handleRepoError(error)
    }
  }

  async findByIdAndUpdate(restaurantId: string, restaurant: T): Promise<U | null> {
    const data: any = {};
    if (restaurant.name) data.name = restaurant.name;
    if (restaurant.phone) data.phone = restaurant.phone;
    if (restaurant.email) data.email = restaurant.email;

    if (restaurant.address) {
      const addrUpdate: any = {};

      if (restaurant.address.pinCode) {
        addrUpdate.pinCode = restaurant.address.pinCode;
      }

      if (restaurant.address.city) {
        addrUpdate.city = {
          connectOrCreate: {
            where: { name: restaurant.address.city },
            create: {
              name: restaurant.address.city,
              state: {
                connectOrCreate: {
                  where: { name: restaurant.address.state! },
                  create: { name: restaurant.address.state! },
                },
              },
            },
          },
        };
      }

      // Only include address.update if there's something to do
      if (Object.keys(addrUpdate).length > 0) {
        data.address = { update: addrUpdate };
      }
    }

    try {
      const updatedRestaurant = await this.prisma.restaurant.update({
        where: { id: restaurantId },
        data,
        include: {
          address: {
            include: {
              city: { include: { state: true } },
            },
          },
        },
      })
      return updatedRestaurant as unknown as U
    } catch (error: unknown) {
      return handleRepoError(error);
    }
  }

  async findByIdAndDelete(restaurantId: string): Promise<U | null> {
    try {
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
        include: {
          address: {
            include: {
              city: {
                include: {
                  state: true
                }
              },
            },
          },
        },
      })
      if (!restaurant) {
        throw new Error(`Restaurant ${restaurantId} not found`);
      }

      await this.prisma.$transaction([
        this.prisma.restaurant.delete({ where: { id: restaurantId } }),
        this.prisma.address.delete({ where: { id: restaurant.addressId } })
      ])

      return restaurant as unknown as U
    } catch (error) {
      return handleRepoError(error)
    }
  }

}

export default RestaurantBaseRepo