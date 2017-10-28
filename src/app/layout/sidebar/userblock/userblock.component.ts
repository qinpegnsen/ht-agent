import {Component, DoCheck, OnInit} from '@angular/core';

import { UserblockService } from './userblock.service';
import {SettingsService} from "../../../core/settings/settings.service";

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit ,DoCheck{
    user: any;
  avatar: any;
  constructor(public userblockService: UserblockService, private setting: SettingsService) {
    this.user = this.setting.user;
  }
    ngOnInit() {

      let picture=localStorage.getItem('avatar')
      // if(picture){
      //   console.log("█ 111 ►►►",  111);
      //
        this.avatar=picture;
      // }else{
        this.user = this.setting.user;
      // }
      // console.log("█ avatar ►►►",  avatar);
      //
      console.log("█ this.user ►►►",  this.user);

    }
    ngDoCheck(){
      let picture=localStorage.getItem('avatar')
      this.avatar=picture;
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}
