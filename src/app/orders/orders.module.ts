import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { DefaultPluralizer } from "@ngrx/data";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderService } from "./order.service";
import { PipesModule } from '../core/pipes/pipes.module';

const routes: Routes = [
  { path: "", pathMatch: "full", component: OrderListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [RouterModule, OrderListComponent],
  declarations: [OrderListComponent],
  providers: [OrderService, DefaultPluralizer]
})
export class OrdersModule {}
