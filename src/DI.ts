import RestaurantBaseRepo from './repositories/base/RestaurantBaseRepo'
import RestaurantRepo from './repositories/RestaurantRepo'
import RestaurantService from './services/RestaurantService'
import RestaurantController from './controllers/RestaurantController'
import prisma from './config/prisma'

const limit = process.env.LIMIT || 5

const restaurantBaseRepo = new RestaurantBaseRepo(prisma);
const restaurantRepo = new RestaurantRepo(restaurantBaseRepo);
const restaurantService = new RestaurantService(restaurantRepo, Number(limit));
export const restaurantController = new RestaurantController(restaurantService);