import { Component, OnInit } from '@angular/core';
import {ShoppingOrderComponent} from "../shopping-order.component";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {ShoppingOrderService} from "../shopping-order.service";

@Component({
  selector: 'app-handled',
  templateUrl: './handled.component.html',
  styleUrls: ['./handled.component.scss']
})
export class HandledComponent implements OnInit {

  public workOrderList: Page = new Page();                    //获取列表的数据
  constructor(
    private parentComp:ShoppingOrderComponent,
    private submit: SubmitService,
    private shoppingOrderService: ShoppingOrderService
  ) { }

  /**
   * 1.设置当前点击的颜色
   * 2.获取当前状态的列表
   */
  ngOnInit() {
    this.parentComp.orderType = 4;
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
      stateEnum: 'DEAL',//已处理
    };
    _this.workOrderList = new Page(_this.submit.getData(requestUrl, requestData));
  }

  /**
   * 查看详情
   * @param woAgengId
   */
  lookInfo(ordno){
    let url = '/woAgent/updateWoAgentToReject';
    let data = {
      ordno:ordno
    };
    this.shoppingOrderService.toAcceptWork(url,data)
  }
}
