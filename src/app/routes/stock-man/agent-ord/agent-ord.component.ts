
import { Component, OnInit } from '@angular/core';
import {StockManService} from "../stock-man.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "angular2-datatable";

declare var $: any;

@Component({
  selector: 'app-agent-ord',
  templateUrl: './agent-ord.component.html',
  styleUrls: ['./agent-ord.component.scss']
})
export class AgentOrdComponent implements OnInit {

  public shopListdata;//存储文章列表的数据

  private num:number=1;//购物车商品的数量,默认是1

  private flag:boolean=false;//购物车商品的数量,默认是1

  constructor(public stockManService:StockManService) { }

  /**
   * 1.初始化的时候获取商品列表的数据
   * 2.初始化按钮信息
   */
  ngOnInit() {
    this.queryshopList()
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
      pageSize:3,
      kindId:'',
      goodsName:'',
      sortColumn:''
    }
    this.shopListdata=new Page(this.stockManService.getShopList(url,data))
  }

  /**
   * 点击全选的时候，全选的购物车出现
   */
  showTotalCar(){
    this.flag=!this.flag;
  }

  /**
   * 当点击tr的时候，让隐藏的tr出来
   */
  showDetail(data:any){
    data.isShow = !data.isShow;
  }

  /**
   * 减购物车的数量
   */
  minusNum(){
    this.num=this.num-1;
    if(this.num<1){
      this.num=1;
    }
  }
  /**
   * 增加购物车的数量
   */
  addNum(){
    this.num=this.num+1;
  }


  /**
   * 点击加入到购物车,同时把商品的数量存储到sessionSstorage
   * @param goodsCode
   */
  addCart(goodsCode){
    let url='/agent/agentCart/addCustCart';
    let data={
      goodsCode:goodsCode,
      num:this.num
    }
    this.stockManService.sendCar(url,data)
  }


}
