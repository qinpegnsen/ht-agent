import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {SubmitService} from "../../../../core/forms/submit.service";
import {OrdRecordComponent} from "../ord-record.component";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {StockManService} from "../../stock-man.service";
const swal = require('sweetalert');

@Component({
  selector: 'app-wait-for-receive',
  templateUrl: './wait-for-receive.component.html',
  styleUrls: ['./wait-for-receive.component.scss']
})
export class WaitForReceiveComponent implements OnInit {

  public LogisticsData;                                   //获取物流的信息

  public goodsList: Page = new Page();
  constructor(
    private submit: SubmitService,
    private parentComp:OrdRecordComponent,
    public stockManService: StockManService
  ) { }

  /**
   * 1.设置当前点击的颜色
   * 2.获取当前状态的列表
   */
  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 5;
    me.queryDatas()
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    }
    let requestUrl = ' /agentOrd/queryAgentState';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      state: 'DELIVERY',
    };
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
  }

  /**
   * 显示买家信息
   * @param event
   * @param i
   */
  showUserInfo(i){
    i.style.display = 'block';
  }

  /**
   * 隐藏买家信息
   * @param i
   */
  hideBuyerInfo(i){
    i.style.display = 'none';
  }


  /**
   *显示物流信息
   * @param orderId
   */
  showLogistics(Logistics){
    console.log("█ 1 ►►►",  1);
    Logistics.style.display = 'block';
    let url='/ord/tail/queryDeliveryList';
    let data={
      ordno:'1234123451235'                //目前是写死的，以后再改
    };
    this.LogisticsData=this.stockManService.getShopList(url,data);
    console.log("█ this.LogisticsData ►►►",  this.LogisticsData);
  }

  /**
   *隐藏物流信息
   * @param orderId
   */
  hideLogistics(Logistics){
    Logistics.style.display = 'none';
  }

  /**
   * json 转 object
   * @param val
   */
  jsonToObject(val:string){
    return RzhtoolsService.jsonToObject(val);
  }

  /**
   * 确认收货
   */
  confirmRecive(ordno) {
    let that=this;
    swal({
        title: '您确认收到货了吗？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        let url = '/agentOrd/updateStateToSuccess';
        let data = {
          ordno: ordno
        }
        that.stockManService.delAgentOrd(url, data);
        that.queryDatas();
      }
    );
  }

}
