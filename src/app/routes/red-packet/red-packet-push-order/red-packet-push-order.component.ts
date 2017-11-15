import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {Page} from "../../../core/page/page";
import {RedPacketService} from "../red-packet.service";

@Component({
  selector: 'app-red-packet-push-order',
  templateUrl: './red-packet-push-order.component.html',
  styleUrls: ['./red-packet-push-order.component.scss']
})
export class RedPacketPushOrderComponent implements OnInit {

  public data:any                   //红包投放记录的数据
  constructor(public redPacketService:RedPacketService ) { }

  ngOnInit() {
    this.qeuryAll(1)
  }

  /**
   * 红包规则列表
   */
  qeuryAll(curPage,event?: PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    };
    let url = "/rpSetting/queryRpSettingAdmin";
    let data={
      curPage: activePage,
      pageSize:10,
      isUsed:'',
    };
    // let result = this.redPacketService.getShopList(url,data);
    // me.data = new Page(result);
  }

}
