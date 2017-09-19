import { Component, OnInit } from '@angular/core';
import {OrdRecordComponent} from "../ord-record.component";

@Component({
  selector: 'app-canceled',
  templateUrl: './canceled.component.html',
  styleUrls: ['./canceled.component.scss']
})
export class CanceledComponent implements OnInit {

  constructor(private parentComp:OrdRecordComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 6
  }

}
