import { Component, OnInit } from '@angular/core';
import {AfterSaleComponent} from "../after-sale.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {Page} from "../../../../core/page/page";
import {SubmitService} from "../../../../core/forms/submit.service";

@Component({
  selector: 'app-all-sale',
  templateUrl: './all-sale.component.html',
  styleUrls: ['./all-sale.component.scss']
})
export class AllSaleComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  private agentTime;
  public woList: Page = new Page();


  constructor(private AfterSaleComponent:AfterSaleComponent, private submit: SubmitService,private RzhtoolsService:RzhtoolsService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY/MM/DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let _this = this;
    _this.AfterSaleComponent.orderType = 1;
    _this.queryDatas(1);
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage, event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestUrl = '/woAgent/query';
    //格式化时间格式
    let dateStr = '';
    if (this.agentTime) {
      dateStr = RzhtoolsService.dataFormat(this.agentTime[0], 'yyyy/MM/dd') + '-' + RzhtoolsService.dataFormat(this.agentTime[1], 'yyyy/MM/dd');
    }

    let requestData = {
      curPage: activePage,
      pageSize: 10,
      ordType:'SELL_AFTER'
      // dateStr: dateStr,
    };
    _this.woList = new Page(_this.submit.getData(requestUrl, requestData));
    console.log("█ _this.woList ►►►",  _this.woList);

  }

}
