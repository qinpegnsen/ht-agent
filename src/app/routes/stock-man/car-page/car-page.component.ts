import { Component, OnInit } from '@angular/core';
import {StockManService} from "../stock-man.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {HeaderComponent} from "../../../layout/header/header.component";
declare var $: any;
@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss']
})
export class CarPageComponent implements OnInit {

  private carListData:any;//储存购物车商品列表数据
  private deletebutton;//删除按钮
  private flag:boolean=true;//开关按钮，用来判断选择还是取消
  public carNum:number=0;//购物车商品的数量
  public priceList={
    total:0,
    payment:0,
  };//价格列表，默认是0
  constructor(public stockManService: StockManService,public headerComponent: HeaderComponent) { }

  /**
   * 1.初始化的时候查询列表
   * 2.给按钮赋值
   */
  ngOnInit() {
    this.getCarList()
    this.deletebutton={
      title:"删除",
      type: "delete"
    };
  }

  /**
   * 获取购物车的商品列表
   */
  getCarList(event?: PageEvent){
    let activePage = 1;
    if (typeof event !== "undefined") {
      activePage = event.activePage
    };
    let url = '/agent/agentCart/queryAll';
    let data = {
      curPage:activePage,
      pageSize:2,
      sortColumns:'',
    }
    this.carListData=new Page(this.stockManService.getShopList(url, data))
  }

  /**
   * 点击删除的时候执行,然后刷新页面,刷新购物车的总数
   * @param id
   */
  doDelete(id){
    let url = '/agent/agentCart/deleteAgentCartById';
    let data = {
      id:id
    }
    this.stockManService.deleteData(url,data)
    this.getCarList()
    this.headerComponent.getShopTotal()
  }


  /**
   * 减购物车的数量
   * 1.把值渲染到input框里面
   * 2.让左边的自动被选择
   * 3.调取价格方法，刷新页面数据
   * @param target 当前点击的对象
   */
  minusNum(obj,goodsCode) {
    $(obj).parents("tr").css('background','#FFF4E8')   //点击的时候样式的变化
    let num = $(obj).parents('.input-group').find('input').val();//因为有可能点击到span或者是i所以找父级
    num--;
    if (num < 2) num = 1;
    this.carNum=num
    $(obj).parents('.input-group').find('input:first').val(num)
    $(obj).parents('tr').find("input:first").attr("checked","checked")
    this.getPrice(goodsCode,'','',true)
  }

  /**
   *增加购物车的数量
   * 1.把值渲染到input框里面
   * 2.让左边的自动被选择
   * 3.调取价格方法，刷新页面数据
   * @param i 通过i来获取库存的数量
   * @param target
   */
  addNum(i,obj,goodsCode) {
    $(obj).parents("tr").css('background','#FFF4E8')   //点击的时候样式的变化
    let num = $(obj).parents('.input-group').find('input').val();//因为有可能点击到span或者是i所以找父级
    num++;
    if (num > this.carListData.voList[i].storageNum) num = this.carListData.voList[i].storageNum;
    this.carNum=num;
    $(obj).parents('.input-group').find('input:first').val(num)
    $(obj).parents('tr').find("input:first").attr("checked","checked")
    this.getPrice(goodsCode,'','',true)
  }
  /**
   * 点击进行修改，并重新计价
   * @param id
   * @param obj 获取当前修改过后的值
   * @param goodsCode 商品编码
   */
  updataNum(id,obj,goodsCode){
    $(obj).parents("tr").css('background','#FFF4E8')   //点击的时候样式的变化
    let num=$(obj).val()
    if(num==''){//这里必须得进行判断，否则num为空，在获取商品总数的时候会报错
      num=1;
    }
    this.carNum=num;
    this.getPrice(goodsCode,'','',true)
    let url = '/agent/agentCart/updateAgentCart'; //修改数据
    let data = {
      id:id,
      num:num
    }
    this.stockManService.putData(url,data)
  }

  /**
   * 1.获取商品的价格
   * 2.让前面的按钮被选中
   * @param goodsCode 商品的编码
   * @param num 商品的数量
   * @param obj 当前点击的对象
   * @param bool 用来判断是谁调用的这个方法
   */
  getPrice(goodsCode,num?,obj?,bool?){
    $(obj).parents("tr").css('background','#FFF4E8')   //点击的时候样式的变化
    let inputArr=$(".changeSeltect");
    console.log(this.flag)
    console.log(bool)
    if(this.flag||bool){ //第一次点击的效果
      console.log(1)
      this.flag=!this.flag;
      if(num){  //解决商品总数在直接点击选中按钮时候的总数
        this.carNum=num;
      }
      for(let i=0;i<inputArr.length;i++){//获取到所有的input，让编码相同的被选中
        if(goodsCode==$(inputArr[i]).val()){
          if(!$(inputArr[i]).attr('checked')){
            $(inputArr[i]).attr('checked','checked')
          }
        }
      }
      let shopNum=num?num:this.carNum;
      let url = '/agent/agentCart/valuationAgentCart';
      let data = {
        strData:`${goodsCode},${shopNum};`
      }
      this.priceList=this.stockManService.putData(url,data)
    }else{//第二次点击的效果
      console.log(2)
      this.flag=!this.flag;
      this.carNum=0;
      for(let i=0;i<inputArr.length;i++){
        if(goodsCode==$(inputArr[i]).val()){
          if($(inputArr[i]).attr('checked')){
            console.log(3)
            $(inputArr[i]).removeAttr('checked') //取消的时候用
          }
        }
      }
      this.priceList={
        total:0,
        payment:0,
      }
    }

  }
}
