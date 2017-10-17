import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";

const swal = require('sweetalert');

@Injectable()
export class MessageInformService {

  constructor(private ajax: AjaxService) { }

  /**
   * get 请求   获取关联的商品
   * @param url
   * @param data
   * @returns {any}
   */
  linkGoods(url, data) {
    let me = this, result;
    me.ajax.get({
      url: url,
      data: data,
      async: false,
      success: (res) => {
        if(res.success){
          result=res.data;
        }else{
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    })
    return result;
  }

  /**
   * delete 请求
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  delRequest(requestUrl, requestDate) {
    this.ajax.del({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        if (res.success) {
          AppComponent.rzhAlt("success", res.info);
        } else {
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
  }

  /**
   * put 请求  成功有提示
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  updateproblem(requestUrl, requestDate, back?: boolean) {
    let result,me = this;
    this.ajax.put({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        if (res.success) {
          AppComponent.rzhAlt("success", res.info);
          result = res.info;
        } else {
          result = res.info;
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    })
    return result;
  }

}
