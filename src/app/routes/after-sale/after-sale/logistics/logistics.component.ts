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

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.scss']
})
export class LogisticsComponent implements OnInit,OnChanges {
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

  constructor(public ajax:AjaxService, public submit: SubmitService,public routeInfo:ActivatedRoute,public AllSaleComponent:AllSaleComponent,public AgreedComponent:AgreedComponent) { }

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
   * 代理商售后工单（同意退货）
   */
  canceslOrder(){
    let _this = this;
    _this.ajax.put({
      url: '/woAgent/checkPassRefundGoods',
      data: {
        'afterNo':_this.afterNo,
        'opinion':_this.opinion
      },
      success: (res) => {
        if (res.success) {
          swal('已同意退货', '', 'success');
          _this.hideWindow();
          _this.AllSaleComponent.queryDatas(1);
          _this.AgreedComponent.queryDatas(1);
        } else {
          swal(res.info);
        }
      },
      error: (data) => {
        swal('申请退货提交失败！', 'error');
      }
    })
  }

}
