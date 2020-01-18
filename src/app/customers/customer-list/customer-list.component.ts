import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "src/app/core/model/customer";
import { CustomerService } from "../customer.service";
import {
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"]
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  loading$: Observable<boolean>;
  minDate = new Date("01.01.2015");
  maxDate = new Date();
  bsDatepickerConfig = {
    isAnimated: true,
    rangeInputFormat: "DD.MM.YYYY",
    containerClass: "theme-dark-blue"
  };
  customerForm: FormGroup;
  submitted = false;

  get f() {
    return this.customerForm.controls;
  }

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {
    this.customers$ = customerService.entities$;
    this.loading$ = customerService.loading$;

    this.customerForm = this.formBuilder.group({
      customerId: ["", Validators.required],
      dateRange: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.customerService.getAll();
  }

  byId(customer: Customer) {
    return customer.id;
  }

  onSubmit() {
    this.submitted = true;

    if (this.customerForm.invalid) {
      return;
    }

    console.warn(this.customerForm.value);
  }
}
