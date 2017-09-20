import { Component, OnInit } from '@angular/core';
import {OrdRecordComponent} from "../ord-record.component";
import {ActivatedRoute} from "@angular/router";
import {StockManService} from "../../stock-man.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  public orderData: any;              //订单的数据

  constructor(
    private parentComp:OrdRecordComponent,
    private routeInfo:ActivatedRoute,
    public stockManService: StockManService,
  ) { }

  /**
   * 1.获取页面传递的数据
   * 2.获取订单的信息
   */
  ngOnInit() {
    let me = this;
    let ordno = me.routeInfo.snapshot.queryParams['ordno'];//获取进货记录未付款页面跳转过来的参数
    me.parentComp.orderType = 100;
    let url = '/agentOrd/loadByOrdno';
    let data={
      ordno:ordno
    }
    this.orderData=this.stockManService.getShopList(url,data);
    console.log("█ this.orderData ►►►",  this.orderData);
  }

  /**
   * 展示时间列表
   * @param target
   */
  showTimeList(target){
    target.style.display = 'block';
  }

  /**
   * 隐藏时间列表
   * @param target
   */
  hideTimesList(target){
    target.style.display = 'none';
  }
}


