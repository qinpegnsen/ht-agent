import { Component, OnInit } from '@angular/core';
import {ShoppingOrderComponent} from "../shopping-order.component";

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

  constructor(
    private parentComp:ShoppingOrderComponent,
  ) { }

  ngOnInit() {
    this.parentComp.orderType = 5;

  }

}
