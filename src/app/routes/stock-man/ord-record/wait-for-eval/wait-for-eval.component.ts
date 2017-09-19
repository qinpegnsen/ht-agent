import { Component, OnInit } from '@angular/core';
import {OrdRecordComponent} from "../ord-record.component";

@Component({
  selector: 'app-wait-for-eval',
  templateUrl: './wait-for-eval.component.html',
  styleUrls: ['./wait-for-eval.component.scss']
})
export class WaitForEvalComponent implements OnInit {

  constructor(private parentComp:OrdRecordComponent
) { }

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 4
  }

}
