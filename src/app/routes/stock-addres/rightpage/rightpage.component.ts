import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../../core/settings/settings.service";
import {AjaxService} from "../../../core/services/ajax.service";
import {StockAddresService} from "../stock-addres/stock-addres.service";
import {StockAddresComponent} from "../stock-addres/stock-addres.component";
import {PatternService} from "../../../core/forms/pattern.service";
const swal = require('sweetalert');

@Component({
  selector: 'app-rightpage',
  templateUrl: './rightpage.component.html',
  styleUrls: ['./rightpage.component.scss']
})
export class RightpageComponent implements OnInit {
  public queryId:number;//获取添加，修改的ID
  public source:string; //订单页面携带的数据
  public  staff= {
    areaCode:'',
    mobPhone:''
  }
  public organ={}
  public id;//获取代理商的id
  public limitForm = {
    receiverName:'',
    areaCode: '',
    mobPhone: '',
    telPhone:'',
    address:'',
    id:'',
    areaFullName:''
  }


  // 构造 初始化
  constructor(public settings: SettingsService,public router:Router,public routeInfo:ActivatedRoute,public ajax:AjaxService,public StockAddresComponent:StockAddresComponent,public patterns: PatternService) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    this.queryId = this.routeInfo.snapshot.queryParams['number'];
    this.source = this.routeInfo.snapshot.queryParams['source'];//订单页面携带的数据
    this.id = this.routeInfo.snapshot.queryParams['id'];

    if(this.queryId==2){
      this.loadAddres();
    }

  }

  /**
   * 关闭取消右侧页面
   */
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

  /**
   * 请求详细数据，并显示()
   */
  loadAddres(){
    if(typeof(this.id)) {
      this.ajax.get({
        url: '/agent/agentAddr/loadAgentAddrById',
        async: false, //同步请求
        data: {id: this.id},
        success: (res) => {
          this.limitForm = res.data;
        },
        error: (res) => {
          console.log("post limit error");
        }
      });
    };
  };

  //获取区域数据
  public getAreaData(area){
    let me = this;
    me.limitForm['areaCode'] = area.areaCode;
  };



  /**
   * 添加/修改
   * @param value 必填信息
   */
  addLimitList(value) {
    let _this = this;
    //添加页面元素列表
    if (_this.queryId == 1) {
      _this.ajax.post({
        url: '/agent/agentAddr/addAgentAddr',
        async: false,
        data: {
          'receiverName': _this.limitForm.receiverName,
          'areaCode':_this.limitForm.areaCode,
          'mobPhone': _this.limitForm.mobPhone,
          'telPhone':_this.limitForm.telPhone,
          'address':_this.limitForm.address
        },
        success: (res) => {
          if (res.success) {
            if(_this.source=='cart'){
              _this.router.navigate(['/main/stockMan/order'], {replaceUrl: false}); //路由跳转
            }else{
              _this.router.navigate(['/main/stockAddres'], {replaceUrl: true}); //路由跳转
            }
            swal('新增代理商收货地址提交成功！', '','success');
            _this.StockAddresComponent.queryList();//实现局部刷新
          } else {
            swal(res.info);
          }
        },
        error: (data) => {
          swal('新增代理商收货地址提交失败！', '','error');
        }
      })
    }
      else{
      _this.ajax.put({
        url: '/agent/agentAddr/updateAgentAddr',
        async: false,
        data: {
          'id':_this.id,
          'receiverName': _this.limitForm.receiverName,
          'areaCode':_this.limitForm.areaCode,
          'mobPhone': _this.limitForm.mobPhone,
          'telPhone':_this.limitForm.telPhone,
          'address':_this.limitForm.address
        },
        success: (res) => {
          if (res.success) {
            if(_this.source=='cart'){
              _this.router.navigate(['/main/stockMan/order'], {replaceUrl: false}); //路由跳转
            }else{
              _this.router.navigate(['/main/stockAddres'], {replaceUrl: true}); //路由跳转
            }
            swal('修改代理商收货地址提交成功！', '','success');
            _this.StockAddresComponent.queryList();//实现局部刷新
          } else {
            swal(res.info,'','error');
          }
        },
        error: (data) => {
          swal('修改代理商收货地址提交失败！', '','error');
        }
      })
    }
  }
}
