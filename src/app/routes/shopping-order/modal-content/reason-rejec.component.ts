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

  public other: string='';
  public stateEnum: string='OTHER';
  public list;
  @Input('woAgengId') woAgengId: string;
  @Input('showReasonWindow') showReasonWindow: boolean;
  @Output() closeRejec = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if ( changes['woAgengId']&&!isNullOrUndefined(this.woAgengId)) {
      this.list =  this.rzhtoolsService.getEnumDataList('1306');
      this.stateEnum='OTHER';//每次输入属性进来的时候，让stateEnum恢复原状
      this.other='';//每次输入属性进来的时候，让原因恢复原状
      $('.wrapper > section').css('z-index', 200);
      this.showReasonWindow=true;
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
  hideWindow(type: boolean) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showReasonWindow = false;
    if (isUndefined(type)) type = false;
    this.closeRejec.emit(
      type
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
    let result=this.shoppingOrderService.toRefuseWork(url, data);
    if(result=='拒单成功'){
      this.hideWindow(true);
    }
  }
}
