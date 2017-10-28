import {Component, OnInit} from "@angular/core";
import {isNullOrUndefined} from "util";
import {ShoppingOrderComponent} from "../shopping-order.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppingOrderService} from "../shopping-order.service";
const swal = require('sweetalert');
declare var $:any;
@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss']
})

export class WorkDetailComponent implements OnInit {

  public orderStep = 1;
  public curOrdno: string;
  public transcurOrdno: string;                          //传递到发货组件的订单号
  public orderStates: any;
  public orderDetailData: any;
  public goodsData: any;
  public hasDeliverData: boolean = false;                //是否显示快递信息，当为收货或者是收货后显示
  public expressData: any;                                //快递公司信息
  private atime:Array<string> = new Array();
  private showReasonWindow:boolean = false;              //弹窗的开关
  private woAgengId:any;                                  //代理商工单id 发货的时候用,因为load没有返回来，直接从前面传过来
  private transWoAgengId:any;                             //代理商工单id

  constructor(
              private parentComp: ShoppingOrderComponent,
              public shoppingOrderService: ShoppingOrderService,
              public router: Router,
              private routeInfo:ActivatedRoute) {
  }

  /**
   * 1.调用物流的接口信息
   * 2.获取订单详情的信息
   */
  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 100;
    me.curOrdno = me.routeInfo.snapshot.queryParams['ordno'];
    me.woAgengId = me.routeInfo.snapshot.queryParams['woAgentId'];
    me.getLogisticsInfo();//获取订单的物流详情及订单进度
    me.getOrderDetail(); //获取订单详情
  }

  /**
   * 获取订单详情
   */
  getOrderDetail() {
    let me = this;
    let url = '/ord/loadOrdByOrdno';
    let data = {
      ordno:me.curOrdno
    }
    let result = me.shoppingOrderService.getOrderDetailByNO(url,data);
    if (!isNullOrUndefined(result)) {
      me.orderDetailData = result;
      me.goodsData = result.ordItemList;
      me.getOrderStep();
    }
  }

  /**
   * 显示订单状态的时间列表
   * @param target
   */
  showTimeList(target) {
    target.style.display = 'block';
  }

  /**
   * 隐藏订单状态的时间列表
   * @param target
   */
  hideTimesList(target) {
    target.style.display = 'none';
  }

  /**
   * 获取订单的物流详情及把各个状态时间添加到数组里面
   */
  private getLogisticsInfo() {
    let me = this;
    let url = '/ord/tail/queryList';
    let data = {
      ordno:me.curOrdno
    }
    let orderStatesDetail = me.shoppingOrderService.getBasicExpressList(url,data);
    if(!isNullOrUndefined(orderStatesDetail)) me.orderStates = orderStatesDetail;
    for (let item of me.orderStates){//把所有的时间放到一个数组里面
      if (item.state == 'SUCCESS') {
        me.atime[5] = item.acceptTime;
        me.hasDeliverData = true;
      } else if (item.state == 'DELIVERY') {
        me.atime[4] = item.acceptTime;
        me.hasDeliverData = true;
      } else if (item.state == 'PREPARE') {
        me.atime[3] = item.acceptTime;
      } else if (item.state == 'PAID'||item.state == 'ASSIGNED') {
        me.atime[2] = item.acceptTime;
      } else if (item.state == 'CR') {
        me.atime[1] = item.acceptTime;
      }
    }
    if(me.hasDeliverData){
      let url = '/ord/tail/loadByDelivery';
      let data = {
        ordno: me.curOrdno
      }
      me.expressData = me.shoppingOrderService.getBasicExpressList(url,data);
    }
  }

  /**
   * 获取订单当前进度，通过不同的阶段来判断进度条的长度
   */
  private getOrderStep() {
    let me = this;
    if (me.orderDetailData.state == 'SUCCESS') {
      me.orderStep = 5;
    } else if (me.orderDetailData.state == 'DELIVERY') {
      me.orderStep = 4;
    } else if (me.orderDetailData.state == 'PREPARE') {
      me.orderStep = 3;
    } else if (me.orderDetailData.state == 'PAID'||me.orderDetailData.state == 'ASSIGNED') {
      me.orderStep = 2;
    } else if (me.orderDetailData.state == 'NO') {
      me.orderStep = 1;
    }
  }

  /**
   * 是否是当前状态
   * @param index
   * @returns {boolean}
   */
  ifCurrent(index:number){
    let me = this;
    switch (index){
      case 1:
        return true;
      case 2:
        if(me.orderStep==2 || me.orderStep==3 || me.orderStep==4 || me.orderStep==5) return true;
      case 3:
        if(me.orderStep==3 || me.orderStep==4 || me.orderStep==5) return true;
      case 4:
        if(me.orderStep==4 || me.orderStep==5) return true;
      case 5:
        if(me.orderStep==5) return true;
      default:
        return false;
    }
  }

  /**
   * 显示备注编辑框
   * @param target
   */
  dropdownToggle(target){
    $(target).show()
  }

    /**
   * 接单
   * @param woAgengId 代理商工单id
   * 1. 刷新页面
   * 2.设置按钮的禁用和启用
   */
  toAccept() {
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
          woAgengId: that.woAgengId
        };
        that.shoppingOrderService.toAcceptWork(url, data);
        that.ngOnInit();
      }
    );
  }

  /**
   * 拒单
   */
  toReject() {
    this.showReasonWindow = true;
    this.transWoAgengId=this.woAgengId;
  }

  /**
   * 发货
   * @param woAgentId    代理商工单id
   * @param ordno        订单编码
   */
  deliver() {
    this.transcurOrdno = this.curOrdno;//如果不这样，就会在详情页面一打开就发货组件就出来了
  }
  /**
   * 拒单的回调函数，产生输入属性的变化
   */
  closeRejecWin(bol){
    if(bol){
      this.router.navigate(['/main/shopOrder/all-work-orders'])//拒单不能查看详情页面，跳转到所有工单页面
    }
    this.transWoAgengId=null;
  }

  /**
   * 发货回调函数
   * @param data
   */
  getDeliverOrderData(obj) {
    if(obj.type){
      this.ngOnInit();//如果为真的话，说明发货成功，这时候调用方法
    }
    this.transcurOrdno = null;//输入属性发生变化的时候，弹窗才会打开，所以每次后来都清空，造成变化的迹象
  }
}
