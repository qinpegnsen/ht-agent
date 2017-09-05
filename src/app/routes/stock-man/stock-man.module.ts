import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StockManComponent} from "./stock-man.component";
import {StockManService} from "./stock-man.service";
import {SharedModule} from "../../shared/shared.module";
const routes: Routes = [
  {path: '', component: StockManComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule.forRoot() // 公用模块
  ],
  declarations: [StockManComponent],
  providers: [StockManService]
})
export class StockManModule {}

