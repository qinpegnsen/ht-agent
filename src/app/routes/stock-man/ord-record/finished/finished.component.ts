import { Component, OnInit } from '@angular/core';
import {OrdRecordComponent} from "../ord-record.component";

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class FinishedComponent implements OnInit {

  constructor(private parentComp:OrdRecordComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 5
  }

}
