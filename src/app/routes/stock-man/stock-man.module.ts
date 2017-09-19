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
import {WaitForEvalComponent} from "./ord-record/wait-for-eval/wait-for-eval.component";
import {FinishedComponent} from "./ord-record/finished/finished.component";
import {CanceledComponent} from "./ord-record/canceled/canceled.component";
import {OrderDetailComponent} from "./ord-record/order-detail/order-detail.component";
import {AllOrdersComponent} from "./ord-record/all-orders/all-orders.component";


const orderRecordChildren: Routes = [
    {path: '', redirectTo: 'all-orders'},
    {path: 'all-orders', component: AllOrdersComponent},
    {path: 'wait-for-pay', component: WaitForPayComponent},
    {path: 'wait-for-send', component: WaitForSendComponent},
    {path: 'wait-for-eval', component: WaitForEvalComponent},
    {path: 'finished', component: FinishedComponent},
    {path: 'canceled', component: CanceledComponent},
    {path: 'order-detail', component: OrderDetailComponent}
]

const doChildren: Routes = [
  {path: 'callBack', component:PaySuccessComponent}
];

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'agentord', component: AgentOrdComponent},
  {path: 'ordRecord', component: OrdRecordComponent,children:orderRecordChildren},
  {path: 'cart', component: CarPageComponent},
  {path: 'order', component: OrderPageComponent},
  {path: 'pay', component:PayPageComponent},
  {path: 'do', component:DoPayComponent,children:doChildren}
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
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
    WaitForEvalComponent,
    FinishedComponent,
    CanceledComponent,
    OrderDetailComponent,
    AllOrdersComponent
  ],
  providers: [StockManService]
})
export class StockManModule {}

