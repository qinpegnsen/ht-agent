import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StockManComponent} from "./stock-man/stock-man.component";
import {StockManService} from "./stock-man.service";
import {SharedModule} from "../../shared/shared.module";
const routes: Routes = [
  {path: '', component: StockManComponent}
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [StockManComponent],
  providers: [StockManService]
})
export class StockManModule {}

