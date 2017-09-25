import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShoppingOrderComponent} from "./shopping-order.component";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {path: '', component:ShoppingOrderComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ShoppingOrderComponent]
})
export class ShoppingOrderModule { }
