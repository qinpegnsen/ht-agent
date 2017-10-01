import { Component, OnInit } from '@angular/core';
import {AfterSaleComponent} from "../after-sale.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {Page} from "../../../../core/page/page";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {SubmitService} from "../../../../core/forms/submit.service";

@Component({
  selector: 'app-processed',
  templateUrl: './processed.component.html',
  styleUrls: ['./processed.component.scss']
})
export class ProcessedComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  private agentTime;
  public woList: Page = new Page();
  public curCancelOrderId: string;
  public curCancelOrderId1: string;


  constructor(private AfterSaleComponent:AfterSaleComponent,private submit: SubmitService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY/MM/DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let _this = this;
    _this.AfterSaleComponent.orderType = 2;
    _this.queryDatas(1);
  }
  /**
   * 隐藏买家信息
   * @param i
   */
  cancelOrder(orderId) {
    this.curCancelOrderId = orderId;
  }
  /**
   * 隐藏买家信息
   * @param i
   */
  cancelOrder1(orderId) {
    this.curCancelOrderId = orderId;
  }
  /**
   * 取消订单回调函数
   * @param data
   */
  getCancelOrderData(data) {
    this.curCancelOrderId = null;
  }
  /**
   * 取消订单回调函数
   * @param data
   */
  getCancelOrderData1(data) {
    this.curCancelOrderId1 = null;
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
      stateEnum:'DEAL'
    };
    _this.woList = new Page(_this.submit.getData(requestUrl, requestData));

  }
}
