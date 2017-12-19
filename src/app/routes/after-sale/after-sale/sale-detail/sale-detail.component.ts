import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AfterSaleComponent} from "../after-sale.component";
import {AfterSaleService} from "../../after-sale.service";


@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.scss']
})
export class SaleDetailComponent implements OnInit {
  public afterNo: string;//获取
  public result:any;

  constructor(
    public parentComp: AfterSaleComponent,
    public AfterSaleService: AfterSaleService,
    public routeInfo:ActivatedRoute) {
  }


  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 100;
    me.afterNo = me.routeInfo.snapshot.queryParams['afterNo'];
    me.getOrderDetail(); //获取订单详情
  }

  /**
   * 获取订单详情
   */
  getOrderDetail() {
    let me = this;
    let url = '/after/loadReqByAfterNo';
    let data = {
      afterNo:me.afterNo
    }
    this.result = me.AfterSaleService.getOrderDetailByNO(url,data);
  }

}
