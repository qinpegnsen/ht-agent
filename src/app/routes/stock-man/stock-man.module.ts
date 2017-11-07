import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StockManService} from "./stock-man.service";
import {SharedModule} from "../../shared/shared.module";
import { AgentOrdComponent } from './agent-ord/agent-ord.component';
import { OrdRecordComponent } from './ord-record/ord-record.component';
import {FormsModule} from "@angular/forms";
import { CarPageComponent } from './car-page/car-page.component';
import {HomeComponent} from "../home/home/home.component";
import { PayPageComponent } from './pay-page/pay-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { DoPayComponent } from './do-pay/do-pay.component';
import { PaySuccessComponent } from './pay-success/pay-success.component';
import {WaitForPayComponent} from "./ord-record/wait-for-pay/wait-for-pay.component";
import {WaitForSendComponent} from "./ord-record/wait-for-send/wait-for-send.component";
import {FinishedComponent} from "./ord-record/finished/finished.component";
import {CanceledComponent} from "./ord-record/canceled/canceled.component";
import {OrderDetailComponent} from "./ord-record/order-detail/order-detail.component";
import {AllOrdersComponent} from "./ord-record/all-orders/all-orders.component";
import { PayAfterComponent } from './ord-record/pay-after/pay-after.component';
import { WaitForReceiveComponent } from './ord-record/wait-for-receive/wait-for-receive.component';
import {RzhtoolsService} from "../../core/services/rzhtools.service";

const detailChildren: Routes = [
  {path: 'order-detail', component: OrderDetailComponent}
]
const orderRecordChildren: Routes = [
    {path: '', redirectTo: 'all-orders'},
    {path: 'all-orders', component: AllOrdersComponent,children:detailChildren},
    {path: 'wait-for-pay', component: WaitForPayComponent,children:detailChildren},
    {path: 'pay-after', component: PayAfterComponent,children:detailChildren},
    {path: 'wait-for-send', component: WaitForSendComponent,children:detailChildren},
    {path: 'wait-for-receive', component: WaitForReceiveComponent,children:detailChildren},
    {path: 'finished', component: FinishedComponent,children:detailChildren},
    {path: 'canceled', component: CanceledComponent,children:detailChildren}
]

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'agentord', component: AgentOrdComponent},
  {path: 'ordRecord', component: OrdRecordComponent,children:orderRecordChildren},
  {path: 'cart', component: CarPageComponent},
  {path: 'order', component: OrderPageComponent},
  {path: 'pay', component:PayPageComponent},
  {path: 'do', component:DoPayComponent},
  {path: 'aliCallBacK', component:PaySuccessComponent}
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AgentOrdComponent,
    OrdRecordComponent,
    CarPageComponent,
    PayPageComponent,
    OrderPageComponent,
    DoPayComponent,
    PaySuccessComponent,
    WaitForPayComponent,
    WaitForSendComponent,
    FinishedComponent,
    CanceledComponent,
    OrderDetailComponent,
    AllOrdersComponent,
    PayAfterComponent,
    WaitForReceiveComponent
  ],
  providers: [StockManService,RzhtoolsService]
})
export class StockManModule {}

