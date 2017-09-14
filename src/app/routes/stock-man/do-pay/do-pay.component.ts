import { Component, OnInit } from '@angular/core';
declare var $:any;
var QRCode = require('qrcode');


@Component({
  selector: 'app-do-pay',
  templateUrl: './do-pay.component.html',
  styleUrls: ['./do-pay.component.scss']
})
export class DoPayComponent implements OnInit {
  url:any; //图片

  constructor() { }

  /**
   * 初始化的时候展现二维码图片
   */
  ngOnInit() {
    const _this=this;
    let payCon=sessionStorage.getItem('payCon');
    QRCode.toDataURL(payCon, function (err, url) {
      _this.url = url;
      console.log(url)
    })
  }

}
