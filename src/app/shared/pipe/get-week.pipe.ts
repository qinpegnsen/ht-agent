import { Pipe, PipeTransform } from '@angular/core';
import {RzhtoolsService} from "../../core/services/rzhtools.service";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'getWeek'
})
export class GetWeekPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(isNullOrUndefined(value)) return null;
    else {
      let value = new Date();
      return RzhtoolsService.getWeek(value,'cn');
    }
  }

}
