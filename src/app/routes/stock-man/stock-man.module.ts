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

const pageChildRoutes: Routes = [
  {path: 'pay', component: PayPageComponent}
];
const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'agentord', component: AgentOrdComponent},
  {path: 'ordRecord', component: OrdRecordComponent},
  {path: 'car', component: CarPageComponent,children: pageChildRoutes},
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AgentOrdComponent, OrdRecordComponent, CarPageComponent, PayPageComponent],
  providers: [StockManService]
})
export class StockManModule {}

