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
  private queryId:number;//获取添加，修改的ID
  private  staff= {
    areaCode:'',
    mobPhone:''
  }
  private organ={}
  private id;//获取代理商的id
  private limitForm = {
    receiverName:'',
    areaCode: '',
    mobPhone: '',
    telPhone:'',
    address:'',
    id:'',
    areaFullName:''
  }


  // 构造 初始化
  constructor(public settings: SettingsService,private router:Router,private routeInfo:ActivatedRoute,private ajax:AjaxService,private StockAddresComponent:StockAddresComponent,private patterns: PatternService) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    this.queryId = this.routeInfo.snapshot.queryParams['number'];
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
          console.log(res)
          this.limitForm = res.data;
        },
        error: (res) => {
          console.log("post limit error");
        }
      });
    }
  }

  //获取区域数据
  private getAreaData(area){
    let me = this;
    me.limitForm['areaCode'] = area.areaCode;
  }



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
            _this.router.navigate(['/main/stockAddres'], {replaceUrl: true}); //路由跳转
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
            _this.router.navigate(['/main/stockAddres'], {replaceUrl: true}); //路由跳转
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
