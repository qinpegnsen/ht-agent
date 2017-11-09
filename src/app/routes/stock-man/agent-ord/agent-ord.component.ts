import {Component, OnInit} from '@angular/core';
import {StockManService} from "../stock-man.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {HeaderComponent} from "../../../layout/header/header.component";

const swal = require('sweetalert');
declare var $: any;

@Component({
  selector: 'app-agent-ord',
  templateUrl: './agent-ord.component.html',
  styleUrls: ['./agent-ord.component.scss']
})

export class AgentOrdComponent implements OnInit {

  public shopListdata;                    //存储商品列表的数据
  public carNum: number = 1;              //存储商品的数量
  private showCar: boolean = false;      //当全选被选中的时候出现全部加入购物车的按钮

  constructor(
    public stockManService: StockManService,
    public headerComponent: HeaderComponent) {
  }

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
    }
    ;
    let url = '/goodsQuery/query';
    let data = {
      curPage: activePage,
      pageSize: 10,
      kindId: '',
      goodsName: '',
      sortColumn: ''
    }
    this.shopListdata = new Page(this.stockManService.getShopList(url, data))
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event,i){
    i.style.display = 'block';
    i.style.top = (event.clientY+10) + 'px';
    i.style.left = (event.clientX+10)+ 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(i) {
    i.style.display = 'none';
  }

  /**
   * 点击全选的时候，全选的购物车出现
   */
  allSelect(obj) {
    if ($(obj).prop("checked")) {
      $("._good").attr("checked", true);
      $("._good").prop("checked", true);
      $(obj).attr("checked", true)
      $('._good[checked="checked"]').parents('tr').css('background', '#FFF4E8')   //点击的时候样式的变化
      this.showCar=true;
    } else {
      $(obj).attr("checked", false);
      $("._good").attr("checked", false);
      $("._good").prop("checked", false);
      $('._good').parents('tr').css('background', '#fff');   //点击的时候样式的变化
      this.showCar=false;
    }
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
  minusNum(obj) {
    let num = $(obj).parents('.input-group').find('input').val();//因为有可能点击到span或者是i所以找父级
    num--;
    if (num < 2) num = 1;
    this.carNum = num
    $(obj).parents('.input-group').find('input:first').val(num);
    $(obj).parents('tr').find('._good').prop('checked', true)
    $(obj).parents('tr').find('._good').attr('checked', true)
    $(obj).parents("tr").css('background', '#FFF4E8')   //点击的时候样式的变化;
  }

  /**
   *增加购物车的数量
   * @param i 通过i来获取库存的数量
   * @param target
   */
  addNum(i, obj) {
    let num = $(obj).parents('.input-group').find('input').val();//因为有可能点击到span或者是i所以找父级
    num++;
    // if (num > this.shopListdata.voList[i].storageNum) {
    //   num = this.shopListdata.voList[i].storageNum;
    //   $(obj).prop('checked','checked');
    // }
    this.carNum = num;
    $(obj).parents('.input-group').find('input:first').val(num)
    $(obj).parents('tr').find('._good').prop('checked', true)
    $(obj).parents('tr').find('._good').attr('checked', true)
    $(obj).parents("tr").css('background', '#FFF4E8')   //点击的时候样式的变化;
  }

  /**
   * input 输入框修改的时候把值保存下来
   * @param obj
   */
  changeNum(obj) {
    this.carNum = obj.value.slice(0,6);//截取6位，这里不只是maxlength
    $(obj).parents('tr').find('input:first').prop('checked', true)
    $(obj).parents('tr').find('input:first').attr('checked', true)
    $(obj).parents("tr").css('background', '#FFF4E8')   //点击的时候样式的变化;
  }

  /**
   * 点击前面的勾选按钮，然后才加入到购物车
   * @param goodsCode
   */
  goodSelect(obj) {
    let me = this;
    if ($(obj).prop("checked")) {
      $(obj).attr("checked", true)
      $(obj).parents("tr").css('background', '#FFF4E8')   //点击的时候样式的变化;
      me.showCar=true;        //让批量选择的购物车出现
    } else {
      $(obj).attr("checked", false)
      $(obj).parents("tr").css('background', '#fff');   //点击的时候样式的变化
      if($('._good[checked="checked"]').length>0){ //如果长度为0就让购物车的按钮隐藏
        me.showCar=true;
      }else{
        me.showCar=false;
      }
    }
    me.inputSelect(obj);
  }

  /**
   * 点击单个商品input的时候，上级input的变化  这里用到了回调来解决在bug
   * @param obj
   *@param boolean  true 控制总选按钮的变化  false控制店铺按钮的变化
   *
   */
  inputSelect(obj) {
    let goodLength = $(obj).parents("tbody").find("._good").length //商品的长度
    let checkGoodLength= $(obj).parents("tbody").find("._good[checked='checked']").length//被选择的商品的长度
    if (goodLength == checkGoodLength) {
      $('._all').prop("checked", true)
      $('._all').attr("checked", true)
    } else {
      $('._all').prop("checked", false)
      $('._all').attr("checked", false)
    }
  }

  /**
   * 点击加入到购物车
   * @param goodsCode
   */
  addCart(goodsCode, ele) {
    $(ele).parents("tr").find('._good').prop("checked",'checked');
    $(ele).parents("tr").find('._good').attr("checked",'checked');
    $(ele).parents("tr").css('background', '#FFF4E8')   //点击的时候样式的变化;
    let url = '/agent/agentCart/addCustCart';
    let data = {
      strData: `${goodsCode},${this.carNum};`
    }
    this.stockManService.sendCar(url, data);
    this.headerComponent.getShopTotal();
    this.inputSelect(ele);
  }

  /**
   * 批量选择的购物车
   */
  addAllCart() {
    if($('_all').prop("checked")){  //全选
      var num = $("._num"), str = '';
    }else {//批量选择
      var num = $('._good[checked="checked"]').parents('tr').find("._num"), str = '';
    }
    for (var i = 0; i < num.length; i++) {
      let item = num.eq(i).next('input').val() + ',' + num.eq(i).val() + ';';
      str += item;
    }
    let url = '/agent/agentCart/addCustCart';
    let data = {
      strData: str
    }
    this.stockManService.sendCar(url, data)
    this.headerComponent.getShopTotal()
  }

  /**
   * keyUp  的时候检查输入的值
   */
  checkVal(obj){
    if(obj.value==''){
      obj.value=1
    }else if(obj.value.indexOf('.')!=-1){
      obj.value=Math.floor(obj.value);   //如果是小数，取整数
    }
  }
}
