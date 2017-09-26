import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";
@Injectable()
export class ShoppingOrderService {

  constructor(private ajax: AjaxService) { }

  /**
   *接单拒单 成功返回 put
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
          result=res.data;
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

}
