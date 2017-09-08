import {Component, OnInit} from '@angular/core';
import {StockManService} from "../stock-man.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {AppComponent} from "../../../app.component";
import {HeaderComponent} from "../../../layout/header/header.component";
import {MaskService} from "../../../core/services/mask.service";
const swal = require('sweetalert');

declare var $: any;

@Component({
  selector: 'app-agent-ord',
  templateUrl: './agent-ord.component.html',
  styleUrls: ['./agent-ord.component.scss']
})
export class AgentOrdComponent implements OnInit {

  public shopListdata;//存储商品列表的数据

  public carNum:number=1;//存储商品的数量

  private flag: boolean = false;//用来判断在加入购物车之前是否选择了商品

  private showCar: boolean = false;//当全选被选中的时候出现全部加入购物车的按钮

  constructor(public stockManService: StockManService,public headerComponent: HeaderComponent) {}

  /**
   * 1.初始化的时候获取商品列表的数据
   * 2.初始化按钮信息
   */
  ngOnInit() {
    this.queryshopList();
  }

  /**
   * 查询商品列表的数据
   * @param event
   */
  queryshopList(event?: PageEvent) {
    let activePage = 1;
    if (typeof event !== "undefined") {
      activePage = event.activePage
    };
    let url = '/goodsQuery/query';
    let data = {
      curPage: activePage,
      pageSize: 2,
      kindId: '',
      goodsName: '',
      sortColumn: ''
    }
    this.shopListdata = new Page(this.stockManService.getShopList(url, data))
  }

  /**
   * 点击全选的时候，全选的购物车出现
   */
  showTotalCar() {
    this.showCar = !this.showCar;
  }

  /**
   * 当点击tr的时候，让隐藏的tr出来
   */
  showDetail(shop: any) {
    shop.isShow = !shop.isShow;
  }

  /**
   * 减购物车的数量
   */
  minusNum(target) {
    let num = $(target).parents('.input-group').find('input').val();//因为有可能点击到span或者是i所以找父级
    num--;
    if (num < 2) num = 1;
    this.carNum=num
    $(target).parents('.input-group').find('input:first').val(num)
  }

  /**
   *增加购物车的数量
   * @param i 通过i来获取库存的数量
   * @param target
   */
  addNum(i,target) {
    let num = $(target).parents('.input-group').find('input').val();//因为有可能点击到span或者是i所以找父级
    num++;
    if (num > this.shopListdata.voList[i].storageNum) num = this.shopListdata.voList[i].storageNum;
    this.carNum=num;
    $(target).parents('.input-group').find('input:first').val(num)
  }


  /**
   * input 输入框修改的时候把值保存下来
   * @param obj
   */
  changeNum(obj){
    this.carNum=obj.value
  }
  /**
   * 点击前面的勾选按钮，然后才加入到购物车
   * @param goodsCode
   */
  getData(ele) {
    $(ele).parents("tr").attr('data','flag')
  }

  /**
   * 点击加入到购物车
   * @param goodsCode
   */
  addCart(goodsCode,ele) {
    if($(ele).parents("tr").attr('data')){
      let url = '/agent/agentCart/addCustCart';
      let data = {
        strData:`${goodsCode},${this.carNum};`
      }
      this.stockManService.sendCar(url, data);
      this.headerComponent.getShopTotal()
    }else{
      AppComponent.rzhAlt("info",'请先选择商品');
    }
  }

  /**
   * 点击全选后，将本页面商品全部添加到购物车
   */
  addAllCart(){
    let num = $("._num"),str='';
    for(var i=0;i<num.length;i++){
      let item = num.eq(i).next('input').val() + ',' + num.eq(i).val() + ';';
      str += item;
      console.log(str)
    }
    let url = '/agent/agentCart/addCustCart';
    let data = {
      strData:str
    }
    this.stockManService.sendCar(url, data)
    this.headerComponent.getShopTotal()
  }


}
