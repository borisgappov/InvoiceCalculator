import { Price } from "./price";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  total_price: Price;
}
