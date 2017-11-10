import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {SubmitService} from "../../../../core/forms/submit.service";
import {Router} from "@angular/router";
import {OrdRecordComponent} from "../ord-record.component";
import {StockManService} from "../../stock-man.service";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-wait-for-pay',
  templateUrl: './wait-for-pay.component.html',
  styleUrls: ['./wait-for-pay.component.scss']
})

export class WaitForPayComponent implements OnInit {
  public goodsList: Page = new Page();
  public showList:boolean=true;                           //是否展示列表

  constructor(
    public submit: SubmitService,
    public router: Router,
    public parentComp:OrdRecordComponent,
    public stockManService: StockManService
  ) { }

  /**
   * 1.设置当前点击的颜色
   * 2.获取当前状态的列表
   */
  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 2;
    me.queryDatas(1)
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
      state: 'CR',
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
    this.parentComp.orderType = 2;
    this.queryDatas(event.curPage);
  }
}
