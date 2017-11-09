import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {StockManService} from "../stock-man.service";
import {AppComponent} from "../../../app.component";

declare var $: any;
var QRCode = require('qrcode');
const swal = require('sweetalert');

@Component({
  selector: 'app-do-pay',
  templateUrl: './do-pay.component.html',
  styleUrls: ['./do-pay.component.scss']
})

export class DoPayComponent implements OnInit{

  url: any;                               //内容生成的二维码图片
  ordno: any;                             //订单的编码
  price: number;                          //订单的价格
  public payCon: String = '';             //二维码的内容
  public time: any;                       //二维码的内容
  public curWay: any;                     //当前支付的方式
  public timeAdd: number =0.3;            //支付的时间(分钟)
  public minute: number;                  //分钟
  public second: number;                  //秒
  public flag: boolean = true;           //累计的时间
  public urlChange;                       //路由的变化，用来取消订阅
  public timer;                           //时间函数

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

    _this.urlChange=_this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          if(event.url.indexOf('do')==-1){//如果未支付完跳转了页面这时候清除时间函数
            clearInterval(_this.timer);//这里不能取消订阅，取消这个清楚时间函数的方法不执行
          }
        }
      });

    _this.curWay = _this.routeInfo.snapshot.queryParams['curWay'];   //获取当前支付的方式
    _this.ordno = _this.routeInfo.snapshot.queryParams['ordno'];     //获取当前的订单号
    _this.price = Number(sessionStorage.getItem('pay'));             //获取价格

    if (_this.curWay == '_wxPay') {                                         //微信时执行，获取到支付的二维码的内容
      let url = '/nativeWXPay/getPrePayId';
      let data = {
        ordno: _this.ordno
      };
      _this.payCon = _this.stockManService.goPay(url, data);
      QRCode.toDataURL(_this.payCon, function (err, url) {                  //根据支付的二维码的内容生成二维码
        _this.url = url;
      })
    }

    /**
     * 每隔1s种调一次，看是否支付成功
     */
    var totalminSeconds=_this.timeAdd*60*1000;//总共的毫秒数
    _this.timer = setInterval(function () {
      _this.minute=Math.floor(totalminSeconds/1000/60%60);
      _this.second=Math.floor(totalminSeconds/1000%60);
      totalminSeconds -= 1000;
      _this.isSuccess(_this.timer);
      if(totalminSeconds==-1000){//页面显示0s时，出弹框，清空时间函数
        clearInterval(_this.timer);
        _this.timeOverAlert();
      }
    }, 1000)
  }

  /**
   * 付款倒计时到为付款的弹框
   */
  timeOverAlert(){
    let that=this;
    swal({
      title: "付款时间已到",
      text: "二维码已经失效，请选择",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: '订单列表',
      closeOnConfirm: false,
      confirmButtonText: "重新支付",
      confirmButtonColor: "#ec6c62"
    },function(isConfirm){
      if (isConfirm) {
        swal.close(); //关闭弹框
        that.ngOnInit();
      }else {
        that.router.navigate(['/main/stockMan/agentord'])
      }
    });
  }

  /**
   * 判断是否支付成功
   */
  isSuccess(timer) {
    let url = '/agentOrd/isPayByOrdno';
    let data = {
      ordno: this.ordno
    }
    let result = this.stockManService.isTrue(url, data);
    if (result) {//支付成功的收
      clearInterval(timer );
      AppComponent.rzhAlt("success", "支付成功");
      this.router.navigate(['/main/stockMan/aliCallBacK'],{replaceUrl: false})
    }
  }
}
