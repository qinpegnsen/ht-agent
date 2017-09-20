import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {SubmitService} from "../../../../core/forms/submit.service";
import {Router} from "@angular/router";
import {OrdRecordComponent} from "../ord-record.component";

@Component({
  selector: 'app-wait-for-pay',
  templateUrl: './wait-for-pay.component.html',
  styleUrls: ['./wait-for-pay.component.scss']
})
export class WaitForPayComponent implements OnInit {
  public curCancelOrderId:string;
  public goodsList: Page = new Page();
  constructor(private submit: SubmitService,private router: Router,private parentComp:OrdRecordComponent) { }

  /**
   * 1.设置当前点击的颜色
   * 2.获取当前状态的列表
   */
  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 2;
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
      state: 'CR',
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
   * 去付款
   */
  goPay(){
    this.router.navigate(['/main/stockMan/do/callBac'],{ queryParams: {  } })
  }
}
