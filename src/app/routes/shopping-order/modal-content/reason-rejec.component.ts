import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {ShoppingOrderService} from "../shopping-order.service";
import {AllWorkOrdersComponent} from "../all-work-orders/all-work-orders.component";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {WaitForOrdersComponent} from "../wait-for-orders/wait-for-orders.component";

declare var $: any;

@Component({
  selector: 'app-reason-rejec',
  templateUrl: './reason-rejec.component.html',
  styleUrls: ['./reason-rejec.component.scss'],
})

export class ReasonRejecComponent implements OnInit , OnDestroy{

  public other: string;
  public stateEnum: string='OTHER';
  public list;
  @Input('woAgengId') woAgengId: string;
  @Input('showReasonWindow') showReasonWindow: boolean;
  @Output() closeRejec = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showReasonWindow'] && changes['woAgengId']) {
      this.list =  this.rzhtoolsService.getEnumDataList('1306');
      if(this.showReasonWindow && this.woAgengId && !isNullOrUndefined(this.woAgengId)) $('.wrapper > section').css('z-index', 200);
      else $('.wrapper > section').css('z-index', 114);
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(
    private shoppingOrderService:ShoppingOrderService,
    private allWorkOrdersComponent:AllWorkOrdersComponent,
    private waitForOrdersComponent:WaitForOrdersComponent,
    private rzhtoolsService:RzhtoolsService
  ) { }

  ngOnInit() {
  }

  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: string) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showReasonWindow = false;
    if (isUndefined(type)) type = 'cancel';
    this.closeRejec.emit(
      false
    )// 向外传值
  }

  /**
   * 拒接工单
   */
  delivery(){
    let url = '/woAgent/updateWoAgentToReject';
    let data = {
      reasonEnum: this.stateEnum,
      other: this.other,
      woAgengId: this.woAgengId
    };
    this.shoppingOrderService.toAcceptWork(url, data);
    this.hideWindow("success");
    this.allWorkOrdersComponent.queryDatas();
    this.waitForOrdersComponent.queryDatas();
  }
}
