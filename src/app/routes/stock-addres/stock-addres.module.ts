import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StockAddresComponent} from "./stock-addres/stock-addres.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { RightpageComponent } from './rightpage/rightpage.component';
import {RzhtoolsService} from "../../core/services/rzhtools.service";
import {PatternService} from "../../core/forms/pattern.service";

// 子路由，用于页面嵌套显示
const appChildRoutes: Routes = [
  {path: 'rightpage', component: RightpageComponent}
];
// 父路由，用于页面嵌套显示
const routes: Routes = [
  {path: '', component: StockAddresComponent,children: appChildRoutes}
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(), // 公用模块
    RouterModule.forChild(routes)
  ],
  declarations: [StockAddresComponent, RightpageComponent],
  providers:[RzhtoolsService,PatternService]
})
export class StockAddresModule { }
