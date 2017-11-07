import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterSaleComponent } from './after-sale/after-sale.component';
import {RouterModule, Routes} from "@angular/router";
import { AllSaleComponent } from './after-sale/all-sale/all-sale.component';
import { ProcessedComponent } from './after-sale/processed/processed.component';
import { AgreedComponent } from './after-sale/agreed/agreed.component';
import { RefusedComponent } from './after-sale/refused/refused.component';
import {SharedModule} from "app/shared/shared.module";
import {RzhtoolsService} from "../../core/services/rzhtools.service";
import { LogisticsComponent } from './after-sale/logistics/logistics.component';
import { RefusedAgentComponent } from './after-sale/refused-agent/refused-agent.component';
import { SaleDetailComponent } from './after-sale/sale-detail/sale-detail.component';
import {AfterSaleService} from "./after-sale.service";

const routes: Routes = [
  {path: '', redirectTo: 'sales'},
  {
    path: 'sales', component: AfterSaleComponent, children: [
    {path: '', redirectTo: 'all-sale'},
    {path: 'all-sale', component: AllSaleComponent,children: [
      {path: 'sale-detail', component: SaleDetailComponent}
    ]},
    {path: 'processed', component: ProcessedComponent,children: [
      {path: 'sale-detail', component: SaleDetailComponent}
    ]},
    {path: 'agreed', component: AgreedComponent,children: [
      {path: 'sale-detail', component: SaleDetailComponent}
    ]},
    {path: 'refused', component: RefusedComponent,children: [
      {path: 'sale-detail', component: SaleDetailComponent}
    ]},
    {path: 'sale-detail', component: SaleDetailComponent},
  ]
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    RzhtoolsService,
    AgreedComponent,
    AllSaleComponent,
    AfterSaleComponent,
    RefusedComponent,
    AfterSaleService
  ],
  declarations: [AfterSaleComponent, AllSaleComponent, ProcessedComponent, AgreedComponent, RefusedComponent, LogisticsComponent, RefusedAgentComponent, SaleDetailComponent]
})
export class AfterSaleModule { }
