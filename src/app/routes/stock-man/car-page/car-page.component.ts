import { Component, OnInit } from '@angular/core';
import {StockManService} from "../stock-man.service";
import {Page} from "../../../core/page/page";
declare var $: any;
@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss']
})
export class CarPageComponent implements OnInit {

  private carListData:any;//储存购物车商品列表数据
  private deletebutton;//删除按钮
  public carNum;//购物车商品的数量
  constructor(public stockManService: StockManService) { }

  /**
   * 1.初始化的时候查询列表
   * 2.给按钮赋值
   */
  ngOnInit() {
    this.getCarList()
    this.deletebutton={
      title:"详情",
      type: "delete"
    };
  }

  /**
   * 获取购物车的商品列表
   */
  getCarList(){
    let url = '/agent/agentCart/queryAll';
    let data = {}
    this.carListData=new Page(this.stockManService.getShopList(url, data))
  }

  /**
   * 点击删除的时候执行,然后刷新页面
   * @param id
   */
  doDelete(id){
    let url = '/agent/agentCart/deleteAgentCartById';
    let data = {
      id:id
    }
    this.stockManService.deleteData(url,data)
    this.getCarList()
  }


  /**
   * 减购物车的数量
   */
  minusNum(target) {
    let n = $(target).parents('.input-group').find('input').val();//因为有可能点击到span或者是i所以找父级
    n--;
    if (n < 2) n = 1;
    this.carNum=n
    $(target).parents('.input-group').find('input:first').val(n)
  }

  /**
   *增加购物车的数量
   * @param i 通过i来获取库存的数量
   * @param target
   */
  addNum(i,target) {
    let n = $(target).parents('.input-group').find('input').val();//因为有可能点击到span或者是i所以找父级
    n++;
    if (n > this.carListData.voList[i].storageNum) n = this.carListData.voList[i].storageNum;
    this.carNum=n;
    $(target).parents('.input-group').find('input:first').val(n)
  }
  /**
   * 点击进行修改器爱
   * @param id
   * @param obj 获取当前修改过后的值
   */
  updataNum(id,obj){
    let num=$(obj).val()
    this.carNum=num;
    let url = '/agent/agentCart/updateAgentCart';
    let data = {
      id:id,
      num:num
    }
    this.stockManService.putData(url,data)
    this.getCarList()
  }
}
