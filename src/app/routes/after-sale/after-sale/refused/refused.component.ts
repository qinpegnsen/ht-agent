import { Component, OnInit } from '@angular/core';
import {AfterSaleComponent} from "../after-sale.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
defineLocale('cn', zhCn);


@Component({
  selector: 'app-refused',
  templateUrl: './refused.component.html',
  styleUrls: ['./refused.component.scss']
})
export class RefusedComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;


  constructor(private AfterSaleComponent:AfterSaleComponent) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY/MM/DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let _this = this;
    _this.AfterSaleComponent.orderType = 4;
  }

}
