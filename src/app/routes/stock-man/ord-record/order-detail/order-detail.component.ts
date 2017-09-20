import { Component, OnInit } from '@angular/core';
import {OrdRecordComponent} from "../ord-record.component";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  constructor() { }

  ngOnInit() {

  }

  showTimeList(target){
    target.style.display = 'block';
  }
  hideTimesList(target){
    target.style.display = 'none';
  }
}


