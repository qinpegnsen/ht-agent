import { Component, OnInit } from '@angular/core';
import {ShoppingOrderComponent} from "../shopping-order.component";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";

@Component({
  selector: 'app-handled',
  templateUrl: './handled.component.html',
  styleUrls: ['./handled.component.scss']
})
export class HandledComponent implements OnInit {

  public workOrderList: Page = new Page();                    //获取列表的数据
  constructor(
    private parentComp:ShoppingOrderComponent,
    private submit: SubmitService
  ) { }

  /**
   * 1.设置当前点击的颜色
   * 2.获取当前状态的列表
   */
  ngOnInit() {
    this.parentComp.orderType = 4;

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
      state: '',
    };
    _this.workOrderList = new Page(_this.submit.getData(requestUrl, requestData));
  }
}
