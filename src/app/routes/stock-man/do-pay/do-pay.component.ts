import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
declare var $:any;
var QRCode = require('qrcode');


@Component({
  selector: 'app-do-pay',
  templateUrl: './do-pay.component.html',
  styleUrls: ['./do-pay.component.scss']
})
export class DoPayComponent implements OnInit {
  url:any;                               //二维码图片
  ordno:any;                             //订单的编码
  price:number;                          //订单的价格

  constructor( private routeInfo: ActivatedRoute,) { }

  /**
   * 1.获取地址栏传递过来的二维码图片内容太，订单号和价格
   * 2.把二维码图片的内容转化为base64位的图片地址
   */
  ngOnInit() {
    const _this=this;
    let payCon = this.routeInfo.snapshot.queryParams['payCon'];
    this.ordno = this.routeInfo.snapshot.queryParams['ordno'];
    this.price= this.routeInfo.snapshot.queryParams['price'];
    QRCode.toDataURL(payCon, function (err, url) {
      _this.url = url;
    })
  }

}
