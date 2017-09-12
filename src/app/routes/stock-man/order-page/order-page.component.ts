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
  private otherAddress:any;//默认的其他的地址
  private updatebutton:any;//默认的修改按钮
  constructor(public stockManService: StockManService) { }

  /**
   * 初始化的时候获取订单页面的数据
   */
  ngOnInit() {
    this.getOrDrderData();
    this.updatebutton = {
      title: "修改地址",
      type: "update"
    };
  }

  /**
   * 获取订单页面的数据
   * 1.从内存中拿到订单的编码和数量
   * 2.保存默认地址
   * 3.保存其他地址
   */
  getOrDrderData(){
    let strData=sessionStorage.getItem('orderInfo');
    let url = '/agent/agentOrdRapidly/loadDataAgentOrder';
    let data = {
      strData:strData
    }
    let orderData=this.stockManService.getShopList(url, data);
    this.orderData=orderData.calcDTO;
    for(var i=0;i<orderData.agentAddrsList.length;i++){
      if(orderData.agentAddrsList[i].isDefault=='Y'){
        this.defaultAddress=orderData.agentAddrsList[i];
        orderData.agentAddrsList.splice(i,1)//对数组进行截取，把不是默认的其他数组保存下来
        this.otherAddress=orderData.agentAddrsList;
      }
    }
  }

  /**
   * 改变默认的地址
   * 1.修改默认地址之后刷新地址页面
   * @param id
   */
  changeAddres(id){
    let url = '/agent/agentAddr/updateIsDefaultById';
    let data = {
      id:id
    }
    this.stockManService.putData(url, data);
    this.getOrDrderData()
  }
}
