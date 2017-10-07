import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentInformationComponent } from './agent-information/agent-information.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

const routes:Routes = [
  {path:'',component:AgentInformationComponent},
  {path:'agent-information',component:AgentInformationComponent}
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgentInformationComponent]
})
export class AgentInformationModule { }

