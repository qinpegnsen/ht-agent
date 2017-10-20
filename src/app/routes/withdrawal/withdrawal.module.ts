import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentordApplyComponent } from './agentord-apply/agentord-apply.component';
import { AgentordRecordComponent } from './agentord-record/agentord-record.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {AgentordRecordService} from "./agentord-record/agentord-record.service";
import {AgentordApplyService} from "./agentord-apply/agentord-apply.service";

const routes: Routes = [
  {path: '', redirectTo:'agentord-record'},
  {path: 'agentord-record', component: AgentordRecordComponent},
  {path: 'agentord-apply', component: AgentordApplyComponent},
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AgentordApplyComponent,
    AgentordRecordComponent
  ],
  providers: [
    AgentordRecordService,
    AgentordApplyService,
    AgentordRecordComponent
  ]
})
export class WithdrawalModule { }
