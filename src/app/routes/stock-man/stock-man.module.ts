import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StockManService} from "./stock-man.service";
import {SharedModule} from "../../shared/shared.module";
import { AgentOrdComponent } from './agent-ord/agent-ord.component';
import { OrdRecordComponent } from './ord-record/ord-record.component';
import {FormsModule} from "@angular/forms";
const routes: Routes = [
  {path: 'agentord', component: AgentOrdComponent},
  {path: 'ordRecord', component: OrdRecordComponent}
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AgentOrdComponent, OrdRecordComponent],
  providers: [StockManService]
})
export class StockManModule {}

