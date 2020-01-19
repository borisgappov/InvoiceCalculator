import { OrderItem } from './order-item';
import { Recipient } from './recipient';
import { Delivery } from './delivery';
import { Charge } from './charge';

export interface Order {
  id: string;
  recipient: Recipient;
  created_at: Date;
  items: OrderItem[];
  delivery: Delivery;
  charge_customer: Charge;
}