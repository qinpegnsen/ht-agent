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
  public agentTime;
  public woList: Page = new Page();
  public afterNo;//售后单号
  public ordno;//订单号
  public custPhone;//手机号
  public showList: boolean = true;

  constructor(public AfterSaleComponent:AfterSaleComponent,public submit: SubmitService,) {
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
   * 子组件加载时
   * @param event
   */
  activate(event) {
    this.showList = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
    this.AfterSaleComponent.orderType = 4;
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
    let requestUrl = '/after/queryAfterGoodsReqPages';
    //格式化时间格式
    let dateStr = '';
    if (this.agentTime) {
      dateStr = RzhtoolsService.dataFormat(this.agentTime[0], 'yyyy/MM/dd') + '-' + RzhtoolsService.dataFormat(this.agentTime[1], 'yyyy/MM/dd');
    }

    let requestData = {
      curPage: activePage,
      pageSize: 10,
      afterNo: _this.afterNo,
      ordno: _this.ordno,
      phone: _this.custPhone,
      state:'CHECK_FAILS'
    };
    _this.woList = new Page(_this.submit.getData(requestUrl, requestData));
  }

}
