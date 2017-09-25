import { Component, OnInit } from '@angular/core';
import {ShoppingOrderComponent} from "../shopping-order.component";

@Component({
  selector: 'app-handled',
  templateUrl: './handled.component.html',
  styleUrls: ['./handled.component.scss']
})
export class HandledComponent implements OnInit {

  constructor(
    private parentComp:ShoppingOrderComponent,
  ) { }

  ngOnInit() {
    this.parentComp.orderType = 4;

  }

}
