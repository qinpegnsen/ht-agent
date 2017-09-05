import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StockAddresComponent} from "./stock-addres/stock-addres.component";
import {RouterModule, Routes} from "@angular/router";
const routes: Routes = [
  {path: '', component: StockAddresComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StockAddresComponent]
})
export class StockAddresModule { }
