import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {zhCn} from "ngx-bootstrap/locale";
import {defineLocale} from "ngx-bootstrap";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {SubmitService} from "../../../core/forms/submit.service";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  private agentTime;
  private ordnos;
  public woList: Page = new Page();

  constructor(private submit: SubmitService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY-MM-DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    this.queryDatas(1);
  }

  /**
   * 清空时间
   */
  clearDate(){
    this.agentTime = null;
    this.queryDatas(1);// 获取数据
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
    let requestUrl = '/ord/queryAgentSettle';
    //格式化时间格式
    let dateStr = '';
    let dateStrs = '';
    if (this.agentTime) {
      dateStr = RzhtoolsService.dataFormat(this.agentTime[0], 'yyyy-MM-dd');
      dateStrs = RzhtoolsService.dataFormat(this.agentTime[1], 'yyyy-MM-dd');
    }else{
      dateStr = null;
      dateStrs = null;
    }
    let requestData = {
      curPage: activePage,
      pageSize: 20,
      ordno: _this.ordnos,
      startTime:dateStr,
      endTime:dateStrs,
    };
    _this.woList = new Page(_this.submit.getData(requestUrl, requestData));

  }
}
