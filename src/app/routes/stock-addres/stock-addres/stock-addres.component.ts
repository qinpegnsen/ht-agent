import { Component, OnInit } from '@angular/core';
import {Page} from "../../../core/page/page";
import {isNullOrUndefined} from "util";
import {StockAddresService} from "./stock-addres.service";
import {ActivatedRoute} from "@angular/router";
import {AjaxService} from "../../../core/services/ajax.service";
const swal = require('sweetalert');

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
  private id;//获取删除时需要的id
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
    this.queryId = this.routeInfo.snapshot.queryParams['ids'];
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


  /**
   * 删除代理商信息
   * @param event
   */
  delete(id) {
    let _this = this, url: string = "/agent/agentAddr/deleteAgentAddrById", data: any;
    swal({
        title: '确认删除此信息？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        data = {
          id:id
        }
        console.log(data)
        _this.StockAddresService.delCode(url, data); //删除数据
        let datas={id:id}
        let urls= "/agent/pageQuery";
        _this.StockAddresService.controlDatas(urls,datas);//实现局部刷新
      }
    );
  }

  /**
   * 设为默认地址
   */
  upFiledateState(data) {
    if (data.isDefault == "Y") {
      data.isDefault = "N"
    } else if (data.isDefault == "N") {
      data.isDefault = "Y"
    }
    this.ajax.put({
      url: '/agent/agentAddr/updateIsDefaultById',
      data: {
        'id': data.id
      },
      success: () => {
        if (data.isDefault == "Y") {
          swal('成功设为默认地址', '', 'success');
        } else if (data.isDefault == "N") {
          swal('已将默认地址取消', '', 'success');
        }
        this.queryList()
      },
      error: (data) => {
        swal('设置默认地址失败', 'error');
      }
    });
  }
}
