import {Component, OnInit} from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {ShoppingOrderComponent} from "../shopping-order.component";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {ShoppingOrderService} from "../shopping-order.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {isNullOrUndefined} from "util";
import {StockManService} from "../../stock-man/stock-man.service";

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
  public showReasonWindow:boolean = false;                  //弹窗的开关
  public woAgengId:any;                                      //代理商工单id
  private transWoAgengId:any;                                 //传递到拒单组件的
  private LogisticsData:any;                                  //物流数据
  private custPhone:any;                                      //买家的手机号

  constructor(private parentComp: ShoppingOrderComponent,
              private submit: SubmitService,
              private shoppingOrderService: ShoppingOrderService,
              private stockManService: StockManService,
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
    me.queryDatas(1)
    this.stateEnumList = this.rzhtoolsService.getEnumDataList(1305);
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage,event?: PageEvent) {
    let activePage = 1, _this = this;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    let requestUrl = '/woAgent/query';
    let requestData = {
      sortColumns: '',
      curPage: activePage,
      pageSize: 10,
      wono: this.wono,
      ordno: this.ordno,
      custPhone: this.custPhone,
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
  toAccept(woAgengId,curPage) {
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
        that.queryDatas(curPage)
      }
    );
  }

  /**
   * 拒单
   */
  toReject(woAgengId) {
    this.transWoAgengId = woAgengId;
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
   * json 转 object
   * @param val
   */
  jsonToObject(val:string){
    return RzhtoolsService.jsonToObject(val);
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event,i){
    i.style.display = 'block';
    i.style.top = (event.clientY+10) + 'px';
    i.style.left = (event.clientX+10)+ 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(i) {
    i.style.display = 'none';
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
   *显示物流信息
   * @param orderId
   */
  showLogistics(Logistics,ordno){
    Logistics.style.display = 'block';
    let url='/ord/tail/queryDeliveryList';
    let data={
      ordno:ordno
    };
    this.LogisticsData=this.stockManService.getShopList(url,data);
  }

  /**
   *隐藏物流信息
   * @param orderId
   */
  hideLogistics(Logistics){
    Logistics.style.display = 'none';
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
  closeRejecWin(bol,curPage){
    this.transWoAgengId=null;
    console.log("█ bol ►►►",  bol);
    if(bol){
      this.queryDatas(curPage);
    }
  }
}


