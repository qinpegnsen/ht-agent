import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {ShoppingOrderComponent} from "../shopping-order.component";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {ShoppingOrderService} from "../shopping-order.service";

@Component({
  selector: 'app-all-work-orders',
  templateUrl: './all-work-orders.component.html',
  styleUrls: ['./all-work-orders.component.scss']
})
export class AllWorkOrdersComponent implements OnInit {

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
    let me = this;
    me.parentComp.orderType = 1;
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
    let requestUrl = '/woAgent/query';
    let requestData = {
      sortColumns:'',
      curPage: activePage,
      pageSize: 15,
      agentCode:'',
      wono:'',
      ordno:'',
      ordType:'ORD',//工单类型 售后工单
      stateEnum: '',
    };
    _this.workOrderList = new Page(_this.submit.getData(requestUrl, requestData));
  }


  /**
   * 接单
   * @param woAgengId 代理商工单id
   * 1. 刷新页面
   */
  toAccept(woAgengId){
    let url = '/woAgent/updateWoAgentToAccept';
    let data = {
      woAgengId:woAgengId
    };
    this.shoppingOrderService.toAcceptWork(url,data);
    this.queryDatas()
  }

  /**
   * 拒单
   * @param woAgengId 代理商工单id
   * 1. 刷新页面
   */
  toReject(woAgengId){
    let url = '/woAgent/updateWoAgentToReject';
    let data = {
      woAgengId:woAgengId
    };
    this.shoppingOrderService.toAcceptWork(url,data);
    this.queryDatas();
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

  /**
   * 发货
   * @param id
   * 1. 刷新页面
   */
  deliver(id){
    let url = '/woAgent/updateWoAgentToReject';
    let data = {
      id:id
    };
    this.shoppingOrderService.toAcceptWork(url,data);
    this.queryDatas();
  }
}
