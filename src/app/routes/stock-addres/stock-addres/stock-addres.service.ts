import { Injectable } from '@angular/core';
import {Page} from "../../../core/page/page";
import {AjaxService} from "../../../core/services/ajax.service";

@Injectable()
export class StockAddresService {
  private addres:Page= new Page();
  private table = {
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

  constructor(private ajax: AjaxService) { }


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

}
