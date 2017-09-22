import { Component, OnInit } from '@angular/core';
import {OrdRecordComponent} from "../ord-record.component";
import {ActivatedRoute, Router} from "@angular/router";
import {StockManService} from "../../stock-man.service";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {HeaderComponent} from "../../../../layout/header/header.component";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  public orderData: any;                                  //订单的数据
  public LogisticsData;                                   //获取物流的信息
  constructor(
    private parentComp:OrdRecordComponent,
    private routeInfo:ActivatedRoute,
    public stockManService: StockManService,
    private router: Router,
    public headerComponent: HeaderComponent
  ) { }

  /**
   * 1.获取页面传递的数据
   * 2.获取订单的信息
   * 3.获取物流追踪的信息
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
    if(!this.orderData){
      this.orderData='';//避免报错
    }

    this.showLogistics()
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

  /**
   * 去付款
   */
  goPay(ordno){
    this.router.navigate(['/main/stockMan/pay'],{ queryParams: {'ordno':ordno} })
  }

  /**
   * json 转 object
   * @param val
   */
  jsonToObject(val:string){
    return RzhtoolsService.jsonToObject(val);
  }

  /**
   * 取消的订单再次进行购买
   */
  againBuy(goodsCode, num){
    let url = '/agent/agentCart/addCustCart';
    let data = {
      strData: `${goodsCode},${num};`
    }
    this.stockManService.sendCar(url, data)
    this.headerComponent.getShopTotal()
  }

  /**
   *显示物流信息
   * @param orderId
   */
  showLogistics(){
    let url='/ord/tail/queryList';
    let data={
      ordno:'1234123451235'                //目前是写死的，以后再改
    };
    this.LogisticsData=this.stockManService.getShopList(url,data);
    console.log("█ this.LogisticsData ►►►",  this.LogisticsData);
  }

}


