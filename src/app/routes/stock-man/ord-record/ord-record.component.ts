import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ord-record',
  templateUrl: './ord-record.component.html',
  styleUrls: ['./ord-record.component.scss']
})


export class OrdRecordComponent implements OnInit {
  public orderType: number = 1;
  constructor() { }

  ngOnInit() {
  }

}
