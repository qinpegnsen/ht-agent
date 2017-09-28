import {Component, OnInit} from '@angular/core';
import {StockManService} from "../stock-man.service";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {HeaderComponent} from "../../../layout/header/header.component";
import {Router} from "@angular/router";
import {AppComponent} from "../../../app.component";
const swal = require('sweetalert');
declare var $: any;
@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss']
})
export class CarPageComponent implements OnInit {

  private storeListData: any;              //储存购物车商品列表数据
  private strDataTemp: string;             //储存购物车id,在订单页的时候使用
  private deletebutton;//删除按钮
  public shopTotalNumber: number = 0;     //购买的商品总数
  public priceList: object = {
    expressPrice: 0,                         //运费
    payment: 0,                              //带运费的总费用
    total: 0,                                //不带运费的总费用
  };                                         //价格列表，默认是0
  constructor(
    public stockManService: StockManService,
    public headerComponent: HeaderComponent,
    private router: Router
  ) {}

  /**
   * 1.初始化的时候查询列表
   * 2.给删除按钮赋值
   */
  ngOnInit() {
    this.getCarList()
    this.deletebutton = {
      title: "删除",
      type: "delete"
    };
  }

  /**
   * 获取购物车的商品列表
   */
  getCarList(event?: PageEvent) {
    let activePage = 1;
    if (typeof event !== "undefined") {
      activePage = event.activePage
    }
    ;
    let url = '/agent/agentCart/queryAll';
    let data = {
      curPage: activePage,
      pageSize: 2,
      sortColumns: '',
    }
    this.storeListData = this.stockManService.getShopList(url, data)
  }

  /**
   * 点击删除的时候执行,然后刷新页面,刷新购物车的总数
   * @param id
   */
  doDelete(id) {
    let that = this;
    swal({
      title: "您确定要删除吗？",
      text: "我很好,把我留下吧？",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonText: "确认",
      cancelButtonText: '取消',
      confirmButtonColor: "#ec6c62"
    }, function (isConfirm) {
      if (isConfirm) {
        swal.close(); //关闭弹框
        let url = '/agent/agentCart/deleteAgentCartById';
        let data = {
          id: id
        }
        that.stockManService.deleteData(url, data)
        that.getCarList()
        that.headerComponent.getShopTotal()
      }
    });
  }

  /**
   * 点击单个商品input的时候，上级nput的变化  这里用到了回调来解决在bug
   * @param obj
   *@param boolean  true 控制总选按钮的变化  false控制店铺按钮的变化
   *
   */
  inputSelect(obj, boolean) {
    if (boolean) {
      let storeLength = $(obj).parents("._myStoreTotal").find("._store").length //店铺的长度
      let checkStoreLength = $(obj).parents("._myStoreTotal").find("._store[checked='checked']").length//被选择的店铺的长度
      if (storeLength == checkStoreLength) {
        $(obj).parents("._padingBtm").find("._all").prop("checked", true)
        $(obj).parents("._padingBtm").find("._all").attr("checked", true)
      } else {
        $(obj).parents("._padingBtm").find("._all").prop("checked", false)
        $(obj).parents("._padingBtm").find("._all").attr("checked", false)
      }
    } else {
      let goodLength = $(obj).parents("._myStore").find("._good").length //商品的长度
      let checkGoodLength = $(obj).parents("._myStore").find("._good[checked='checked']").length//被选择的商品长度
      if (goodLength == checkGoodLength) {
        $(obj).parents("._myStore").find("._store").prop("checked", true)
        $(obj).parents("._myStore").find("._store").attr("checked", true)
        this.inputSelect(obj, 1)  //回调  看店铺是否全选来决定全选按钮的状态
      } else {
        $(obj).parents("._myStore").find("._store").prop("checked", false)
        $(obj).parents("._myStore").find("._store").attr("checked", false)
        this.inputSelect(obj, 1)  //回调  看店铺是否全选来决定全选按钮的状态
      }
    }
  }

  /**
   * 商品的单选按钮
   * @param obj  当前选择的元素
   *
   */
  goodEle(obj,target) {
    if ($(obj).prop("checked")) {
      $(obj).attr("checked", true)
      $(obj).parents("._myPaddingBody").css('background', '#FFF4E8')   //点击的时候样式的变化
      $(obj).parents('._myPaddingBody').find("._good").prop("checked", true) //单选框被选中
    } else {
      $(obj).attr("checked", false)
      $(obj).parents("._myPaddingBody").css('background', '#fff');   //点击的时候样式的变化
      $(obj).parents("._myStore").find("._store").prop("checked", false);
    }
    this.inputSelect(obj, '');
    this.getPriceList(obj,target);
    this.getShopTotalNum();
  }

  /**
   * 店铺的单选按钮
   * @param obj
   */
  storeEle(obj) {
    if ($(obj).prop('checked')) {
      $(obj).attr('checked', true)
      $(obj).parents("._myStore").find('._good').parents("._myPaddingBody").css('background', '#FFF4E8')   //点击的时候样式的变化
      $(obj).parents('._myStore').find("._good").prop("checked", true);
      $(obj).parents('._myStore').find("._good").attr("checked", true);

    } else {
      $(obj).attr('checked', false)
      $(obj).removeAttr('checked')
      $(obj).parents("._myStore").find('._good').parents("._myPaddingBody").css('background', '#fff')   //点击的时候样式的变化
      $(obj).parents('._myStore').find("._good").prop("checked", false)
      $(obj).parents('._myStore').find("._good").attr("checked", false)
    }
    this.inputSelect(obj, 1)  //调用选择框的方法
    this.getPriceList(obj);
    this.getShopTotalNum();
  }

  /**
   * 购物车总的单选按钮
   * changes 事件一定是鼠标和键盘触发的，页面input的选中不是change事件
   * @param obj
   */
  allEle(obj) {
    if ($(obj).prop('checked')) {
      $(obj).parents("._padingBtm").find('._good').parents("._myPaddingBody").css('background', '#FFF4E8')   //点击的时候样式的变化
      $(obj).parents('._padingBtm').find("._store").prop("checked", true);
    } else {
      $(obj).parents("._padingBtm").find('._good').parents("._myPaddingBody").css('background', '#fff')   //点击的时候样式的变化
      $(obj).parents('._padingBtm').find("._store").prop("checked", false)
    }
    let target = $(obj).parents('._padingBtm').find("._store");
    this.storeEle(target);
    this.getPriceList(obj);
    this.getShopTotalNum();
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
  minusNum(obj, id) {
    $(obj).parents("._myPaddingBody").css('background', '#FFF4E8')   //点击的时候样式的变化
    $(obj).parents('._myPaddingBody').find("._good").prop("checked", true) //单选框被选中
    $(obj).parents('._myPaddingBody').find("._good").attr("checked", "checked") //单选框被选中,节点效果，计数用

    let num = $(obj).parents('.updateNum').find('input').val();//因为有可能点击到span或者是i所以找父级
    num--;
    if (num < 2) num = 1;
    $(obj).parents('.updateNum').find('input:first').val(num)

    let url = '/agent/agentCart/updateOneAgentCart'; //加减修改数据
    let data = {
      id: id,
      num: -1
    }
    this.stockManService.putData(url, data)

    this.getPriceList(obj);
    this.inputSelect(obj, '');
    this.getShopTotalNum();
    this.goodTotalPrice(obj);
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
  addNum(obj, id) {
    $(obj).parents("._myPaddingBody").css('background', '#FFF4E8')               //点击的时候样式的变化
    $(obj).parents('._myPaddingBody').find("._good").prop("checked", true)
    $(obj).parents('._myPaddingBody').find("._good").attr("checked", "checked") //增加节点，计数用

    let goodNum = $(obj).parents('.updateNum').find('input').val();                //因为有可能点击到span或者是i所以找父级

    goodNum++;
    let url = '/agent/agentCart/updateOneAgentCart'; //加减修改数据
    let data = {
      id: id,
      num: +1
    }
    this.stockManService.putData(url, data);
    $(obj).parents('.updateNum').find('input:first').val(goodNum)
    this.inputSelect(obj, '')
    this.getPriceList(obj)
    this.getShopTotalNum();
    this.goodTotalPrice(obj)
  }

  /**
   * 点击进行修改，并重新计价
   * 1.商品的按钮被选中
   * 2.重新计价
   * @param obj
   * @param storageNum  商品的库存数量 判断使用
   * @param id 商品的id 修改商品数量使用
   */
  updataNum(obj, id, storageNum) {
    $(obj).parents("._myPaddingBody").css('background', '#FFF4E8')   //点击的时候样式的变化
    $(obj).parents('._myPaddingBody').find("._good").prop("checked", true)
    $(obj).parents('._myPaddingBody').find("._good").attr("checked", "checked")   //增加节点。计数用
    let num = $(obj).parents('.input-group').find('input').val()
    // if (num > storageNum) num = storageNum;
    $(obj).parents('.updateNum').find('input:first').val(num)
    let url = '/agent/agentCart/updateAgentCart'; //输入框修改数据
    let data = {
      id: id,
      num: num
    }
    this.stockManService.putData(url, data);
    this.inputSelect(obj, '')
    this.getPriceList(obj)
    this.getShopTotalNum();
  }

  /**
   * 获取商品的小计
   * @param obj
   */
  goodTotalPrice(obj) {
    let price = $(obj).parents("._myPaddingBody").find('._batchPrice').text().slice(1);
    let num = $(obj).parents("._myPaddingBody").find('._num').val();
    let totalPrice = price * num;

    var trueNum=totalPrice.toFixed(2);
    $(obj).parents("._myPaddingBody").find('._goodTotalPrice').text(trueNum);
  }

  /**
   * 获取价格的列表
   * @param goodsCode
   * @param shopNum
   * @param obj  用来判断是否加遮罩
   */
  getPriceList(obj,target?) {
    let goodList = $("._good[checked='checked']").parents("._myPaddingBody");
    let strData: string = '';
    for (var i = 0; i < goodList.length; i++) {
      strData += $(goodList[i]).find("._agentCartId").val() + "," ;
    }
    let url = '/agent/agentCart/valuationAgentCart';
    let lastIndex=strData.lastIndexOf(',');
    let finalStrData=strData.slice(0,lastIndex);//把最后的，去掉
    this.strDataTemp=finalStrData;
    let data = {
      strData: finalStrData
    }
    if (data.strData) {  //只有有选中的商品才会执行
      let priceData=this.stockManService.putData(url, data);
      if(!priceData){//如果返回的是false，说明商品的状态不合法，这时候要刷新页面
        this.ngOnInit();//ngngOnInit  还是只是刷新的数据列表 总的按钮并没有取消掉
        $("._all").prop('checked',false);//手动取消掉
        $("._all").attr('checked',false);
      }else{
        this.priceList =priceData;//如果是真的话才进行赋值
        console.log("█ this.priceList ►►►",  this.priceList);
      }
    } else {  //没有选中默认为0
      this.goodTotalPrice(obj)
      this.priceList = {
        expressPrice: 0, //运费
        payment: 0,//带运费的总费用
        total: 0,//不带运费的总费用
      }
    }
    this.getShopTotalNum();
    let expressPrice = this.priceList['expressPrice'];
  }

  /**
   * 购买商品种类的数量  而不是件数的总量
   * 等页面渲染完成之后再做
   */
  getShopTotalNum() {
    setTimeout(()=>{
      let numArr = $("._good:checked");
      this.shopTotalNumber = numArr.length;
    },0)
  }

  /**
   * 点击结算的时候跳转的页面
   */
  linkOrderPage() {
    if(!this.strDataTemp){
      AppComponent.rzhAlt("info","请至少选择一种商品");
    }else{
      sessionStorage.setItem('cartId', this.strDataTemp);
      this.router.navigate(['/main/stockMan/order']);
    }
  }


  /**
   * keyUp  的时候检查输入的值
   */
  checkVal(obj){
    if(obj.value==''||obj.value==0){
      obj.value=1;
    }else{
      obj.value=Math.floor(obj.value);   //如果是小数，取整数
    }
  }

}
