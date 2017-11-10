import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AfterSaleComponent} from "../after-sale.component";
import {AfterSaleService} from "../../after-sale.service";
import {SubmitService} from "../../../../core/forms/submit.service";


@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.scss']
})
export class SaleDetailComponent implements OnInit {
  public id: string;//获取
  public result:any;

  constructor(
    public parentComp: AfterSaleComponent,
    public AfterSaleService: AfterSaleService,
    public routeInfo:ActivatedRoute) {
  }


  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 100;
    me.id = me.routeInfo.snapshot.queryParams['id'];
    me.getOrderDetail(); //获取订单详情
  }

  /**
   * 获取订单详情
   */
  getOrderDetail() {
    let me = this;
    let url = '/woAgent/loadWoAgent';
    let data = {
      woAgentId:me.id
    }
    this.result = me.AfterSaleService.getOrderDetailByNO(url,data);
    console.log("█ result ►►►",   this.result);
  }

}
