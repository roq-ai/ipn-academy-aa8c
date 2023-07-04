import { WorkshopInterface } from 'interfaces/workshop';
import { CartInterface } from 'interfaces/cart';
import { GetQueryInterface } from 'interfaces';

export interface CartItemInterface {
  id?: string;
  workshop_id?: string;
  cart_id?: string;
  created_at?: any;
  updated_at?: any;

  workshop?: WorkshopInterface;
  cart?: CartInterface;
  _count?: {};
}

export interface CartItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  workshop_id?: string;
  cart_id?: string;
}
