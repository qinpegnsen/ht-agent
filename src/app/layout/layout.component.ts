import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit,OnDestroy{
  private menuItems: any;
  private path;
  public carNum: number;
  public urlChange;                      //路由的变化，用来取消订阅

  constructor(private router: Router) {
    this.urlChange=this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event) => {
        this.path = event['url'];
      });

  }

  ngOnInit() {

  }

  /**
   * 取消订阅
   */
  ngOnDestroy(){
    this.urlChange.unsubscribe();
  }
}
