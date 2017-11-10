import { Injectable } from '@angular/core';
import {isNullOrUndefined} from "util";
import {AppComponent} from "../../app.component";
import {AjaxService} from "../../core/services/ajax.service";
import {SubmitService} from "../../core/forms/submit.service";

@Injectable()
export class AfterSaleService {

  constructor(public ajax: AjaxService) { }

  /**
   *接单 成功返回 put
   * @param url
   * @param data
   */

  toAcceptWork(url,data){
    let result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        if(res.success){
          console.log("█ res ►►►",  res);
          result=res.data;
          AppComponent.rzhAlt("success",info);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   *拒单 成功返回 info
   * @param url
   * @param data
   */

  toRefuseWork(url,data){
    let result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        console.log("█ info ►►►",  info);
        if(res.success){
          result=res.info;
          AppComponent.rzhAlt("success",info);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   * 查询物流公司列表  get 成功不提示
   */
  public getBasicExpressList(url,data){
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        if(res.success){
          result=res.data;
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   * 根据订单编号获取订单详情
   * @param ordno
   * @returns {any}
   */
  public getOrderDetailByNO(url,data){
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async: false,
      success: (res) => {
        if (res.success) {
          result = res.data;
        } else {
          AppComponent.rzhAlt("error", '获取数据时' + res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }
}
