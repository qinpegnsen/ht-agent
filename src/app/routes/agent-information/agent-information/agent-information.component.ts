import {Component, OnInit} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {SettingsService} from "../../../core/settings/settings.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PatternService} from "../../../core/forms/pattern.service";
import {AjaxService} from "../../../core/services/ajax.service";
import {isNullOrUndefined} from "util";
import {GetUidService} from "../../../core/services/get-uid.service";
import {AppComponent} from "../../../app.component";
import {SubmitService} from "../../../core/forms/submit.service";
import {UserblockComponent} from "../../../layout/sidebar/userblock/userblock.component";
const swal = require('sweetalert');
declare var $: any;
declare var AMap: any;
const uploadUrl = "/upload/basic/afterUploadRetHttpURL";  //图片上传路径(调取上传的接口)

@Component({
  selector: 'app-agent-information',
  templateUrl: './agent-information.component.html',
  styleUrls: ['./agent-information.component.scss']
})
export class AgentInformationComponent implements OnInit {
  public flag: boolean = false;//修改经纬度按钮的显示
  public uploader: FileUploader = new FileUploader({
    url: uploadUrl,
    itemAlias: "limitFile",
    allowedFileType:["image"]
  }); //初始化上传方法
  public linkType: string;
  public uid;//声明保存获取到的暗码
  public agentCode: string;//获取代理商编码
  public staff: any = {};
  public aa = false;
  public placeSearch: any;
  public code: any;
  public selectArea;
  public myImg: any;
  public maps:string='';//修改经纬度按钮的显示

  constructor(public GetUidService: GetUidService, public userblockComponent: UserblockComponent, public submitService: SubmitService, public settings: SettingsService, public ajax: AjaxService, public router: Router, public routeInfo: ActivatedRoute, public patterns: PatternService) {
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
        keyboardEnable: false
      });

      AMap.service('AMap.PlaceSearch', function () {//回调函数
        //实例化PlaceSearch
        me.placeSearch = new AMap.PlaceSearch();
        //TODO: 使用pla ceSearch对象调用关键字搜索的功能
        me.placeSearch.search(me.selectArea, function (status, result) {
          let lng, lat;
          lng = me.staff.coordinateLng;
          lat = me.staff.coordinateLat;
          /* lat = result.poiList.pois[0].location.lat;
           lng = result.poiList.pois[0].location.lng;*/
          map.setCenter(new AMap.LngLat(lng, lat));
        });
      })

      //设置监听，获取地图经纬度
      var clickEventListener = map.on('click', function (e) {
        me.staff.coordinateLng = e.lnglat.getLng();//经度
        me.staff.coordinateLat = e.lnglat.getLat();//纬度
        me.maps=me.staff.coordinateLng+','+me.staff.coordinateLat;
      });

      var marker = new AMap.Marker({
        map: map,
        bubble: true
      })

      /**
       * 点击出来标注点
       */
      map.on('click', function (e) {
        marker.setPosition(e.lnglat);
      })
      AMap.plugin('AMap.Geocoder', function () {
        var drving = new AMap.Geocoder({
          map: map
        })
        drving.search([
          {keyword: '北京西站', city: '北京'}
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

    }, 1);


    let collection = JSON.parse(localStorage.getItem('loginInfo'));

    this.code = collection.agentCode;


    /**
     * 请求代理商详细数据，并显示()
     */
    this.ajax.get({
      url: '/agent/loadByAgentCode',
      async: false, //同步请求
      data: {agentCode: this.agentCode},
      success: (res) => {
        this.staff = res.data;
        this.maps=this.staff.coordinateLng + ',' + this.staff.coordinateLat;
        if (isNullOrUndefined(this.staff)) this.staff = {}
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
  isShowMap(data?: any) {
    data.isShowMap = !data.isShowMap;
    this.aa = !this.aa;
  }

  isShowMap1() {
    this.aa = !this.aa;
  }

  /**
   * 显示/隐藏 修改经纬度的按钮
   * @param data
   */
  buttonShow(data: any) {
    data.isShowMap = !data.isShowMap;
    this.flag = true;
    // console.log(this.flag)
  }

  /**
   * 关闭右侧滑动页面
   */
  cancel() {
    this.router.navigate(['/main/agent/agentperson']);
  }

  //获取区域数据
  public getAreaData(area) {
    let me = this;
    me.staff['areaCode'] = area.areaCode;
    me.selectArea = area.adr;
    me.ngOnInit()
  }

  /**
   * 监听图片选择
   * @param $event
   */
  fileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.uploader.queue.length > 1) this.uploader.queue[0].remove();
    this.myImg = true;  //表示已经选了图片
  }


  /**
   * 图片上传
   */
  uploadImg(value) {
    let me = this;

    /**
     * 构建form时，传入自定义参数
     * @param item
     */

    me.uploader.onBuildItemForm = function (fileItem, form) {
      // let uuid = me.GetUidService.getUid();
      // console.log("█ uuid ►►►", uuid);
      // form.append('uuid', uuid);
      // me.uuid = uuid;
    };

    /**
     * 执行上传
     */
    me.uploader.uploadAll();

    /**
     * 上传成功处理
     * @param item 上传列表
     * @param response 返回信息
     * @param status 状态
     * @param headers 头信息
     */
    me.uploader.onSuccessItem = function (item, response, status, headers) {
      let res = JSON.parse(response);
      if (res.success) {
        let avatar=res.data;
        me.settings.user.picture = avatar;
        localStorage.avatar = avatar;
        let url = '/agent/updateAvatar';
        let data = {
          avatar: avatar,
          agentCode: me.code
        };
         me.submitService.getData(url, data);

        me.userblockComponent.ngOnInit();
      } else {
        AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
      }
    };


    /**
     * 上传失败处理
     * @param item 上传列表
     * @param response 返回信息
     * @param status 状态
     * @param headers 头信息
     */
    me.uploader.onErrorItem = function (item, response, status, headers) {
    };
  }

  addLimitList(value) {
    this.uploadImg(value);
    this.upateInfo(value);
  }

  upateInfo(value?) {
    let _this = this;
    _this.ajax.put({
      url: '/agent/updateAgentBasic',
      data: {
        'agentCode': _this.code,
        'agentName': value.agentName,
        'agentLevel': value.agentLevel,
        'agentAcct': value.agentAcct,
        'agentPwd': value.agentPwd,
        'leader': value.leader,
        'moblie': value.moblie,
        'idcard': value.idcard,
        'telephone': value.telephone,
        'areaCode': value.areaCode,
        'address': value.address,
        'coordinateLngStr': this.maps,
        'description': value.description,
      },
      success: (res) => {
        // console.log(res)
        if (res.success) {
          _this.router.navigate(['/main/agent-information'], {replaceUrl: true});   //路由跳转
          swal('修改信息成功！', '', 'success');
          _this.userblockComponent.ngOnInit();
        } else {
          swal(res.info, '', 'error');
        }
      },
      error: (data) => {
        swal('修改信息失败！', '', 'error');
      }
    });
  }
}
