import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {SubmitService} from "../../../../core/forms/submit.service";
import {OrdRecordComponent} from "../ord-record.component";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";


@Component({
  selector: 'app-wait-for-receive',
  templateUrl: './wait-for-receive.component.html',
  styleUrls: ['./wait-for-receive.component.scss']
})
export class WaitForReceiveComponent implements OnInit {

  public curCancelOrderId:string;
  public lookLogisticsOrderId:string;
  public goodsList: Page = new Page();
  constructor(private submit: SubmitService,private parentComp:OrdRecordComponent) { }

  /**
   * 1.设置当前点击的颜色
   * 2.获取当前状态的列表
   */
  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 5;
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
      state: 'DELIVERY',
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
   *查看物流信息
   * @param orderId
   */
  lookLogistics(orderId){
    this.lookLogisticsOrderId = orderId;
  }

  /**
   * json 转 object
   * @param val
   */
  jsonToObject(val:string){
    return RzhtoolsService.jsonToObject(val);
  }

}
