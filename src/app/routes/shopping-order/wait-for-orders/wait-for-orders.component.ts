import { Component, OnInit } from '@angular/core';
import {ShoppingOrderComponent} from "../shopping-order.component";

@Component({
  selector: 'app-wait-for-orders',
  templateUrl: './wait-for-orders.component.html',
  styleUrls: ['./wait-for-orders.component.scss']
})
export class WaitForOrdersComponent implements OnInit {

  constructor(
    private parentComp:ShoppingOrderComponent,
  ) { }

  ngOnInit() {
    this.parentComp.orderType = 2;
  }

}
