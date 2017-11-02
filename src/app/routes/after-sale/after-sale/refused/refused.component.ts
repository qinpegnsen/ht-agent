import { Component, OnInit } from '@angular/core';
import {AfterSaleComponent} from "../after-sale.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {Page} from "../../../../core/page/page";
import {SubmitService} from "../../../../core/forms/submit.service";
defineLocale('cn', zhCn);


@Component({
  selector: 'app-refused',
  templateUrl: './refused.component.html',
  styleUrls: ['./refused.component.scss']
})
export class RefusedComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  private agentTime;
  public woList: Page = new Page();
  private ordnos;
  private wonos;
  private custPhone;


  constructor(private AfterSaleComponent:AfterSaleComponent,private submit: SubmitService,) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY/MM/DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let _this = this;
    _this.AfterSaleComponent.orderType = 4;
    _this.queryDatas(1);
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage, event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestUrl = '/woAgent/query';
    //格式化时间格式
    let dateStr = '';
    if (this.agentTime) {
      dateStr = RzhtoolsService.dataFormat(this.agentTime[0], 'yyyy/MM/dd') + '-' + RzhtoolsService.dataFormat(this.agentTime[1], 'yyyy/MM/dd');
    }

    let requestData = {
      curPage: activePage,
      pageSize: 10,
      ordType:'SELL_AFTER',
      stateEnum:'END',
      ordnos: _this.ordnos,
      wonos: _this.wonos,
      custPhone: _this.custPhone
    };
    _this.woList = new Page(_this.submit.getData(requestUrl, requestData));
  }

}
