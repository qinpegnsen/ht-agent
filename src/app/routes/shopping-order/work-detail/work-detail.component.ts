import {Component, OnInit} from "@angular/core";
import {isNullOrUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
import {AppComponent} from "../../../app.component";
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
  private atime:Array<string> = new Array();

  constructor(
    private parentComp: ShoppingOrderComponent,
              public shoppingOrderService: ShoppingOrderService,
              private routeInfo:ActivatedRoute
              ) {
  }

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
   * 获取订单的物流详情及订单进度
   */
  private getLogisticsInfo() {
    let me = this;
    let url = '/ord/tail/queryList';
    let data = {
      ordno:me.curOrdno
    }
    let orderStatesDetail = me.shoppingOrderService.getBasicExpressList(url,data);
    if(!isNullOrUndefined(orderStatesDetail)) me.orderStates = orderStatesDetail;
    for (let item of me.orderStates){
      if (item.state == 'SUCCESS') {
        me.atime[5] = item.acceptTime;
      } else if (item.state == 'DELIVERY') {
        me.atime[4] = item.acceptTime;
      } else if (item.state == 'PREPARE') {
        me.atime[3] = item.acceptTime;
      } else if (item.state == 'PAID') {
        me.atime[2] = item.acceptTime;
      } else if (item.state == 'CR') {
        me.atime[1] = item.acceptTime;
      }
    }
  }

  /**
   * 获取订单当前进度
   */
  private getOrderStep() {
    let me = this, temp = [];
    if (me.orderDetailData.state == 'SUCCESS') {
      me.orderStep = 5;
    } else if (me.orderDetailData.state == 'DELIVERY') {
      me.orderStep = 4;
    } else if (me.orderDetailData.state == 'PREPARE') {
      me.orderStep = 3;
    } else if (me.orderDetailData.state == 'PAID') {
      me.orderStep = 2;
    } else if (me.orderDetailData.state == 'CR') {
      me.orderStep = 1;
    }
  }

}
