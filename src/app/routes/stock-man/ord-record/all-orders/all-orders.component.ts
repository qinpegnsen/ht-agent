import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {SubmitService} from "../../../../core/forms/submit.service";
import {OrdRecordComponent} from "../ord-record.component";
import {Router} from "@angular/router";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {StockManService} from "../../stock-man.service";
import {HeaderComponent} from "../../../../layout/header/header.component";
import {isNullOrUndefined} from "util";

const swal = require('sweetalert');

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})

export class AllOrdersComponent implements OnInit {

  public goodsList: Page = new Page();                    //获取列表的数据
  public LogisticsData;                                   //获取物流的信息

  constructor(
    private submit: SubmitService,
    private parentComp:OrdRecordComponent,
    private router: Router,
    private stockManService: StockManService,
  ) { }

  /**
   * 1.设置当前点击的颜色
   * 2.获取当前状态的列表
   */
  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 1;
    me.queryDatas(1);
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage,event?: PageEvent) {
    let activePage = 1, _this = this;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    let requestUrl = ' /agentOrd/queryAgentState';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      state: '',
    };
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event,i){
    i.style.display = 'block';
    i.style.top = (event.clientY+10) + 'px';
    i.style.left = (event.clientX+10)+ 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(i) {
    i.style.display = 'none';
  }

  /**
   * 显示买家信息
   * @param event
   * @param i
   */
  showUserInfo(i){
    i.style.display = 'block';
  }

  /**
   * 隐藏买家信息
   * @param i
   */
  hideBuyerInfo(i){
    i.style.display = 'none';
  }

  /**
   *  取消订单
   *  1.取消完刷新页面
   * @param orderId
   */
  cancelOrder(ordno,curPage){
    let url='/agentOrd/cancelAgentOrd';
    let data={
      ordno:ordno
    }
    this.stockManService.delAgentOrd(url,data);
    this.queryDatas(curPage);
  }

  /**
   *显示物流信息
   * @param orderId
   */
  showLogistics(Logistics,ordno){
    Logistics.style.display = 'block';
    let url='/ord/tail/queryDeliveryList';
    let data={
      ordno:ordno
    };
    this.LogisticsData=this.stockManService.getShopList(url,data);
  }

  /**
   *隐藏物流信息
   * @param orderId
   */
  hideLogistics(Logistics){
    Logistics.style.display = 'none';
  }

  /**
   * 去付款
   */
  goPay(ordno,payWay){
    this.router.navigate(['/main/stockMan/pay'],{ queryParams: {'ordno':ordno,"payWay":payWay} })
  }

  /**
   * json 转 object
   * @param val
   */
  jsonToObject(val:string){
    return RzhtoolsService.jsonToObject(val);
  }

  /**
   * 再次进行购买
   * 1 .加入购物车  功能改变  变成直接跳转到进货列表 而且之间做的如果是多个商品加入购物车也有问题，1 只添加第一个，2.存在已经停产的产品，需要和后台沟通
   */
  againBuy(goodsCode, num) {
    // let url = '/agent/agentCart/addCustCart';
    // let data = {
    //   strData: `${goodsCode},${num};`
    // };
    // this.stockManService.sendCar(url, data);
    // this.headerComponent.getShopTotal();
    this.router.navigate(['/main/stockMan/agentord']);
  }

  /**
   * 确认收货
   */
  confirmRecive(ordno,curPage) {
    let that=this;
    swal({
        title: '您确认收到货了吗？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        let url = '/agentOrd/updateStateToSuccess';
        let data = {
          ordno: ordno
        }
        that.stockManService.delAgentOrd(url, data);
        that.queryDatas(curPage);
      }
    );
  }
}
