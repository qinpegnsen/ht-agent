import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {StockManService} from "../stock-man.service";
import {AppComponent} from "../../../app.component";
declare var $: any;
var QRCode = require('qrcode');


@Component({
  selector: 'app-do-pay',
  templateUrl: './do-pay.component.html',
  styleUrls: ['./do-pay.component.scss']
})
export class DoPayComponent implements OnInit {

  url: any;                               //内容生成的二维码图片
  ordno: any;                             //订单的编码
  price: number;                          //订单的价格
  public payCon: String = '';               //二维码的内容
  public time: any;                       //二维码的内容
  public curWay: any;                     //当前支付的放肆
  public timeAdd: number = 0;               //累计的时间
  public flag: boolean = true;              //累计的时间

  constructor(private routeInfo: ActivatedRoute, public stockManService: StockManService, private router: Router) {
  }

  /**
   * 1.获取地址栏传递过来的二维码图片内容，订单号和价格
   * 2.把二维码图片的内容转化为base64位的图片地址
   * 3.调取判断是否支付成功的方法，呈现给用户
   */
  ngOnInit() {
    let _this = this;


    /**
     * 路由事件用来监听地址栏的变化
     * 1.当新增文章出现的时候，内容组件隐藏
     * 2.路由变化的时候，刷新页面
     */

    _this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          if (event.url.indexOf('callBack') > 0) {
            _this.flag = false;
            clearInterval(_this.time);
          } else if (event.url.indexOf('do') > 0) {
            _this.flag = true;
            clearInterval(_this.time);
          }
        }
      });


    this.curWay = this.routeInfo.snapshot.queryParams['curWay'];   //获取当前支付的方式
    this.ordno = this.routeInfo.snapshot.queryParams['ordno'];    //获取当前的订单号
    this.price = this.routeInfo.snapshot.queryParams['price'];     //获取价格

    if (this.curWay == '_wxPay') {                                         //微信时执行，获取到支付的二维码的内容
      let url = '/nativeWXPay/getPrePayId';
      let data = {
        ordno: _this.ordno
      };
      _this.payCon += _this.stockManService.goPay(url, data);
    } else if (this.curWay == '_aliPay') {                                   //支付宝时执行，获取到支付的二维码的内容

    }


    QRCode.toDataURL(_this.payCon, function (err, url) {           //获取支付的二维码的内容生成二维码
      _this.url = url;
    })

    /**
     * 每隔5s种调一次，看是否支付成功，倒计时1分钟
     */

    _this.time = setInterval(function () {
      _this.isSuccess();
      console.log("█ 22 ►►►",  22);
      _this.timeAdd += 5000;
    }, 5000)

  }

  /**
   * 判断是否支付成功
   */
  isSuccess() {
    let url = '/agentOrd/isPayByOrdno';
    let data = {
      ordno: this.ordno
    }
    let result = this.stockManService.isTrue(url, data);
    console.log("█ result ►►►",  result);
    if (result) {//支付成功的收
      clearInterval(this.time);
      AppComponent.rzhAlt("success", "支付成功");
      this.router.navigate(['/main/stockMan/do/callBack'], {queryParams: {ordno: this.ordno, price: this.price}})
    } else {//二分钟结束还没支付
      console.log("█ this.timeAdd ►►►", this.timeAdd);
      if (this.timeAdd == 120000) {
        clearInterval(this.time);
        AppComponent.rzhAlt("errer", "支付已超时");
      }
    }
  }

}
