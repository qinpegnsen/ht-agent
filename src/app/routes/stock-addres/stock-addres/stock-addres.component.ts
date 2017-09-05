import { Component, OnInit } from '@angular/core';
import {Page} from "../../../core/page/page";
import {isNullOrUndefined} from "util";
import {StockAddresService} from "./stock-addres.service";
import {ActivatedRoute} from "@angular/router";
import {AjaxService} from "../../../core/services/ajax.service";

@Component({
  selector: 'app-stock-addres',
  templateUrl: './stock-addres.component.html',
  styleUrls: ['./stock-addres.component.scss'],
  providers:[StockAddresService]
})
export class StockAddresComponent implements OnInit {
  private queryId:number;//获取添加，修改的ID
  private addButton;//新增代理商收货地址按钮配置
  private updatebutton;//修改代理商收货地址按钮配置
  private deletebutton;//删除代理商收货地址按钮配置
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

  constructor(private ajax:AjaxService,private routeInfo:ActivatedRoute,private StockAddresService:StockAddresService) { }

  ngOnInit() {
    this.queryId = this.routeInfo.snapshot.queryParams['id'];
    //按钮配置
    this.addButton = {
      type:"add",
      text:"新增代理商收货地址",
      title:'新增代理商收货地址',
    };
    this.updatebutton = {
      type:"update",
      title:'编辑',
    };
    this.deletebutton = {
      type:"delete",
      title:'删除',
    };
    this.queryList()//获取代理商收货地址的列表
  }


  /**
   * 查询代理商收货地址列表信息
   * @param event
   */
  public queryList() {

    let data={level:1}
    let url= "/agent/agentAddr/queryAgentAllAddr";
    let result = this.StockAddresService.controlDatas(url,data);
    if(isNullOrUndefined(result)){

    }else{
      this.table.voList = result.data;
    }
    this.addres = new Page(this.table);
  }
}
