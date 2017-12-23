import { Component, OnInit } from '@angular/core';
import {OrdRecordComponent} from "../ord-record.component";
import {ActivatedRoute, Router} from "@angular/router";
import {StockManService} from "../../stock-man.service";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {HeaderComponent} from "../../../../layout/header/header.component";
import {isNullOrUndefined} from "util";

const swal = require('sweetalert');

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})

export class OrderDetailComponent implements OnInit {

  public orderData: any;                                  //订单的数据
  public logisticsData;                                   //获取物流的信息
  public deliveryData;                                    //快递公司的信息
  public ordno;                                           //订单号
  public curPage;                                         //列表当前的页码
  public atime:Array<string> = new Array();              //存储状态时间的数组
  public orderTranceList:any;                             //订单追踪的信息

  constructor(
    public parentComp:OrdRecordComponent,
    public routeInfo:ActivatedRoute,
    public stockManService: StockManService,
    public tools: RzhtoolsService,
    public router: Router,
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
    this.curPage = me.routeInfo.snapshot.queryParams['curPage'];//获取进货记录未付款页面跳转过来的参数
    me.parentComp.orderType = 100;
    this.getOrderData();
    this.showLogistics();
    this.getDelivery();
    this.orderTranceList=this.tools.getEnumData('1702');
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
    if(isNullOrUndefined(this.orderData)){
      this.orderData='';//避免报错
    }
  }

  /**
   * 获取快递公司的信息
   */
  getDelivery(){
    let url = '/ord/tail/loadByDelivery';
    let data={
      ordno:this.ordno
    }
    this.deliveryData=this.stockManService.getShopList(url,data);
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
   * 取消的订单或者成功的商品再次进行购买
   */
  againBuy(goodsCode, num){
    // let url = '/agent/agentCart/addCustCart';
    // let data = {
    //   strData: `${goodsCode},${num};`
    // }
    // this.stockManService.sendCar(url, data)
    // this.headerComponent.getShopTotal()
    this.router.navigate(['/main/stockMan/agentord']);
  }

  /**
   *显示物流信息
   * @param orderId
   */
  showLogistics(){
    let url='/ord/tail/queryList';
    let data={
      ordno:this.ordno
    };
    this.logisticsData=this.stockManService.getShopList(url,data);
    for (let item of this.logisticsData){
      if (item.state == 'SUCCESS') {
        this.atime[5] = item.acceptTime;
      } else if (item.state == 'DELIVERY') {
        this.atime[4] = item.acceptTime;
      } else if (item.state == 'PREPARE') {
        this.atime[3] = item.acceptTime;
      } else if (item.state == 'PAID') {
        this.atime[2] = item.acceptTime;
      } else if (item.state == 'CR') {
        this.atime[1] = item.acceptTime;
      }
    }
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

  /**
   * 确认收货
   */
  confirmRecive(ordno) {
    let that=this;
    swal({
        title: '您确认收到货了吗？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        let url = '/agentOrd/updateStateToSuccess';
        let data = {
          ordno: ordno
        }
        that.stockManService.delAgentOrd(url, data);
        that.ngOnInit();
      }
    );
  }
}


