import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {SubmitService} from "../../../../core/forms/submit.service";
import {OrdRecordComponent} from "../ord-record.component";

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  public curCancelOrderId:string;
  public curDeliverOrderId:string;
  public lookLogisticsOrderId:string;
  public goodsList: Page = new Page();
  constructor(private submit: SubmitService,) { }

  ngOnInit() {
    let me = this;
    me.queryDatas('')
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(state,event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    }
    let requestUrl = ' /agentOrd/pageAgentState';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      state: state,
    };
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
    console.log("█ _this.goodsList ►►►",  _this.goodsList);
  }

  /**
   * 显示买家信息
   * @param event
   * @param i
   */
  showUserInfo(i){
    i.style.display = 'block';
  }

  /**
   * 隐藏买家信息
   * @param i
   */
  hideBuyerInfo(i){
    i.style.display = 'none';
  }
  cancelOrder(orderId){
    this.curCancelOrderId = orderId;
  }
  deliverOrder(orderId){
    this.curDeliverOrderId = orderId;
  }
  lookLogistics(orderId){
    this.lookLogisticsOrderId = orderId;
  }
  /**
   * 取消订单回调函数
   * @param data
   */
  getCancelOrderData(data){
    this.curCancelOrderId = null;
  }

  /**
   * 发货回调函数
   * @param data
   */
  getDeliverOrderData(data){
    this.curDeliverOrderId = null;
  }
  /**
   * 查询物流回调函数
   * @param data
   */
  getLogisticsData(data){
    this.lookLogisticsOrderId = null;
  }
}
