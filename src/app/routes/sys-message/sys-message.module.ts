import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MessageInformService} from "./sys-message.service";
import {SharedModule} from "../../shared/shared.module";
import {SysMessageComponent} from "./sys-message.component";
import {MessageListComponent} from "./message-list/message-list.component";

const sysMessageChildRoutes: Routes = [
  {path: '',redirectTo:'message-list'},
  {path: 'message-list', component: MessageListComponent}
]
const routes: Routes = [
  {path: '',redirectTo:'sys-message'},
  {path: 'sys-message', component: SysMessageComponent,children:sysMessageChildRoutes},
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(), // 公用模块
    RouterModule.forChild(routes)
  ],
  declarations: [SysMessageComponent,MessageListComponent],
  providers:[MessageInformService]
})
export class sysMessageModule { }
