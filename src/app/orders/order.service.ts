import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
  QueryParams
} from "ngrx-data";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Order } from "../core/model/order";

@Injectable({ providedIn: "root" })
export class OrderService extends EntityCollectionServiceBase<Order> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("Order", serviceElementsFactory);
  }

  getWithQuery(params: string | QueryParams): Observable<Order[]> {
    return super
      .getWithQuery(params)
      .pipe(map(order => order.map(order => this.mapOrder(order))));
  }

  private mapOrder(order: Order): Order {
    return {
      ...order,
      created_at: new Date(order.created_at),
      charge_customer: {
        ...order.charge_customer,
        total_price: Number.parseFloat(order.charge_customer.total_price as any)
      },
      items: order.items
        ? order.items.map(item => {
            return {
              ...item,
              total_price: {
                ...item.total_price,
                amount: Number.parseFloat(item.total_price.amount as any)
              }
            };
          })
        : []
    } as Order;
  }
}
