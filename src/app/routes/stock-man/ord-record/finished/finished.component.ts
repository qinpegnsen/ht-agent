import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {SubmitService} from "../../../../core/forms/submit.service";
import {OrdRecordComponent} from "../ord-record.component";
import {StockManService} from "../../stock-man.service";
import {HeaderComponent} from "../../../../layout/header/header.component";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})

export class FinishedComponent implements OnInit {

  public lookLogisticsOrderId:string;
  public goodsList: Page = new Page();

  constructor(
    private submit: SubmitService,
    private parentComp:OrdRecordComponent,
    public stockManService: StockManService,
    private router: Router
  ) { }

  /**
   * 1.设置当前点击的颜色
   * 2.获取当前状态的列表
   */
  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 6;
    me.queryDatas()
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    }
    let requestUrl = ' /agentOrd/queryAgentState';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      state: 'SUCCESS',
    };
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
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
}
