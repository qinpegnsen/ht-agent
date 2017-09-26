import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from 'ngx-bootstrap/locale';
defineLocale('cn', zhCn);


@Component({
  selector: 'app-after-sale',
  templateUrl: './after-sale.component.html',
  styleUrls: ['./after-sale.component.scss']
})
export class AfterSaleComponent implements OnInit {
  public orderType: number = 1;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;

  constructor() { }

  ngOnInit() {
  }

}
