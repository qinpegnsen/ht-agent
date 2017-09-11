import { Component, OnInit } from '@angular/core';
import {StockManService} from "../stock-man.service";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  private orderData:any;//储存订单的数据
  private defaultAddress:any;//默认的地址
  private otherAddress:any;//默认的地址
  constructor(public stockManService: StockManService) { }

  /**
   * 初始化的时候获取订单页面的数据
   */
  ngOnInit() {
    this.getOrDrderData()
  }

  /**
   * 获取订单页面的数据
   * 1.保存默认地址
   * 2.保存其他地址
   */
  getOrDrderData(){
    let strData=sessionStorage.getItem('orderInfo');
    let url = '/agent/agentOrdRapidly/loadDataAgentOrder';
    let data = {
      strData:strData
    }
    let orderData=this.stockManService.getShopList(url, data);
    for(var i=0;i<orderData.agentAddrsList.length;i++){
      if(orderData.agentAddrsList[i].isDefault=='Y'){
        this.defaultAddress=orderData.agentAddrsList[i];
        orderData.agentAddrsList.splice(i,1)//对数组进行截取，把不是默认的其他数组保存下来
        this.otherAddress=orderData.agentAddrsList;
      }
    }
  }
}
