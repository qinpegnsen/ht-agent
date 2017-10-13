import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";

defineLocale('cn', zhCn);

@Component({
  selector: 'app-shopping-order',
  templateUrl: './shopping-order.component.html',
  styleUrls: ['./shopping-order.component.scss']
})

export class ShoppingOrderComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  public orderType: number = 1;
  constructor() {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat:"YYYY/MM/DD",
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
  }

}
