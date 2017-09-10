import { Component, OnInit } from '@angular/core';
import {StockManService} from "../stock-man.service";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {HeaderComponent} from "../../../layout/header/header.component";
declare var $: any;
@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss']
})
export class CarPageComponent implements OnInit {

  private storeListData:any;//储存购物车商品列表数据
  private deletebutton;//删除按钮
  private shopTotalNumber:number=0;//购买的商品总数
  private shopTotalPrice:number=0;//商品的总价
  public priceList:object={
    expressPrice:0,
    payment:0
  };//价格列表，默认是0
  constructor(public stockManService: StockManService,public headerComponent: HeaderComponent) { }

  /**
   * 1.初始化的时候查询列表
   * 2.给删除按钮赋值
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
    this.storeListData=this.stockManService.getShopList(url, data)
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
    this.headerComponent.getShopTotal()
  }

  /**
   * 点击单个商品input的时候，店铺input的变化  这里用到了回调来解决在88
   * @param obj
   *@param boolean  true 控制总选按钮的变化  false控制店铺按钮的变化
   *
   */
  inputSelect(obj,boolean){
    $(obj).attr("checked","checked")  //搭配使用用来显示节点，在获取长度的时候会用到
    if(boolean){
      let storeLength=$(obj).parents("._myStoreTotal").find("._store").length //商品的长度
      console.log("█ storeLength ►►►",  storeLength);
      let checkStoreLength=$(obj).parents("._myStoreTotal").find("._store[checked='checked']").length//被选择的商品长度
      console.log("█ checkStoreLength ►►►",  checkStoreLength);
      if(storeLength==checkStoreLength) {
        $(obj).parents("._padingBtm").find("._all").prop("checked", true)
        $(obj).parents("._padingBtm").find("._all").attr("checked", true)
      }
    }else{
      let goodLength=$(obj).parents("._myStore").find("._good").length //商品的长度
      let checkGoodLength=$(obj).parents("._myStore").find("._good[checked='checked']").length//被选择的商品长度
      if(goodLength==checkGoodLength) {
        $(obj).parents("._myStore").find("._store").prop("checked", true)
        $(obj).parents("._myStore").find("._store").attr("checked", true)
        this.inputSelect(obj,1)  //回调  看店铺是否全选来决定全选按钮的状态
      }
    }

  }

  /**
   * 商品的单选按钮
   * @param obj  当前选择的元素，有商品的，店铺的，全部的，必选的
   * @param goodsCode  商品编码，可传对象，在店铺和全选不用传
   * @param shopNum 商品数量，可传对象，在店铺和全选不用传
   */
  goodEle(obj,goodsCode){
    let num = $(obj).parents('._myPaddingBody').find('._num').val();//因为有可能点击到span或者是i所以找父级
    if($(obj).prop("checked")){
      $(obj).parents("._myPaddingBody").css('background','#FFF4E8')   //点击的时候样式的变化
      $(obj).parents('._myPaddingBody').find("._good").prop("checked",true) //单选框被选中
      this.inputSelect(obj,'')
    }else{
      $(obj).attr("checked",false)
      $(obj).parents("._myPaddingBody").css('background','#fff')   //点击的时候样式的变化
      $(obj).parents("._myStore").find("._store").prop("checked",false)
    }
    this.getShopTotalNum();
    this.getPriceList(goodsCode,num);
  }

  /**
   * 店铺的单选按钮
   * @param obj
   */
  storeEle(obj){
    if($(obj).prop('checked')){
      $(obj).attr('checked',true)
      $(obj).parents("._myStore").find("._myPaddingBody").css('background','#FFF4E8')   //点击的时候样式的变化
      $(obj).parents('._myStore').find("._good").prop("checked",true);
      $(obj).parents('._myStore').find("._good").attr("checked",true);
      this.inputSelect(obj,1)  //调用选择框的方法
    }else{
      $(obj).attr('checked',false)
      $(obj).parents("._myStore").find("._myPaddingBody").css('background','#fff')   //点击的时候样式的变化
      $(obj).parents('._myStore').find("._good").prop("checked",false)
      $(obj).parents('._myStore').find("._good").attr("checked",false)
    }
    this.getShopTotalNum();
  }

  /**
   * 购物车总的单选按钮
   * changes 事件一定是鼠标和键盘触发的，页面input的选中不是change事件
   * @param obj
   */
  allEle(obj){
    if($(obj).prop('checked')){
      $(obj).parents("._padingBtm").find("._myPaddingBody").css('background','#FFF4E8')   //点击的时候样式的变化
      $(obj).parents('._padingBtm').find("._store").prop("checked",true);
    }else{
      $(obj).parents("._padingBtm").find("._myPaddingBody").css('background','#fff')   //点击的时候样式的变化
      $(obj).parents('._padingBtm').find("._store").prop("checked",false)
    }
    let target = $(obj).parents('._padingBtm').find("._store");
    this.storeEle(target);
    this.getShopTotalNum()
  }


  /**
   * 减购物车的数量
   * 1.把值渲染到input框里面
   * 2.让左边的自动被选择
   * 3.调取价格方法，刷新页面数据
   * @param obj 当前点击的对象
   * @param goodsCode 商品的编码  计价使用
   * @param id 商品的id 修改商品数量使用
   */
  minusNum(obj,goodsCode,id) {
    $(obj).parents("._myPaddingBody").css('background','#FFF4E8')   //点击的时候样式的变化
    $(obj).parents('._myPaddingBody').find("._good").prop("checked",true) //单选框被选中
    $(obj).parents('._myPaddingBody').find("._good").attr("checked","checked") //单选框被选中,节点效果，计数用

    let num = $(obj).parents('.updateNum').find('input').val();//因为有可能点击到span或者是i所以找父级
    num--;
    if (num < 2) num = 1;
    $(obj).parents('.updateNum').find('input:first').val(num)

    let url = '/agent/agentCart/updateOneAgentCart'; //加减修改数据
    let data = {
      id:id,
      num:num
    }
    this.stockManService.putData(url,data)

    this.getPriceList(goodsCode,num);
    this.inputSelect(obj,'')
    this.getShopTotalNum()
  }

  /**
   *增加购物车的数量
   * 1.把值渲染到input框里面
   * 2.让左边的自动被选择
   * 3.调取价格方法，刷新页面数据
   * @param obj
   * @param goodsCode  商品的编码  计价使用
   * @param storageNum  库存的数量 修改的时候不能大于库存量
   * @param id  商品的id 修改商品数量使用
   */
  addNum(obj,goodsCode,id,storageNum) {
    $(obj).parents("._myPaddingBody").css('background','#FFF4E8')   //点击的时候样式的变化
    $(obj).parents('._myPaddingBody').find("._good").prop("checked",true)
    $(obj).parents('._myPaddingBody').find("._good").attr("checked","checked") //增加节点，计数用

    let num = $(obj).parents('.updateNum').find('input').val();//因为有可能点击到span或者是i所以找父级
    num++;
    if (num > storageNum) num = storageNum;
    // this.shopTotalNum=num;
    $(obj).parents('.updateNum').find('input:first').val(num)
    let url = '/agent/agentCart/updateOneAgentCart'; //加减修改数据
    let data = {
      id:id,
      num:num
    }
    this.stockManService.putData(url,data);
    this.inputSelect(obj,'')
    this.getPriceList(goodsCode,num)
    this.getShopTotalNum()
  }
  /**
   * 点击进行修改，并重新计价
   * 1.商品的按钮被选中
   * 2.重新计价
   * @param obj
   * @param goodsCode  商品的编码  计价使用
   * @param id 商品的id 修改商品数量使用
   */
  updataNum(obj,goodsCode,id,storageNum){
    $(obj).parents("._myPaddingBody").css('background','#FFF4E8')   //点击的时候样式的变化
    $(obj).parents('._myPaddingBody').find("._good").prop("checked",true)
    $(obj).parents('._myPaddingBody').find("._good").prop("checked","checked")   //增加节点。计数用
    let num = $(obj).parents('.input-group').find('input').val()
    if (num > storageNum) num = storageNum;
    // this.shopTotalNum=num;
    $(obj).parents('.updateNum').find('input:first').val(num)
    let url = '/agent/agentCart/updateAgentCart'; //输入框修改数据
    let data = {
      id:id,
      num:num
    }
    this.stockManService.putData(url,data);
    this.inputSelect(obj,'')
    this.getPriceList(goodsCode,num)
    this.getShopTotalNum()
  }

  /**
   * 获取价格的列表
   * @param goodsCode
   * @param shopNum
   */
  getPriceList(goodsCode,shopNum){
    let url = '/agent/agentCart/valuationAgentCart';
    let data = {
      strData:`${goodsCode},${shopNum};`
    }
    this.priceList=this.stockManService.putData(url,data)
    // console.log("█ this.priceList ►►►",  this.priceList['payment']);
    this.shopTotalPrice+=this.priceList['payment']
    // console.log("█ this.priceList ►►►",  this.priceList);
  }

  /**
   * 购买商品的总数
   */
  getShopTotalNum(){
    let numArr=$("._good[checked='checked']").parents("._myPaddingBody").find("._num");
    let tempData:number=0;
    for(var i=0;i<numArr.length;i++){
      // console.log("█ numArr[i] ►►►",  numArr[i]);
      tempData+=Number($(numArr[i]).val())
    }
    this.shopTotalNumber=tempData
  }
}
