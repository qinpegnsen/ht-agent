import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";


@Injectable()
export class StockManService {

  constructor(private ajax: AjaxService) { }

  /**
   * 获取商品列表的数据get  成功不带提示
   * @param url
   * @param data
   */
  getShopList(url,data){
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        let info=data.info;
        if(data.success){
          result=data.data;
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }

  /**
   * 根据编码获取支付的内容  然后利用内容生成二维码 因为要写遮罩，所以单独写了一个  成功不带提示
   * @param url
   * @param data
   */
  goPay(url,data){
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        let info=data.info;
        console.log("█ data ►►►",  data);
        if(data.success){
          result=data.data;
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }

  /**
   * 查看是否支付成功  成功带提示
   * @param url
   * @param data
   */
  isTrue(url,data){
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        console.log("█ data ►►►",  data);
        let info=data.info;
        if(data.success){

          result=data.data;
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }

  /**
   *添加到购物车数据post
   * @param url
   * @param data
   */
  sendCar(url,data){
    let result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        result=res.data;
        if(res.success){
          AppComponent.rzhAlt("success",info);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }

  /**
   *生成订单post
   * @param url
   * @param data
   */
  bornOrder(url,data){
    let result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        result=res.data;
        if(res.success){
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }

  /**
   * 删除del
   * @param url
   * @param data
   */
  deleteData(url,data){
    this.ajax.del({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        if(res.success){
          AppComponent.rzhAlt("success",info);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
  }

  /**
   * 修改put
   * @param url
   * @param data
   */
  putData(url,data){
    let result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        if(res.success){
          result=res.data;
          // AppComponent.rzhAlt("success",info);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }
}
