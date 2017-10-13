import { Component, OnInit } from '@angular/core';
import {StockManService} from "../stock-man.service";
import {NavigationEnd, Router} from "@angular/router";
import {Location} from "@angular/common";
import {isNullOrUndefined} from "util";
import {AppComponent} from "../../../app.component";

declare var $:any;

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})

export class OrderPageComponent implements OnInit {

  private orderData:any;                      //储存订单的数据
  private defaultAddress:any;                 //默认的地址
  private otherAddress:any;                   //默认的其他的地址
  private updatebutton:any;                   //默认的修改按钮
  private currentId:number;                   //默认的修改按钮
  private strData:any;                        //商品的编码和数量
  public flag:boolean=true;                   //定义boolean值用来控制内容组件是否显示

  constructor(
    public stockManService: StockManService,
    private router:Router,
    private location:Location
  ) { }

  /**
   * 1.获取订单页面的数据
   * 2.监控路由的状态
   */
  ngOnInit() {
    this.getOrDrderData();
    this.updatebutton = {
      title: "修改地址",
      type: "update"
    };

    /**
     * 路由事件用来监听地址栏的变化
     * 1.当新增文章出现的时候，内容组件隐藏
     * 2.路由变化的时候，刷新页面
     */

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          if(event.url.indexOf('pay')>0){
            this.flag=false;
          }
        }
      });
  }

  /**
   * 获取订单页面的数据
   * 1.从内存中拿到订单的编码和数量
   * 2.保存默认地址
   * 3.保存其他地址
   */
  getOrDrderData(){
    this.strData=sessionStorage.getItem('cartId');
    let url = '/agent/agentOrdRapidly/loadDataAgentOrder';
    let data = {
      strData:this.strData
    }
    let orderData=this.stockManService.getShopListOne(url, data);
    console.log("█ orderData ►►►",  orderData);
    if(orderData=='购买商品不可批发商品'||orderData=='购买商品包含已下架商品法'){//商品的状态不合法，跳转到购物车的页面，然后刷新就有遮罩
      AppComponent.rzhAlt("info",orderData);
      this.location.back();
      return;
    }else if(isNullOrUndefined(orderData)){//处理到了下个路由返回来的bug，直接因为这时候购物车的id已经没有了,直接让其跳转到home页面
      this.router.navigate(['/main/stockMan/agentord']);
      return;
    }else {   //正常的状态
      this.orderData=orderData.calcDTO;
      for(var i=0;i<orderData.agentAddrsList.length;i++){
        if(orderData.agentAddrsList[i].isDefault=='Y'){
          this.defaultAddress=orderData.agentAddrsList[i];
          orderData.agentAddrsList.splice(i,1)//对数组进行截取，把不是默认的其他数组保存下来
          this.otherAddress=orderData.agentAddrsList;
        }
      }
      console.log("█ this.defaultAddress ►►►",  this.defaultAddress);
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

  /**
   * 点击的时候按钮出现
   */
  showButton(id){
    this.currentId=id;
  }

  /**
   * 点击付款方式时候执行的方法
   * 1.边框变为红色
   * 2.右下角出现图片
   */
  changeStyle(obj){
    if( $(obj)[0].className.indexOf('_border')>1){
      return;
    }else{
      $(obj).parents('._payWay').find('._border').removeClass("_border");
      $(obj).parents('._payWay').children().removeClass("_selected");
      $(obj).addClass("_border");
      $(obj).addClass("_selected");
    }
  }

  /**
   * 点击去支付的时候执行的方法
   *
   */
  goPay(){
    let note=$("._message").val();
    let payWay=$("._payWay ._selected").text();
    if(payWay=='在线支付'){
      payWay='ONLINE'
    }else{
      payWay='REMIT'
    }
    let strData=this.strData;
    let agentAddrId=$("._addrId").prop('id');
    let data={
      note:note,
      payWay:payWay,
      strData:strData,
      agentAddrId:agentAddrId
    }
    sessionStorage.setItem('orderData', JSON.stringify(data));
    if(this.defaultAddress){  //如果有默认的地址才跳转
      this.router.navigate(['/main/stockMan/pay'])
    }else{//没有进行提示
      AppComponent.rzhAlt("info",'请先添加收货地址');
    }
  }
}
