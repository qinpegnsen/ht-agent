import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HeaderComponent} from "../../../layout/header/header.component";
import {StockManService} from "../../stock-man/stock-man.service";
import {ShoppingOrderComponent} from "../shopping-order.component";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss']
})
export class WorkDetailComponent implements OnInit {
  public orderData: any;                                  //订单的数据
  public logisticsData;                                   //获取物流的信息
  public express;                                         //快递公司的信息
  public ordno;                                           //订单号
  constructor(
    private parentComp:ShoppingOrderComponent,
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
    this.ordno = me.routeInfo.snapshot.queryParams['ordno'];//获取进货记录未付款页面跳转过来的参数
    me.parentComp.orderType = 100;

    this.getOrderData()
    this.showLogistics()
  }

  /**
   * 获取订单的数据
   */
  getOrderData(){
    let url = '/agentOrd/loadByOrdno';
    let data={
      ordno:this.ordno
    }
    this.orderData=this.stockManService.getShopList(url,data);
    console.log("█ this.orderData ►►►",  this.orderData);
    if(isNullOrUndefined(this.orderData)){
      this.orderData='';//避免报错
    }
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
    this.logisticsData=this.stockManService.getShopList(url,data);
    console.log("█ this.LogisticsData ►►►",  this.logisticsData);
    this.express=this.logisticsData[1];
  }


  /**
   *  取消订单
   *  1.取消完刷新页面
   * @param orderId
   */
  cancelOrder(ordno){
    let url='/agentOrd/cancelAgentOrd';
    let data={
      ordno:ordno
    }
    this.stockManService.delAgentOrd(url,data);
    this.getOrderData();
  }
}
