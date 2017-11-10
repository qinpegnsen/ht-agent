import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {AgentordApplyService} from "./agentord-apply.service";
import {AjaxService} from "../../../core/services/ajax.service";
import {Router} from "@angular/router";
import {AgentordRecordComponent} from "../agentord-record/agentord-record.component";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {PatternService} from "../../../core/forms/pattern.service";
const swal = require('sweetalert');

@Component({
  selector: 'app-agentord-apply',
  templateUrl: './agentord-apply.component.html',
  styleUrls: ['./agentord-apply.component.scss']
})
export class AgentordApplyComponent implements OnInit {
  public agentcode: any;//获取代理商的编码
  public selectBank: any;
  public controlData;
  public remark;
  public drawMoney;


  constructor(public submit: SubmitService,public AgentordApplyService:AgentordApplyService,public ajax:AjaxService,public router:Router,public AgentordRecordComponent:AgentordRecordComponent,public rzhtools:RzhtoolsService,public patterns: PatternService) { }

  ngOnInit() {
    let collection=JSON.parse(localStorage.getItem('loginInfo')), _this = this;//获取代理商的编码
    _this.agentcode=collection.agentCode;//获取代理商的编码

    _this.seletAllByTypeCode();//获取银行列表
    _this.queryList();//获取提现申请的信息
  }

  /*
   * 查询银行列表
   * */
  seletAllByTypeCode() {
    let url = '/datadict/queryAllByTypeCode';
    let data = {
      typeCode: 'common_use_bank_name'
    }
    this.selectBank = this.submit.getData(url, data);
  }

  /**
   * 获取提现申请的信息
   * @param event
   */
  public queryList(event?:PageEvent) {
    let _this = this;
    let data={
      agentCode:_this.agentcode
    }
    let url= "/finaceDraw/loadAgentBalance";
    _this.controlData=_this.AgentordApplyService.controlDatas(url,data);
    _this.remark=_this.controlData.bank;
  }

  /**
   * 提交提现申请
   * @param value
   */
  addLimitList(value) {
    let _this = this;
    _this.ajax.post({
      url: '/finaceDraw/insert',
      data: {
        agentCode:_this.agentcode,
        drawMoney:_this.drawMoney,
        acct:_this.controlData.acct,
        bank:_this.remark,
        bacctName:_this.controlData.bacctName
      },
      success: (res) => {
        if (res.success) {
          _this.router.navigate(['/main/withdrawal/agentord-record'], {replaceUrl: true}); //路由跳转
          swal('已成功提交提现申请！', '', 'success');
          _this.AgentordRecordComponent.queryList()//实现刷新
        } else {
          swal(res.info);
        }
      },
      error: (data) => {
        swal('提现申请提交失败！', '', 'error');
      }
    })
  }

  /**
   * 输入两位小数
   * @param target
   * @param type
   */
  twoNum(target,type?){
    this.rzhtools.auditInputValueForNum(target,type);
  }
}
