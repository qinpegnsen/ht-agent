import { Component, OnInit } from '@angular/core';
import {AfterSaleComponent} from "../after-sale.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {Page} from "../../../../core/page/page";
import {SubmitService} from "../../../../core/forms/submit.service";

@Component({
  selector: 'app-all-sale',
  templateUrl: './all-sale.component.html',
  styleUrls: ['./all-sale.component.scss']
})
export class AllSaleComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  public agentTime;
  public afterNo;//售后单号
  public ordno;//订单号
  public custPhone;//手机号
  public woList: Page = new Page();
  public curCancelOrderId: string;
  public curCancelOrderId1: string;
  public showList: boolean = true;


  constructor(public afterSaleComponent:AfterSaleComponent, public submit: SubmitService,public RzhtoolsService:RzhtoolsService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY/MM/DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let _this = this;
    _this.afterSaleComponent.orderType = 1;
    _this.queryDatas(1);
  }

  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    this.showList = false;
    this.afterSaleComponent.orderType = 100;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
    this.afterSaleComponent.orderType = 1;
  }

  /**
   * 隐藏买家信息
   * @param i
   */
  cancelOrder(afterNo) {
    this.curCancelOrderId = afterNo;
  }
  /**
   * 隐藏买家信息
   * @param i
   */
  cancelOrder1(afterNo) {
    this.curCancelOrderId1 = afterNo;
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
      phone: _this.custPhone
    };
    _this.woList = new Page(_this.submit.getData(requestUrl, requestData));

  }

}
