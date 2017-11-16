import { Component, OnInit } from '@angular/core';
import {RedPacketService} from "../red-packet.service";

@Component({
  selector: 'app-red-packet-statics',
  templateUrl: './red-packet-statics.component.html',
  styleUrls: ['./red-packet-statics.component.scss']
})
export class RedPacketStaticsComponent implements OnInit {

  redPackStatic: any;                   //红包统计
  now: any;
  prev: any;
  optionPrev:any;                       //统计图的配置
  constructor(public redPacketService:RedPacketService) { }

  ngOnInit() {
    this.qeuryAll()
  }

  /**
   * 查询
   */
  qeuryAll() {
    let me = this;
    let url = "/statistical/agentIndex";
    let data = {
    }
    let result = this.redPacketService.getShopList(url, data);
    if(result){
      me.redPackStatic = result;
      me.now = me.redPackStatic.agentAllOrdList;
      me.prev = me.redPackStatic.agentDealOrdList;
      me.optionPrevInfo();
    }
  }

  /**
   * 绘制图表（私有）
   */
  private optionPrevInfo() {
    let _this = this;
    _this.optionPrev = {
      title: {
        text: '一月点击数统计',
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

}
