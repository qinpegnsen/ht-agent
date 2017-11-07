import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
import {Location} from "@angular/common";

defineLocale('cn', zhCn);

@Component({
  selector: 'app-shopping-order',
  templateUrl: './shopping-order.component.html',
  styleUrls: ['./shopping-order.component.scss']
})

export class ShoppingOrderComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  public orderType: number = 1;
  constructor(private location: Location) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat:"YYYY/MM/DD",
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
  }

  routeBack() {
    this.location.back()
  }
}
