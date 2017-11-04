import { Injectable } from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";

@Injectable()
export class BillingDetailsService {

  constructor(private ajax:AjaxService) { }

  queryMenuList(activePage, pageSize) {
    let infos = {};
    this.ajax.get({
      url: "/limitMenu/listpage",
      async: false,
      data: {
        curPage: activePage,
        pageSize: pageSize,
      },
      success: (data) => {
        infos = data;
      },
      error: (data) => {
        console.log('data', data);
      }
    });
    return infos;
  }

}
