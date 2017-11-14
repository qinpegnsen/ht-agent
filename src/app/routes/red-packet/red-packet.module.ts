import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedPacketStaticsComponent } from './red-packet-statics/red-packet-statics.component';
import { RedPacketPushOrderComponent } from './red-packet-push-order/red-packet-push-order.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {path: 'statics', component: RedPacketStaticsComponent},
  {path: 'pushOrder', component:RedPacketPushOrderComponent },
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RedPacketStaticsComponent, RedPacketPushOrderComponent]
})
export class RedPacketModule { }
