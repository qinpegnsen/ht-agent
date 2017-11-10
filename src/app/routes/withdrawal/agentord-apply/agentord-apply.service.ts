import { Injectable } from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";
import {isNull} from "util";
import {Page} from "../../../core/page/page";

@Injectable()
export class AgentordApplyService {

  constructor(public ajax:AjaxService) { }

  /**
   * 获取提现申请的信息
   * @param url
   * @param data
   * @returns {any}
   */
  public controlDatas(url,data) {
    var result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          result= data.data;
        }
      },
      error: (data) => {
        console.log("提现记录列表信息获取失败");
      }
    });
    return result;
  }

}
