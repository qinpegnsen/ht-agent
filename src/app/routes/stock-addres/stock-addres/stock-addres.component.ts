import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-addres',
  templateUrl: './stock-addres.component.html',
  styleUrls: ['./stock-addres.component.scss']
})
export class StockAddresComponent implements OnInit {
  private addButton;//新增数据按钮配置

  constructor() { }

  ngOnInit() {
    //按钮配置
    this.addButton = {
      type:"add",
      text:"新增数据",
      title:'新增数据',
      size: 'xs'
    };
  }

}
