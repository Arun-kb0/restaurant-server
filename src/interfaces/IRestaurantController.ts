import { NextFunction, Request, Response } from "express";

interface IRestaurantController {
  getRestaurants(req: Request, res: Response, next: NextFunction): Promise<void> 
  createRestaurant(req: Request, res: Response, next: NextFunction): Promise<void> 
  updateRestaurant(req: Request, res: Response, next: NextFunction): Promise<void> 
  deleteRestaurant(req: Request, res: Response, next: NextFunction): Promise<void> 
}

export default IRestaurantController