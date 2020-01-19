import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Customer } from "src/app/core/model/customer";
import { environment } from "../../../environments/environment";
import { CustomerFormData } from "../../core/model/customer-form-data";
import {
  SetCurrentCustomer,
  SetCustomerFormData
} from "../../store/app-actions";
import { getCustomerFormData } from "../../store/app-selectors";
import { State } from "../../store/app-state";
import { CustomerService } from "../customer.service";

@Component({
  selector: "app-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.scss"]
})
export class CustomerFormComponent implements OnInit, OnDestroy {
  customers$: Observable<Customer[]>;
  loading$: Observable<boolean>;
  minDate: Date;
  maxDate = new Date();
  bsDatepickerConfig = {};
  customerForm: FormGroup;
  submitted = false;
  customers: Customer[];

  countSubscription$: Subscription;
  formDataSubscription$: Subscription;
  valueChangeSubscription$: Subscription;
  getAllSubscription$: Subscription;

  get f() {
    return this.customerForm.controls;
  }

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private store: Store<State>,
    private router: Router
  ) {
    this.customers$ = customerService.entities$;
    this.loading$ = customerService.loading$;
  }

  ngOnInit() {
    this.getAllSubscription$ = this.customers$.subscribe(
      x => (this.customers = x)
    );

    this.countSubscription$ = this.customerService.count$.subscribe(count => {
      if (!count) {
        this.customerService.getAll();
      }
    });

    this.formDataSubscription$ = this.store
      .select(getCustomerFormData)
      .subscribe((formData: CustomerFormData) => {
        this.customerForm = this.formBuilder.group({
          customerId: [formData.customerId, Validators.required],
          dateRange: [formData.dateRange, Validators.required]
        });
      });
    this.minDate = new Date(environment.customerFormSettings.minDate);
    this.bsDatepickerConfig = {
      isAnimated: true,
      rangeInputFormat: environment.dateFormat,
      containerClass: environment.datePickerThemeClass,
      selectFromOtherMonth: true
    };

    this.valueChangeSubscription$ = this.customerForm.valueChanges.subscribe(
      val => {
        if (this.customerForm.valid) {
          this.store.dispatch(new SetCustomerFormData(val));
        }
      }
    );
  }

  byId(customer: Customer) {
    return customer.id;
  }

  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    this.store.dispatch(new SetCustomerFormData(this.customerForm.value));
    this.store.dispatch(
      new SetCurrentCustomer(
        this.customers.find(x => x.id === this.customerForm.value.customerId)
      )
    );
    this.router.navigate(["orders"]);
  }

  ngOnDestroy(): void {
    this.countSubscription$.unsubscribe();
    this.formDataSubscription$.unsubscribe();
    this.valueChangeSubscription$.unsubscribe();
    this.getAllSubscription$.unsubscribe();
  }
}
