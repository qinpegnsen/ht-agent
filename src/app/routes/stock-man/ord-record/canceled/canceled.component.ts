import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {SubmitService} from "../../../../core/forms/submit.service";
import {OrdRecordComponent} from "../ord-record.component";

@Component({
  selector: 'app-canceled',
  templateUrl: './canceled.component.html',
  styleUrls: ['./canceled.component.scss']
})
export class CanceledComponent implements OnInit {

  public curCancelOrderId:string;
  public lookLogisticsOrderId:string;
  public goodsList: Page = new Page();
  constructor(private submit: SubmitService,private parentComp:OrdRecordComponent) { }

  /**
   * 1.设置当前点击的颜色
   * 2.获取当前状态的列表
   */
  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 6;
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
    let requestUrl = ' /agentOrd/queryAgentState';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      state: 'CLOSE ',
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
