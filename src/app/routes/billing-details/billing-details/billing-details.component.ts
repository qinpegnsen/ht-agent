import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {BillingDetailsService} from "./billing-details.service";
import {zhCn} from "ngx-bootstrap/locale";
import {defineLocale} from "ngx-bootstrap";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  private data:Page = new Page();

  constructor(private BillingDetailsService:BillingDetailsService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY/MM/DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    this.queryDatas();
  }
  /**
   * 查询菜单列表
   **/
  public queryDatas(event?:PageEvent) {
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;

    let listInfos = this.BillingDetailsService.queryMenuList(activePage, 20);
    me.data = new Page(listInfos);
  }

}
