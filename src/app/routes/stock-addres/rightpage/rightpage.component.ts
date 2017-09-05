import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../../core/settings/settings.service";
import {AjaxService} from "../../../core/services/ajax.service";
const swal = require('sweetalert');

@Component({
  selector: 'app-rightpage',
  templateUrl: './rightpage.component.html',
  styleUrls: ['./rightpage.component.scss']
})
export class RightpageComponent implements OnInit {
  private queryId:number;//获取添加，修改的ID
  private limitForm = {
    receiverName:'',
    areaCode: '',
    mobPhone: ''
  }


  // 构造 初始化
  constructor(public settings: SettingsService,private router:Router,private routeInfo:ActivatedRoute,private ajax:AjaxService) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    this.queryId = this.routeInfo.snapshot.queryParams['id'];
  }

  /**
   * 关闭取消右侧页面
   */
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
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
          'mobPhone': value.mobPhone
        },
        success: (res) => {
          if (res.success) {
            _this.router.navigate(['/main/limit'], {replaceUrl: true}); //路由跳转
            swal('添加页面元素提交成功！', '','success');
          } else {
            let errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
            swal(res.info, errorMsg, 'error');
          }
        },
        error: (data) => {
          swal('添加页面元素提交失败！', '','error');
        }
      })
    }
  }
}
