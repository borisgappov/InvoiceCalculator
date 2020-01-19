import { Pipe, PipeTransform } from "@angular/core";
import { OrderItem } from "../model/order-item";

@Pipe({
  name: "totalPrice"
})
export class ItemsTotalPricePipe implements PipeTransform {
  transform(items: OrderItem[]) {
    return items
      ? items
        .map(x => Number.parseFloat(x.total_price.amount as any))
        .reduce((a, b) => a + b)
      : 0;
  }
}
