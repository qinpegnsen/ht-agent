import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.scss']
})
export class PaySuccessComponent implements OnInit {

  ordno:any;                             //订单的编码
  price:number;                          //订单的价格

  constructor(private routeInfo: ActivatedRoute) { }

  ngOnInit() {
    this.ordno = this.routeInfo.snapshot.queryParams['ordno'];    //获取当前的订单号
    this.price= Number(sessionStorage.getItem('pay'));            //获取价格
  }
}
