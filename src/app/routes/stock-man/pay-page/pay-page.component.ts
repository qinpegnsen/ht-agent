import { Component, OnInit } from '@angular/core';
import {StockManService} from "../stock-man.service";
import {NavigationEnd, Router} from "@angular/router";
declare var $:any;
@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.scss']
})
export class PayPageComponent implements OnInit {

  public orderData:any;                  //订单的数据
  public payWay:any;                     //支付的方式，用来显示不同的页面
  public ordno:any;                      //订单号
  public pay:any;                        //支付的jine
  public src:any;                        //图片的地址
  public flag:boolean=true;             //图片的地址
  constructor( public stockManService: StockManService,private router: Router) { }

  /**
   * 1.把数据拿出来进行请求
   * 2.对支付方式进行赋值，根据不容的方式在，在同一个组件显示不同的页面
   * 3.监控路由的状态，决定是否显示二维码页面
   */
  ngOnInit() {
    this.orderData=JSON.parse(sessionStorage.getItem('orderData'));
    this.payWay=this.orderData.payWay;
    let url = '/agentOrd/addCustCart';
    let payData=this.stockManService.sendCar(url,this.orderData);
    this.ordno=payData.ordno;
    this.pay=payData.pay;

    /**
     * 路由事件用来监听地址栏的变化
     * 1.当新增文章出现的时候，内容组件隐藏
     * 2.路由变化的时候，刷新页面
     */

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          if(event.url.indexOf('do')>0){
            this.flag=false;
          }
        }
      });
  }

  /**
   * 选择不同的在线付款方式执行的方法
   *
   * 1.右下角出现图片
   */
  changeStyle(obj){
    if( $(obj)[0].className.indexOf('_selected')>1){
      return;
    }else{
      $(obj).parents('._border').find("._selected").removeClass("_selected");
      $(obj).addClass("_selected");
    }
  }

  /**
   * 点击进行支付
   * @param ordno  订单号
   */
  confirmPay(){
    let url = '/nativeWXPay/getPrePayId';
    let data ={
      ordno:this.ordno
    };
   this.src=this.stockManService.goPay(url,data);
   this.router.navigate(['/main/stockMan/order/pay/do']);
  }
}
