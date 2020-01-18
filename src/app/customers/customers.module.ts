import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DefaultPluralizer } from "@ngrx/data";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerService } from "./customer.service";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: "", pathMatch: "full", component: CustomerListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [RouterModule, CustomerListComponent],
  declarations: [CustomerListComponent],
  providers: [CustomerService, DefaultPluralizer]
})
export class CustomersModule {}
