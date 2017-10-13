import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {ShoppingOrderService} from "../shopping-order.service";

declare var $: any;

@Component({
  selector: 'app-deliver-goods',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.scss']
})

export class DeliverComponent implements OnInit, OnDestroy, OnChanges {

  public showDeliverWindow: boolean = false;
  public expressList: any;   //物流公司列表
  public expressNo: any;     //快递公司快递号
  public expressCode: any;   //快递公司唯一代码
  @Input('woAgentId') woAgentId: string;
  @Input('page') page: string;
  @Input('ordno') ordno: string;
  @Output() deliverGoods = new EventEmitter();

  constructor(private shoppingOrderService: ShoppingOrderService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ordno'] && !isNullOrUndefined(this.ordno)) {
      $('.wrapper > section').css('z-index', 200);
      this.showDeliverWindow = true;
      this.expressNo = null;      //每次出来把上次填的订单号清除，快递公司就算了，留着吧
    }
  }

  /**
   * 1.获取已经开启的快递公司的信息
   */
  ngOnInit() {
    let url='/basicExpress/queryBasicExpressIsUseList';
    let data='';
    this.expressList=this.shoppingOrderService.getBasicExpressList(url,data);
  }

  /**
   * 组件摧毁的时候把层级降下来，隐藏组件
   */
  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: boolean) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showDeliverWindow = false;
    if (isUndefined(type)) type = false;
    this.deliverGoods.emit({
      type: type,
      page: me.page
    })// 向外传值
  }

  /**
   * 确认发货
   */
  delivery() {
    let url = '/woAgent/delivery';
    let data = {
      ordno: this.ordno,
      woAgentId: this.woAgentId,
      expressCode: this.expressCode,
      expressNo: this.expressNo
    }
    let result = this.shoppingOrderService.toAcceptWork(url, data);
    if (isNullOrUndefined(result)) this.hideWindow(true)
  }
}
