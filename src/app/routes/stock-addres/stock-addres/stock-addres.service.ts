import { Injectable } from '@angular/core';
import {Page} from "../../../core/page/page";
import {AjaxService} from "../../../core/services/ajax.service";
import {AppComponent} from "../../../app.component";

@Injectable()
export class StockAddresService {
  public addres:Page= new Page();
  public table = {
    curPage:1,
    lastPage:true,
    needCountQuery:false,
    optObject:null,
    optObjectList:null,
    pageSize:20,
    params:{},
    sortColumns:null,
    totalPage:1,
    totalRow:5,
    voList:[]
  }

  constructor(public ajax: AjaxService) { }


  /**
   * 查询代理商收货地址信息
   * @param url
   * @param data
   * @returns {any}
   */
  public controlDatas(url,data) {
    let me = this,result;
    me.ajax.get({
      url:url,
      data: data,
      async:false,
      success: (data) => {
        result = data;
      },
      error: (data) => {
        console.log("代理商收货地址信息");
      }
    });
    return result;
  }


  /**
   * 删除代理商信息
   * @param url
   * @param data
   */
  delCode(url,data) {
    this.ajax.del({
      url:url,
      data: data,
      async:false,
      success: (data) => {
        let info=data.info;
        if(data.success){
          AppComponent.rzhAlt("success",info);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        console.log('连接数据库失败');
      }
    });
  }

}
