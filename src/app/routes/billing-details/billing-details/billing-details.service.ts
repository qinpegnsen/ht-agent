import { Injectable } from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";

@Injectable()
export class BillingDetailsService {
  public ordnos;

  constructor(public ajax:AjaxService) { }

  queryMenuList(activePage, pageSize) {
    let infos = {};
    this.ajax.get({
      url: "/ord/queryAgentSettle",
      async: false,
      data: {
        curPage: activePage,
        pageSize: pageSize,
        ordno:this.ordnos
      },
      success: (data) => {
        infos = data.data;
      },
      error: (data) => {
        console.log('data', data);
      }
    });
    return infos;
  }

}
