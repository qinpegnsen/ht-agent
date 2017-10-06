import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {SettingsService} from "../../../core/settings/settings.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PatternService} from "../../../core/forms/pattern.service";
import {AjaxService} from "../../../core/services/ajax.service";
import {isNullOrUndefined} from "util";
const swal = require('sweetalert');
declare var $:any;
declare var AMap:any;
const uploadUrl = "upload/basic/upload";  //图片上传路径(调取上传的接口)

@Component({
  selector: 'app-agent-information',
  templateUrl: './agent-information.component.html',
  styleUrls: ['./agent-information.component.scss']
})
export class AgentInformationComponent implements OnInit {
  public flag:boolean=false;//修改经纬度按钮的显示
  public uploader:FileUploader = new FileUploader({
    url: uploadUrl,
    itemAlias:"limitFile",
    queueLimit: 1
  }); //初始化上传方法
  public linkType:string;
  private uid;//声明保存获取到的暗码
  public agentCode:string;//获取代理商编码
  private staff:any = {};
  private aa = false;
  private placeSearch: any;

  constructor(public settings:SettingsService, private ajax:AjaxService, private router:Router, private routeInfo:ActivatedRoute,private patterns: PatternService) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    let me = this;
    //页面完成后加载地图
    setTimeout(() => {
      //实例化地图
      let map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 13,//地图显示的缩放级别
        center: [116.397428, 39.90923],
        keyboardEnable: false
      });

      AMap.service('AMap.PlaceSearch',function(){//回调函数
        //实例化PlaceSearch
        me.placeSearch= new AMap.PlaceSearch();
        //TODO: 使用placeSearch对象调用关键字搜索的功能
        me.placeSearch.search('郑州金水区', function(status, result) {
          let lat = result.poiList.pois[0].location.lat;
          let lng = result.poiList.pois[0].location.lng;
          map.setCenter(new AMap.LngLat(lng, lat));
        });
      })

      AMap.plugin('AMap.Geocoder',function(){
        var drving = new AMap.Geocoder({
          map:map
        })
        drving.search([
          {keyword:'北京西站',city:'北京'}
        ]);
      })

      // 搜索定位
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
        //实例化Autocomplete
        var autoOptions = {
          city: "", //城市，默认全国
          input: "keyword"//搜索框id
        };
        let autocomplete = new AMap.Autocomplete(autoOptions); //实例化搜索组件
        //包装搜索条件
        let placeSearch = new AMap.PlaceSearch({
          city: '北京', //默认北京
          map: map
        })
        //设置收拾条件（选择时，重置搜索地址信息）
        AMap.event.addListener(autocomplete, "select", function (e) {
          placeSearch.search(e.poi.name)
        });
      })

      //设置监听，获取地图经纬度
      var clickEventListener = map.on('click', function (e) {
        me.staff.coordinateLng = e.lnglat.getLng();//经度
        me.staff.coordinateLat = e.lnglat.getLat();//纬度
      });

    }, 1);

    me.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数
    me.agentCode = this.routeInfo.snapshot.queryParams['agentCode'];//获取代理商的编码



    /**
     * 请求代理商详细数据，并显示()
     */
      this.ajax.get({
        url: '/agent/loadByAgentCode',
        async: false, //同步请求
        data: {agentCode: this.agentCode},
        success: (res) => {
          console.log("█ res ►►►",  res);

          this.staff = res.data;
          if(isNullOrUndefined(this.staff)) this.staff = {}
        },
        error: (res) => {
          console.log("post limit error");
        }
      });
    }

  /**
   * 显示/隐藏地图
   * @param data
   */
  isShowMap(data?:any) {
    data.isShowMap = !data.isShowMap;
    this.aa=!this.aa;
  }
  isShowMap1(){
    this.aa=!this.aa;
  }
  /**
   * 显示/隐藏 修改经纬度的按钮
   * @param data
   */
  buttonShow(data:any) {
    data.isShowMap = !data.isShowMap;
    this.flag=true;
    console.log(this.flag)
  }

  /**
   * 关闭右侧滑动页面
   */
  cancel() {
    this.router.navigate(['/main/agent/agentperson']);
  }

  //获取区域数据
  private getAreaData(area){
    let me = this;
    me.staff['areaCode'] = area.areaCode;
  }

  addLimitList(value) {
    let _this = this;
      _this.ajax.put({
        url: '/agent/updateAgentBasic',
        data: {
          'agentCode':_this.agentCode,
          'agentName': value.agentName,
          'agentLevel': value.agentLevel,
          'agentAcct': value.agentAcct,
          'agentPwd': value.agentPwd,
          'leader': value.leader,
          'moblie': value.moblie,
          'idcard': value.idcard,
          'telephone':value.telephone,
          /* 'idcardImage1uuid': value.idcardImage1uuid,
           'idcardImage2uuid': value.idcardImage2uuid,*/
          'areaCode': value.areaCode,
          'address': value.address,
          'coordinateLng': value.coordinateLng,
          'coordinateLat': value.coordinateLat,
          'description': value.description,
        },
        success: (res) => {
          console.log(res)
          if (res.success) {
            _this.router.navigate(['/main/agent/agentperson'], {replaceUrl: true});   //路由跳转
            swal('修改区域信息成功！', '', 'success');
          } else {
            swal(res.info, '','error');
          }
        },
        error: (data) => {
          swal('修改区域信息失败！', '', 'error');
        }
      });
    }

}
