import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";


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
          console.log('111')
          AppComponent.rzhAlt("success",info);
          console.log('22')
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: (data) => {
        console.log(data)
      }
    });
    return result;
  }
}
