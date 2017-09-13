import { Component, OnInit } from '@angular/core';
import {StockManService} from "../stock-man.service";

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.scss']
})
export class PayPageComponent implements OnInit {

  public orderData:any;               //订单的数据
  public payWay:any;               //支付的方式，用来显示不同的页面
  constructor(
    public stockManService: StockManService
  ) { }

  ngOnInit() {
    this.orderData=JSON.parse(sessionStorage.getItem('orderData'));
    this.payWay=this.orderData.payWay;
    let url = '/agentOrd/addCustCart';
    let payData=this.stockManService.sendCar(url,this.orderData);
  }

}
