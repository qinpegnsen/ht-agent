import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {SettingsService} from "../../../core/settings/settings.service";
import {isNullOrUndefined} from "util";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public flag: boolean = true;//定义boolean值用来控制内容组件是否显示
  bsConfig: Partial<BsDatepickerConfig>;
  select: any = {}; //选择的年份和月份信息

  private queryType: any = 'DAY';//日期选择
  private queryTypes: any;//日期选择
  todaySale: any = new Date();
  agentAllOrdList: any = new Date();
  agentDealOrdList: any = new Date();

  private data: any;
  private tel:any;
  private address:any
  now: any;
  prev: any;


  /**
   * 图表1
   */
  public optionPrev = {};

    constructor(private submit:SubmitService, private tools: RzhtoolsService) {

    }

    ngOnInit() {
      let _this = this;
      _this.queryTypes = this.tools.getEnumDataList('1401');   //时间状态枚举列表
      _this.todaySale = RzhtoolsService.dataFormat(RzhtoolsService.getAroundDateByDate(new Date(this.todaySale), 0), 'yyyy-MM-dd');
     this.qeuryAll();
     this.infoByTypeCode();
     this.dressByTypeCode();
    }

  /**
   * 绘制图表（私有）
   */
  private optionPrevInfo() {
    let _this = this;
    _this.optionPrev = {
      title: {
        text: '平台派单统计',
        left:"46%"
      },
      legend: {
        data: ['派单', '接单'],
        align: 'left',
        left:"46%",
        top:"10%",
        bottom:"10%"
      },
      color: ['#3398DB', '#42DBB1'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        right:"3%",
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: _this.now.keys,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '派单',
          type: 'bar',
          barWidth: '30%',
          data: _this.now.yaxis
        },
        {
          name:'接单' ,
          type: 'bar',
          barWidth: '30%',
          data: _this.prev.yaxis
        }
      ]
    };
  }
  /**
   * 查询
   */
  qeuryAll() {
    let me = this;
    let url = "/statistical/agentIndex";
    let data = {
    }
    let result = this.submit.getData(url, data);
    if(result){
      me.data = result;
      me.now = me.data.agentAllOrdList;
      me.prev = me.data.agentDealOrdList;
      me.optionPrevInfo();
    }
  }

  /**
   * 获取平台信息
   */

  infoByTypeCode() {
    let url = "/datadict/loadDatadictByCode";//电话
    let data = {
      code: "plat_basic_info_phone_by_agent"
    }
    this.tel= this.submit.getData(url, data);
  }
  dressByTypeCode() {
    let url = "/datadict/loadDatadictByCode";//地址
    let data = {
      code: "plat_basic_info_address_by_agent"
    }
    this.address= this.submit.getData(url, data);
  }
}
