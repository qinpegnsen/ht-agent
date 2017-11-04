import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {BillingDetailsService} from "./billing-details/billing-details.service";

// 父路由，用于页面嵌套显示
const routes: Routes = [
  {path: '', component: BillingDetailsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(), // 公用模块
    RouterModule.forChild(routes)
  ],
  declarations: [BillingDetailsComponent],
  providers: [BillingDetailsService]
})
export class BillingDetailsModule { }
