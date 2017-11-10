import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {SubmitService} from "../../../../core/forms/submit.service";
import {OrdRecordComponent} from "../ord-record.component";
import {StockManService} from "../../stock-man.service";
import {HeaderComponent} from "../../../../layout/header/header.component";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})

export class FinishedComponent implements OnInit {

  public lookLogisticsOrderId:string;
  public goodsList: Page = new Page();
  public showList:boolean=true;                           //是否展示列表

  constructor(
    public submit: SubmitService,
    public parentComp:OrdRecordComponent,
    public stockManService: StockManService,
    public router: Router
  ) { }

  /**
   * 1.设置当前点击的颜色
   * 2.获取当前状态的列表
   */
  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 6;
    me.queryDatas(1)
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage,event?: PageEvent) {
    let _this = this, activePage = 1;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    let requestUrl = ' /agentOrd/queryAgentState';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      state: 'SUCCESS',
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
   * json 转 object
   * @param val
   */
  jsonToObject(val:string){
    return RzhtoolsService.jsonToObject(val);
  }

  /**
   * 再次进行购买
   *  1.加入购物车  功能改变  变成直接跳转到进货列表 而且之间做的如果是多个商品加入购物车也有问题，1 只添加第一个，2.存在已经停产的产品，需要和后台沟通
   */
  againBuy(goodsCode, num,item) {
    // let url = '/agent/agentCart/addCustCart';
    // let data = {
    //   strData: `${goodsCode},${num};`
    // }
    // this.stockManService.sendCar(url, data)
    // this.headerComponent.getShopTotal();
    this.router.navigate(['/main/stockMan/agentord']);
  }

  /**
   *查看物流信息
   * @param orderId
   */
  lookLogistics(orderId){
    this.lookLogisticsOrderId = orderId;
  }

  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    this.showList = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
    this.parentComp.orderType = 6;
    this.queryDatas(event.curPage);
  }
}
