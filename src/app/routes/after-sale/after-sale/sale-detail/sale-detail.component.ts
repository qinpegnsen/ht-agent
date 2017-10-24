import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AfterSaleComponent} from "../after-sale.component";
import {isNullOrUndefined} from "util";
import {AfterSaleService} from "../../after-sale.service";


@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.scss']
})
export class SaleDetailComponent implements OnInit {

  public orderStep = 1;
  public curOrdno: string;
  public orderStates: any;
  public orderDetailData: any;
  public goodsData: any;
  private atime:Array<string> = new Array();

  constructor(
    private parentComp: AfterSaleComponent,
    public AfterSaleService: AfterSaleService,
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
    let url = '/woAgent/loadWoAgent';
    let data = {
      woAgentId:me.curOrdno
    }
    let result = me.AfterSaleService.getOrderDetailByNO(url,data);
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
    let orderStatesDetail = me.AfterSaleService.getBasicExpressList(url,data);
    if(!isNullOrUndefined(orderStatesDetail)) me.orderStates = orderStatesDetail;
    for (let item of me.orderStates){//把所有的时间放到一个数组里面
      if (item.state == 'SUCCESS') {
        me.atime[5] = item.acceptTime;
      } else if (item.state == 'DELIVERY') {
        me.atime[4] = item.acceptTime;
      } else if (item.state == 'PREPARE') {
        me.atime[3] = item.acceptTime;
      } else if (item.state == 'PAID'||item.state == 'ASSIGNED') {
        me.atime[2] = item.acceptTime;
      } else if (item.state == 'CR') {
        me.atime[1] = item.acceptTime;
      }
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
}
