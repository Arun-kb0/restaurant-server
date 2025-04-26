
export default interface IRestaurant {
  id: string
  name: string;
  address: {
    city: string
    state: string
    pinCode: string
  }
  phone: string;
  email: string;
  createdAt: Date
  updatedAt: Date
}


export interface IRestaurantDb {
  id: string;
  name: string;
  address: {
    id: string;
    cityId: string;
    pinCode: string;
    createdAt: Date;
    updatedAt: Date;
    city: {
      id: string;
      name: string;
      stateId: string;
      state: {
        id: string;
        name: string;
      };
    };
  };
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}