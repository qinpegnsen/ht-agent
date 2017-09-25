import { Component, OnInit } from '@angular/core';
import {ShoppingOrderComponent} from "../shopping-order.component";

@Component({
  selector: 'app-abnormal',
  templateUrl: './abnormal.component.html',
  styleUrls: ['./abnormal.component.scss']
})
export class AbnormalComponent implements OnInit {

  constructor(
    private parentComp:ShoppingOrderComponent,
  ) { }

  ngOnInit() {
    this.parentComp.orderType = 6;

  }

}
