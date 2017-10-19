import {Component, OnInit} from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {ShoppingOrderComponent} from "../shopping-order.component";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {ShoppingOrderService} from "../shopping-order.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";

const swal = require('sweetalert');
declare var $;

@Component({
  selector: 'app-all-work-orders',
  templateUrl: './all-work-orders.component.html',
  styleUrls: ['./all-work-orders.component.scss']
})

export class AllWorkOrdersComponent implements OnInit {

  public workOrderList: Page = new Page();                    //获取列表的数据
  public wono: string = '';                                   //工单号
  public ordno: string = '';                                  //订单号
  public stateEnum: string = '';                              //工单状态搜索时候会用到
  public stateEnumList;                                       //工单状态的列表
  public curWoAgentId: string;                                //工单的id
  public curOrdno: string;                                    //订单编码
  private showReasonWindow:boolean = false;                  //弹窗的开关
  private woAgengId:any;                                      //代理商工单id

  constructor(private parentComp: ShoppingOrderComponent,
              private submit: SubmitService,
              private shoppingOrderService: ShoppingOrderService,
              private rzhtoolsService: RzhtoolsService,) {
  }

  /**
   * 1.设置当前点击的颜色
   * 2.获取当前状态的列表
   * 3.获取订单状态的列表，用来搜索
   */
  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 1;
    me.queryDatas()
    this.stateEnumList = this.rzhtoolsService.getEnumDataList(1305);
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
      sortColumns: '',
      curPage: activePage,
      pageSize: 10,
      agentCode: '',
      wono: this.wono,
      ordno: this.ordno,
      ordType: 'ORD',//工单类型 购物订单
      stateEnum: this.stateEnum,
    };
    _this.workOrderList = new Page(_this.submit.getData(requestUrl, requestData));
  }

  /**
   * 接单
   * @param woAgengId 代理商工单id
   * 1. 刷新页面
   * 2.设置按钮的禁用和启用
   */
  toAccept(woAgengId) {
    let that = this;
    swal({
        title: '确认接单吗？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        let url = '/woAgent/updateWoAgentToAccept';
        let data = {
          woAgengId: woAgengId
        };
        that.shoppingOrderService.toAcceptWork(url, data);
        that.queryDatas()
      }
    );
  }

  /**
   * 拒单
   */
  toReject(woAgengId) {
    this.woAgengId = woAgengId;
    this.showReasonWindow = true;
  }

  /**
   * 发货
   * @param woAgentId    代理商工单id
   * @param ordno        订单编码
   */
  deliver(woAgentId, ordno) {
    this.curWoAgentId = woAgentId;
    this.curOrdno = ordno;
  }

  /**
   * 获取搜索框选择的状态值
   * @param val
   */
  getState(val) {
    this.stateEnum = val;
  }

  /**
   * 发货回调函数
   * @param data
   */
  getDeliverOrderData(data) {
    this.curOrdno = null;//输入属性发生变化的时候，弹窗才会打开，所以每次后来都清空，造成变化的迹象
    if (data.type) this.queryDatas(data.page)
  }

  /**
   * 拒单的回调函数，产生输入属性的变化
   */
  closeRejecWin(bol){
    this.showReasonWindow=bol;
  }
}


