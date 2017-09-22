import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {SubmitService} from "../../../../core/forms/submit.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrdRecordComponent} from "../ord-record.component";
import {StockManService} from "../../stock-man.service";

@Component({
  selector: 'app-wait-for-pay',
  templateUrl: './wait-for-pay.component.html',
  styleUrls: ['./wait-for-pay.component.scss']
})
export class WaitForPayComponent implements OnInit {
  public goodsList: Page = new Page();
  constructor(
    private submit: SubmitService,
    private router: Router,
    private parentComp:OrdRecordComponent,
    private stockManService: StockManService
  ) { }

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
    let requestUrl = ' /agentOrd/queryAgentState';
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
  cancelOrder(ordno){
    let url='/agentOrd/delAgentOrd';
    let data={
      ordno:ordno
    }
    this.stockManService.delAgentOrd(url,data)
  }

  /**
   * 去付款
   */
  goPay(ordno,payWay){
    this.router.navigate(['/main/stockMan/pay'],{ queryParams: {'ordno':ordno,"payWay":payWay} })
  }
}
