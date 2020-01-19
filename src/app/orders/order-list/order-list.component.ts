import { Component, OnDestroy, OnInit } from "@angular/core";
import { QueryParams } from "@ngrx/data";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Customer } from "../../core/model/customer";
import { CustomerFormData } from "../../core/model/customer-form-data";
import { Order } from "../../core/model/order";
import { DateFormatPipe } from "../../core/pipes/date-format.pipe";
import { SetPrevCustomerFormData } from "../../store/app-actions";
import {
  getCurrentCustomer,
  getCustomerFormData,
  getPrevCustomerFormData
} from "../../store/app-selectors";
import { State } from "../../store/app-state";
import { OrderService } from "../order.service";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"]
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders$: Observable<Order[]>;
  loading$: Observable<boolean>;
  formData: CustomerFormData;
  prevFormData: CustomerFormData;
  currentCustomer: Customer;
  oneDay = 24 * 60 * 60 * 1000;
  totalAmount = 0;
  datePipe = new DateFormatPipe();

  formDataSubscription$: Subscription;
  formPrevDataSubscription$: Subscription;
  countSubscription$: Subscription;
  currentCustomerSubscription$: Subscription;
  totalAmountSubscription$: Subscription;

  get totalDays(): number {
    return this.formData &&
      this.formData.dateRange &&
      this.formData.dateRange.length === 2
      ? 1 +
          Math.round(
            (Number(this.formData.dateRange[1]) -
              Number(this.formData.dateRange[0])) /
              this.oneDay
          )
      : 0;
  }

  constructor(private store: Store<State>, private orderService: OrderService) {
    this.orders$ = orderService.entities$;
    this.loading$ = orderService.loading$;
  }

  ngOnInit() {
    this.formDataSubscription$ = this.store
      .select(getCustomerFormData)
      .subscribe(x => (this.formData = x));

    this.currentCustomerSubscription$ = this.store
      .select(getCurrentCustomer)
      .subscribe(x => (this.currentCustomer = x));

    this.formPrevDataSubscription$ = this.store
      .select(getPrevCustomerFormData)
      .subscribe(x => (this.prevFormData = x));

    this.totalAmountSubscription$ = this.orders$.subscribe(x => {
      if (x && x.length) {
        this.totalAmount = x
          .map(x => Number.parseFloat(x.charge_customer.total_price.toString()))
          .reduce((a, b) => a + b);
      }
    });

    this.countSubscription$ = this.orderService.count$.subscribe(count => {
      if (!this.isFormDataEqual(this.prevFormData, this.formData) || !count) {
        this.orderService.getWithQuery({
          customer_id: this.formData.customerId,
          start_date: this.datePipe.transform(this.formData.dateRange[0]),
          end_date: this.datePipe.transform(this.formData.dateRange[1])
        } as QueryParams);
        this.store.dispatch(new SetPrevCustomerFormData(this.formData));
      }
    });
  }

  ngOnDestroy(): void {
    this.formDataSubscription$.unsubscribe();
    this.formPrevDataSubscription$.unsubscribe();
    this.countSubscription$.unsubscribe();
    this.currentCustomerSubscription$.unsubscribe();
    this.totalAmountSubscription$.unsubscribe();
  }

  byId(order: Order) {
    return order.id;
  }

  isFormDataEqual(a: CustomerFormData, b: CustomerFormData): boolean {
    return (
      !!a &&
      !!b &&
      !!a.dateRange &&
      !!b.dateRange &&
      a.customerId === b.customerId &&
      Number(a.dateRange[0]) === Number(b.dateRange[0]) &&
      Number(a.dateRange[1]) === Number(b.dateRange[1])
    );
  }
}
