import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {AgentordRecordService} from "./agentord-record.service";
import {Page} from "../../../core/page/page";

@Component({
  selector: 'app-agentord-record',
  templateUrl: './agentord-record.component.html',
  styleUrls: ['./agentord-record.component.scss']
})
export class AgentordRecordComponent implements OnInit {
  private controlData:Page = new Page();
  public agentcode;//获取代理商的编码

  constructor(private AgentordRecordService:AgentordRecordService) { }

  ngOnInit() {
    let  _this = this;
    let collection=JSON.parse(localStorage.getItem('loginInfo'));//获取代理商的编码
    _this.agentcode=collection.agentCode;//获取代理商的编码
    _this.queryList();//查询提现记录列表信息
  }

  /**
   * 查询提现记录列表信息
   * @param event
   */
  public queryList(event?:PageEvent) {

      let _this = this, activePage = 1;

      if(typeof event !== "undefined") {activePage =event.activePage};
      let data={
        curPage:activePage,
        agentCode:_this.agentcode
      }
      let url= "/finaceDraw/query";
    _this.controlData=_this.AgentordRecordService.controlDatas(url,data);
  }

  /**
   * 当点击tr的时候，让隐藏的tr出来
   */
  showDetail(data:any){
    data.isShow = !data.isShow;
  }
}
