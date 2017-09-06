import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";
const swal = require('sweetalert');

@Injectable()
export class StockManService {

  constructor(private ajax: AjaxService) { }

  /**
   * 获取商品列表的数据
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
   *
   * @param url
   * @param data
   */
  sendCar(url,data){
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        if(res.success){
          sessionStorage.setItem('carNum', JSON.stringify(data.num)); //把商品的总数存储起来，在头部拿出
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
}
