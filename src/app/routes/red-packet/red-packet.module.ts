import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedPacketStaticsComponent } from './red-packet-statics/red-packet-statics.component';
import { RedPacketPushOrderComponent } from './red-packet-push-order/red-packet-push-order.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {RedPacketService} from "./red-packet.service";
import {AngularEchartsModule} from "ngx-echarts";

const routes: Routes = [
  {path: 'statics', component: RedPacketStaticsComponent},
  {path: 'pushOrder', component:RedPacketPushOrderComponent },
];
@NgModule({
  imports: [
    SharedModule,
    AngularEchartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RedPacketStaticsComponent, RedPacketPushOrderComponent],
  providers:[RedPacketService]
})
export class RedPacketModule { }
