import { Component, OnInit } from '@angular/core';
import {StockManService} from "../stock-man.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "angular2-datatable";

@Component({
  selector: 'app-stock-man',
  templateUrl: './stock-man.component.html',
  styleUrls: ['./stock-man.component.scss']
})
export class StockManComponent implements OnInit {

  public shopListdata;//存储文章列表的数据

  private detailsbutton:Object;//查看详情按钮

  private updatebutton:Object;//修改按钮

  constructor(public stockManService:StockManService) { }

  /**
   * 1. 初始化的时候获取商品列表的数据
   * 2.初始化按钮信息
   */
  ngOnInit() {
    this.queryshopList()
    this.detailsbutton={
      title:"详情",
      type: "details"
    };
    this.updatebutton={
      title:"编辑",
      type: "update"
    };
  }

  /**
   * 查询商品列表的数据
   * @param event
   */
  queryshopList(event?:PageEvent){
    let activePage = 1;
    if(typeof event !== "undefined") {activePage =event.activePage};
    let url='/goodsQuery/query';
    let data={
      curPage:activePage,
      pageSize:5,
      kindId:'',
      goodsName:'',
      sortColumn:''
    }
    this.shopListdata=new Page(this.stockManService.getShopList(url,data))
    console.log(this.shopListdata)
  }

}
