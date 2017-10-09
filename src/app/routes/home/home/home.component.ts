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
  yesterdaySale: any = new Date();

  private data: any;
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
    }

  /**
   * 绘制图表（私有）
   */
  private optionPrevInfo() {
    let _this = this;
    console.log("█ .prev ►►►", _this.prev);
    _this.optionPrev = {
      title: {
        text: '新增会员统计',
        left:"46%"
      },
      legend: {
        data: ['今天', '昨天'],
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
          data: _this.prev.keys,
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
          name: '今天',
          type: 'bar',
          barWidth: '30%',
          data: _this.prev.yaxis
        },
        {
          name:'昨天' ,
          type: 'bar',
          barWidth: '30%',
          data: _this.now.yaxis
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
      me.now = me.data.todaySale;
      me.prev = me.data.yesterdaySale;
      me.optionPrevInfo();
    }
  }
}
