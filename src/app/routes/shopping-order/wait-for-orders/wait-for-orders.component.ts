import { Component, OnInit } from '@angular/core';
import {ShoppingOrderComponent} from "../shopping-order.component";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {ShoppingOrderService} from "../shopping-order.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";

@Component({
  selector: 'app-wait-for-orders',
  templateUrl: './wait-for-orders.component.html',
  styleUrls: ['./wait-for-orders.component.scss']
})
export class WaitForOrdersComponent implements OnInit {

  public workOrderList: Page = new Page();                    //获取列表的数据
  public wono:string='';                                      //工单号
  public ordno:string='';                                     //订单号
  public stateEnum:string='';                                 //工单状态
  public stateEnumList;                                       //工单状态的列表
  constructor(
    private parentComp:ShoppingOrderComponent,
    private submit: SubmitService,
    private shoppingOrderService: ShoppingOrderService,
    private rzhtoolsService: RzhtoolsService
  ) { }

  /**
   * 1.设置当前点击的颜色
   * 2.获取当前状态的列表
   * 3.获取订单状态的列表，用来搜索
   */
  ngOnInit() {
    this.parentComp.orderType = 2;
    this.queryDatas();
    this.stateEnumList=this.rzhtoolsService.getEnumDataList(1305);
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
      wono:this.wono,
      ordno:this.ordno,
      ordType:'ORD',//工单类型 购物订单
      stateEnum:this.stateEnum?this.stateEnum:'NO',
    };
    _this.workOrderList = new Page(_this.submit.getData(requestUrl, requestData));
  }


  /**
   * 接单
   * @param woAgengId 代理商工单id
   * 1.刷新页面
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
   * 1.刷新页面
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
   * 获取搜索框选择的状态值
   * @param val
   */
  getState(val){
    this.stateEnum=val;
  }

  /**
   * 设置按钮的禁用和启用
   * @param obj
   * @param state
   */
  changeState(obj,state){
    if(state!='NO'){
      obj.disabled=true;
    }else{
      obj.disabled=false;
    }
  }

}
