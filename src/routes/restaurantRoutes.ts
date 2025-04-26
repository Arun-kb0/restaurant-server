import express from 'express'
import { restaurantController } from '../DI'

const router = express.Router()

router.get('/', restaurantController.getRestaurants.bind(restaurantController));
router.post('/', restaurantController.createRestaurant.bind(restaurantController));
router.delete('/:restaurantId', restaurantController.deleteRestaurant.bind(restaurantController));
router.patch('/:restaurantId', restaurantController.updateRestaurant.bind(restaurantController));

export default router