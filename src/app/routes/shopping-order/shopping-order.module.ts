import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShoppingOrderComponent} from "./shopping-order.component";
import {SharedModule} from "../../shared/shared.module";
import {AllWorkOrdersComponent} from './all-work-orders/all-work-orders.component';
import { WaitForOrdersComponent } from './wait-for-orders/wait-for-orders.component';
import { OrderReceiveComponent } from './order-receive/order-receive.component';
import { HandledComponent } from './handled/handled.component';
import { CompletedComponent } from './completed/completed.component';
import { AbnormalComponent } from './abnormal/abnormal.component';
import {ShoppingOrderService} from "./shopping-order.service";
import {RzhtoolsService} from "../../core/services/rzhtools.service";
import {DeliverComponent} from "./deliver/deliver.component";
import { WorkDetailComponent } from './work-detail/work-detail.component';
import {BsModalService, ModalModule} from 'ngx-bootstrap';
import {ReasonRejecComponent} from "./modal-content/reason-rejec.component";

const detailChildren: Routes = [
  {path: 'work-detail', component:WorkDetailComponent}
];
const shoppingOrderChildren: Routes = [
  {path: '', redirectTo: 'all-work-orders'},
  {path: 'all-work-orders', component: AllWorkOrdersComponent,children:detailChildren},
  {path: 'wait-for-orders', component: WaitForOrdersComponent,children:detailChildren},
  {path: 'order-receive', component: OrderReceiveComponent,children:detailChildren},
  {path: 'handled', component: HandledComponent,children:detailChildren},
  {path: 'completed', component: CompletedComponent,children:detailChildren},
  {path: 'abnormal', component: AbnormalComponent,children:detailChildren},
]

const routes: Routes = [
  {path: '', component:ShoppingOrderComponent,children:shoppingOrderChildren},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [ShoppingOrderComponent, AllWorkOrdersComponent, WaitForOrdersComponent, OrderReceiveComponent, HandledComponent, CompletedComponent, AbnormalComponent,DeliverComponent, WorkDetailComponent,ReasonRejecComponent],
  providers: [ShoppingOrderService,RzhtoolsService,AllWorkOrdersComponent,ShoppingOrderComponent,WaitForOrdersComponent],
})
export class ShoppingOrderModule { }
