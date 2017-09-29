import { Component, OnInit } from '@angular/core';
import {StockManService} from "../stock-man.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HeaderComponent} from "app/layout/header/header.component";
import {isNullOrUndefined, isUndefined} from "util";
import {Location} from "@angular/common";
import {AppComponent} from "../../../app.component";
declare var $:any;
@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.scss']
})
export class PayPageComponent implements OnInit {

  public orderData:any;                  //订单的数据
  public payWay:any;                     //支付的方式，用来显示不同的页面
  public curWay:any;                     //当前选择的支付方式，传递给下个页面
  public ordno:any;                      //订单号
  public pay:any;                        //支付的价格
  public flag:boolean=true;             //图片的地址
  constructor(
    public stockManService: StockManService,
    private router: Router,
    public headerComponent: HeaderComponent,
    private routeInfo:ActivatedRoute,
    private location:Location
  ) { }

  /**
   * 1.把数据拿出来进行请求，生成订单
   * 2.对支付方式进行赋值，根据不容的方式在，在同一个组件显示不同的页面
   * 3.监控路由的状态，决定是否显示二维码页面
   * 4.生成订单会刷新购物会减少，在执行刷新购物车的方法
   */
  ngOnInit() {
    let ordno = this.routeInfo.snapshot.queryParams['ordno'];//获取进货记录未付款跳转过来的参数
    let transPayWay = this.routeInfo.snapshot.queryParams['payWay'];    //获取当前的订单号

    this.orderData=JSON.parse(sessionStorage.getItem('orderData'));

    if(transPayWay){   //如果有地址栏传递过来的就用地址传递过来的
      this.payWay=transPayWay;
    }else if(this.orderData){
      this.payWay=this.orderData.payWay;
    }
    let url = '/agentOrd/addAgentOrd';
    let payData=this.stockManService.bornOrder(url,this.orderData);
    console.log("█ payData ►►►",  payData);
    if(isNullOrUndefined(payData)){  //在用户刷新，或者下个页面返回的时候会用到
      let url = '/agentOrd/loadByOrdno';
      let data={
        ordno:ordno?ordno:sessionStorage.getItem('ordno')
      }
      let payData=this.stockManService.getShopList(url,data);
      console.log("█ payData ►►►",  payData);
      this.ordno=payData.ordno;
      this.pay=payData.pay;
    }if(payData=='购买商品不可批发商品'||payData=='购买商品包含已下架商品'){
      AppComponent.rzhAlt("error",payData);
      this.location.back();
      return;
    }else{
      sessionStorage.setItem('ordno',payData.ordno);//把订单编码存起来，在用户刷新，或者下个页面返回的时候会用到
      this.ordno=payData.ordno;
      this.pay=payData.pay;
    }

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
          }else if(event.url.indexOf('pay')>0){
            console.log("█ event.url ►►►",  event.url);
            console.log("█ this.flag ►►►",  this.flag);
            this.flag=true;
          }
        }
      });


    this.headerComponent.getShopTotal()
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
    let obj=$("._selected");
    if( obj.parents("._pay")[0].className.indexOf('_wxPay')>1){
      this.curWay='_wxPay'; //微信支付
    } else{
      this.curWay='_aliPay';//支付宝支付
    }
    this.router.navigate(['/main/stockMan/do'],{ queryParams: { curWay: this.curWay,ordno:this.ordno,price:this.pay } })
  }
}
