import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../core/settings/settings.service";
import {SubmitService} from "../../../core/forms/submit.service";
declare var $: any;
@Component({
  selector: 'app-edit-pw',
  templateUrl: './edit-pw.component.html',
  styleUrls: ['./edit-pw.component.scss']
})
export class EditPwComponent implements OnInit {

  constructor(public settings: SettingsService,private submitt: SubmitService) { }

  ngOnInit() {
  }

  //取消
  cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }
  //提交修改
  submita(res){
    console.log("res---",res);
      let url = '/admin/updatePwd';
      let data = {
        pwd:res.form.value.pwd,
        // comfirmPwd:res.form._value.comfirmPwd,
        oldpwd:res.form.value.oldpwd,
      }
      this.submitt.postRequest(url, data);
}
}
