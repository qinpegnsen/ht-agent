import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShoppingOrderComponent} from "./shopping-order.component";
import {SharedModule} from "../../shared/shared.module";
import { AllWorkOrdersComponent } from './all-work-orders/all-work-orders.component';
import { WaitForOrdersComponent } from './wait-for-orders/wait-for-orders.component';
import { OrderReceiveComponent } from './order-receive/order-receive.component';
import { HandledComponent } from './handled/handled.component';
import { CompletedComponent } from './completed/completed.component';
import { AbnormalComponent } from './abnormal/abnormal.component';
import {ShoppingOrderService} from "./shopping-order.service";

const shoppingOrderChildren: Routes = [
  {path: '', redirectTo: 'all-work-orders'},
  {path: 'all-work-orders', component: AllWorkOrdersComponent},
  {path: 'wait-for-orders', component: WaitForOrdersComponent},
  {path: 'order-receive', component: OrderReceiveComponent},
  {path: 'handled', component: HandledComponent},
  {path: 'completed', component: CompletedComponent},
  {path: 'abnormal', component: AbnormalComponent}
]

const routes: Routes = [
  {path: '', component:ShoppingOrderComponent,children:shoppingOrderChildren},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ShoppingOrderComponent, AllWorkOrdersComponent, WaitForOrdersComponent, OrderReceiveComponent, HandledComponent, CompletedComponent, AbnormalComponent],
  providers: [ShoppingOrderService]
})
export class ShoppingOrderModule { }
