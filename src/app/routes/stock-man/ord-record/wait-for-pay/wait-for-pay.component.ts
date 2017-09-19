import { Component, OnInit } from '@angular/core';
import {OrdRecordComponent} from "../ord-record.component";

@Component({
  selector: 'app-wait-for-pay',
  templateUrl: './wait-for-pay.component.html',
  styleUrls: ['./wait-for-pay.component.scss']
})
export class WaitForPayComponent implements OnInit {

  constructor(private parentComp:OrdRecordComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 2
  }

}
