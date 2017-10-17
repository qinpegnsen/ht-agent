import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageInformComponent } from './message-inform/message-inform.component';
import {RouterModule, Routes} from "@angular/router";
import {MessageInformService} from "./message-inform.service";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {path: '', component:MessageInformComponent},
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(), // 公用模块
    RouterModule.forChild(routes)
  ],
  declarations: [MessageInformComponent],
  providers:[MessageInformService]
})
export class MessageInformModule { }
