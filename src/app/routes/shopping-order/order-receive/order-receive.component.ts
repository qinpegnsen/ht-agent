import { Component, OnInit } from '@angular/core';
import {ShoppingOrderComponent} from "../shopping-order.component";

@Component({
  selector: 'app-order-receive',
  templateUrl: './order-receive.component.html',
  styleUrls: ['./order-receive.component.scss']
})
export class OrderReceiveComponent implements OnInit {

  constructor(
    private parentComp:ShoppingOrderComponent,
  ) { }

  ngOnInit() {
    this.parentComp.orderType = 3;

  }

}
