import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";
declare var $: any;
const swal = require('sweetalert');
import {Page} from "../../../../core/page/page";
import {AllSaleComponent} from "../all-sale/all-sale.component";
import {AgreedComponent} from "../agreed/agreed.component";
import {RefusedComponent} from "../refused/refused.component";


@Component({
  selector: 'app-refused-agent',
  templateUrl: './refused-agent.component.html',
  styleUrls: ['./refused-agent.component.scss']
})
export class RefusedAgentComponent implements OnInit,OnChanges {
  public showCancelWindow:boolean = false;
  public goodsList: Page = new Page();
  public ordno:string;
  public opinion;

  @Input('afterNo') afterNo: string;
  @Output() cancelOrder = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['afterNo'] && !isNullOrUndefined(this.afterNo)){
      $('.wrapper > section').css('z-index', 200);
      this.showCancelWindow = true;
    }
  }


  constructor(public ajax:AjaxService, public submit: SubmitService,public routeInfo:ActivatedRoute,public AllSaleComponent:AllSaleComponent,public RefusedComponent:RefusedComponent) { }

  ngOnInit() {
    let _this = this;
    _this.ordno = this.routeInfo.snapshot.queryParams['ordno'];
  }

  hideWindow(){
    $('.wrapper > section').css('z-index', 114);
    this.showCancelWindow = false;
    this.cancelOrder.emit('hide')// 向外传值
  }

  /***
   * 代理商售后工单（不同意退货）
   */
  canceslOrder(){
    let _this = this;
    _this.ajax.put({
      url: '/woAgent/checkUnPassRefundGoods',
      data: {
        'afterNo':_this.afterNo,
        'opinion':_this.opinion
      },
      success: (res) => {
        if (res.success) {
          swal('拒绝退货', '', 'success');
          _this.hideWindow();
          _this.AllSaleComponent.queryDatas(1);
          _this.RefusedComponent.queryDatas(1);
        } else {
          swal(res.info);
        }
      },
      error: (data) => {
        swal('拒绝提交失败！', 'error');
      }
    })
  }


}
