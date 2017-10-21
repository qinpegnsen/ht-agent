import { Injectable } from '@angular/core';
import {AjaxService} from "./ajax.service";
import {AppComponent} from "../../app.component";

@Injectable()
export class DataDictService {

  constructor(public ajax: AjaxService) { }

  /**
   * 根据字典编码查询字典val对应info
   */
  public getInfo(url,data) {
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
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }
}
