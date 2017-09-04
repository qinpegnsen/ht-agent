import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StockManComponent} from "./stock-man.component";
const routes: Routes = [
  {path: '', component: StockManComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StockManComponent]
})
export class StockManModule { }
