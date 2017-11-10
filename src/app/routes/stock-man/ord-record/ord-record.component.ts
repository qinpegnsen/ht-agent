import {Component, OnInit} from "@angular/core";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
import {Location} from "@angular/common";

defineLocale('cn', zhCn);

@Component({
  selector: 'app-ord-record',
  templateUrl: './ord-record.component.html',
  styleUrls: ['./ord-record.component.scss']
})

export class OrdRecordComponent implements OnInit {

  public orderType: number = 1;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(public location: Location) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat:"YYYY/MM/DD",
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
  }

  routeBack() {
    this.location.back()
  }

}
