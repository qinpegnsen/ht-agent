import {Component, OnInit} from "@angular/core";
import {isNullOrUndefined} from "util";
import {ShoppingOrderComponent} from "../shopping-order.component";
import {ActivatedRoute} from "@angular/router";
import {ShoppingOrderService} from "../shopping-order.service";

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss']
})

export class WorkDetailComponent implements OnInit {

  public orderStep = 1;
  public curOrdno: string;
  public orderStates: any;
  public orderDetailData: any;
  public goodsData: any;
  public hasDeliverData: boolean = false;                //是否显示快递信息，当为收货或者是收货后显示
  public expressData: any;                                //快递公司信息
  private atime:Array<string> = new Array();

  constructor(
              private parentComp: ShoppingOrderComponent,
              public shoppingOrderService: ShoppingOrderService,
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
   * 发货回调函数
   * @param data
   */
  getDeliverOrderData(data) {
    this.curOrdno = null;//输入属性发生变化的时候，弹窗才会打开，所以每次后来都清空，造成变化的迹象
  }
}
