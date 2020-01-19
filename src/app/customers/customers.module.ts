import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DefaultPluralizer } from "@ngrx/data";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CustomerFormComponent } from "./customer-form/customer-form.component";
import { CustomerService } from "./customer.service";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: "", pathMatch: "full", component: CustomerFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [RouterModule, CustomerFormComponent],
  declarations: [CustomerFormComponent],
  providers: [CustomerService, DefaultPluralizer]
})
export class CustomersModule {}
