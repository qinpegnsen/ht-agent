import { Component, OnInit } from '@angular/core';
import {ShoppingOrderComponent} from "../shopping-order.component";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";

@Component({
  selector: 'app-wait-for-orders',
  templateUrl: './wait-for-orders.component.html',
  styleUrls: ['./wait-for-orders.component.scss']
})
export class WaitForOrdersComponent implements OnInit {

  public workOrderList: Page = new Page();                    //获取列表的数据
  constructor(
    private parentComp:ShoppingOrderComponent,
    private submit: SubmitService,
  ) { }

  /**
   * 1.设置当前点击的颜色
   * 2.获取当前状态的列表
   */
  ngOnInit() {
    this.parentComp.orderType = 2;
    this.queryDatas();
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
    let requestUrl = '/woAgent/query';
    let requestData = {
      sortColumns:'',
      curPage: activePage,
      pageSize: 15,
      agentCode:'',
      wono:'',
      ordno:'',
      ordType:'ORD',//工单类型 售后工单
      stateEnum: 'NO', //待结单
    };
    _this.workOrderList = new Page(_this.submit.getData(requestUrl, requestData));
  }

}
