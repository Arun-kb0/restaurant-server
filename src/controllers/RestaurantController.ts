import { NextFunction, Request, Response } from "express";
import IRestaurantController from "../interfaces/IRestaurantController";
import IRestaurantService from "../interfaces/IRestaurantService";
import HttpError from "../util/HttpError";
import httpStatus from "../constants/httpStatus";
import { validateResponse } from "../util/validations";

class RestaurantController implements IRestaurantController {
  constructor(
    private restaurantService: IRestaurantService
  ) { }
 

  async getRestaurants(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page } = req.query
      if (!page || isNaN(Number(page))) throw new HttpError(httpStatus.BAD_REQUEST, 'Page must be a number.')
      const serviceRes = await this.restaurantService.getRestaurants(Number(page))
      console.log("controller - getRestaurants serviceRes")
      console.log(serviceRes)
      validateResponse(serviceRes)
      res.status(httpStatus.OK).json(serviceRes.data)
    } catch (error) {
      next(error)
    }
  }

  createRestaurant(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateRestaurant(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteRestaurant(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

export default RestaurantController