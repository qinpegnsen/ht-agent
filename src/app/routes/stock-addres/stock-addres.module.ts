import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StockAddresComponent} from "./stock-addres/stock-addres.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
const routes: Routes = [
  {path: '', component: StockAddresComponent}
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(), // 公用模块
    RouterModule.forChild(routes)
  ],
  declarations: [StockAddresComponent]
})
export class StockAddresModule { }
