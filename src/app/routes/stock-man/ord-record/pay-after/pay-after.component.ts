import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {SubmitService} from "../../../../core/forms/submit.service";
import {OrdRecordComponent} from "../ord-record.component";

@Component({
  selector: 'app-pay-after',
  templateUrl: './pay-after.component.html',
  styleUrls: ['./pay-after.component.scss']
})
export class PayAfterComponent implements OnInit {

  public curCancelOrderId:string;
  public lookLogisticsOrderId:string;
  public goodsList: Page = new Page();
  constructor(private submit: SubmitService,private parentComp:OrdRecordComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 3;
    me.queryDatas()
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    }
    let requestUrl = ' /agentOrd/pageAgentState';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      state: 'PAID',
    };
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
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

  /**
   *  取消订单
   * @param orderId
   */
  cancelOrder(orderId){
    this.curCancelOrderId = orderId;
  }

  /**
   *查看物流信息
   * @param orderId
   */
  lookLogistics(orderId){
    this.lookLogisticsOrderId = orderId;
  }

}
