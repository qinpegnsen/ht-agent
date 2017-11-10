import {Component, OnInit,ViewChild} from "@angular/core";
import {UserblockService} from "../sidebar/userblock/userblock.service";
import {SettingsService} from "../../core/settings/settings.service";
import {MenuService} from "../../core/menu/menu.service";
import {Router} from "@angular/router";
import {AjaxService} from "../../core/services/ajax.service";
import {CookieService} from "angular2-cookie/core";
import {AppComponent} from "../../app.component";
import {Page} from "../../core/page/page";
import {SubmitService} from "../../core/forms/submit.service";
const screenfull = require('screenfull');
const browser = require('jquery.browser');
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  public platformInfoData:any;                           //代理商系统消息的数据
  @ViewChild('fsbutton') fsbutton;
  navCollapsed = true;
  menuItems = [];
  isNavSearchVisible: boolean;

  constructor(public submitService:SubmitService,public menu: MenuService, public userblockService: UserblockService, public settings: SettingsService,
              public ajax: AjaxService, public router: Router, public cookieService: CookieService) {
    // 只显示指定的
    if (typeof menu.getMenu() !== 'undefined') this.menuItems = menu.getMenu();
  }


  /**
   * 初始化的时候获取购物车商品类型的总数
   */
  ngOnInit() {
    this.getShopTotal();
    this.queryNotify();
    setInterval(()=>{//每个5秒钟拉取一次消息数据
      this.queryNotify();
    },5000)
    this.isNavSearchVisible = false;
    if (browser.msie) { // 不支持ie
      this.fsbutton.nativeElement.style.display = 'none';
    }


    let me = this;
    // 初始化时检测当前路由与一级导航路由是否匹配，匹配则为一级导航添加激活状态
    $(function () {
      let rulHref = window.location.href, host = window.location.host;
      let path = rulHref.substring(rulHref.indexOf(host)).substring(host.length);
      me.onRouterChange(path);
      me.getSubmenus(path);
    })
  }

  /**
   * 获取通知的消息列表，默认只展示第一页的内容
   */
  queryNotify(){
    let url='/notifyAgent/queryNotifyAgent';
    let data={
      curPage:1,
      pageSize:3,
      sortColumns:''
    };
    this.platformInfoData=new Page(this.submitService.getData(url,data));
  }

  /**
   * 消息弹框点击直接跳转到传过来的url页面
   */
  linkDetail(detailUrl){
    let url=$.trim(detailUrl);
    this.router.navigateByUrl(url);
  }

  /**
   * 获取商品类型的总数
   * 1.这里值改变了，但是页面没有刷新，可以把值保存到服务上，在绑定服务来解决
   */
  getShopTotal(){
    let me = this;
    this.ajax.get({
      url: "/agent/agentCart/countAgentCart",
      async:false,
      success: (result) => {
        let info=result.info;
        if (result.success) {
          me.settings.carNumber=result.data;
        }else{
          AppComponent.rzhAlt("error",info)
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
  }


  /**
   * 点击的时候展现购物车页面
   */
  showCarPage(){
    this.router.navigate(['/main/stockMan/cart'], {replaceUrl: true});
  }

  /**
   * 检测当前路由与一级导航路由是否匹配，匹配则为一级导航添加激活状态
   * @param path
   */
  private onRouterChange(path) {
    let firstNavs = $('.my-nav');
    for (let i = 0; i < firstNavs.length; i++) {
      let firstNav = firstNavs.eq(i).attr('route');
      if (path.indexOf(firstNav) === 0) {
        firstNavs.eq(i).addClass('current').parent().siblings().children('.my-nav').removeClass('current');
        return;
      }
    }
    ;
  }

  //显示、隐藏当前登录的用户信息
  toggleUserBlock(event) {
    event.preventDefault();
    this.userblockService.toggleVisibility();
  }

  //开启全局搜索
  openNavSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setNavSearchVisible(true);
  }

  setNavSearchVisible(stat: boolean) {
    // console.log(stat);
    this.isNavSearchVisible = stat;
  }

  getNavSearchVisible() {
    return this.isNavSearchVisible;
  }

  toggleOffsidebar() {
    this.settings.layout.offsidebarOpen = !this.settings.layout.offsidebarOpen;
  }

  //显示隐藏侧边栏
  toggleCollapsedSideabar() {
    this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
  }

  isCollapsedText() {
    return this.settings.layout.isCollapsedText;
  }

  //全屏
  toggleFullScreen(event) {
    if (screenfull.enabled) screenfull.toggle();
    let el = $(this.fsbutton.nativeElement);
    if (screenfull.isFullscreen) {
      el.children('em').removeClass('fa-expand').addClass('fa-compress');
    }
    else {
      el.children('em').removeClass('fa-compress').addClass('fa-expand');
    }
  }

  /**
   * 退出登录
   */
  logout() {
    localStorage.clear(); //清空所有storage
    this.cookieService.removeAll(); //清空所有cookie
    this.ajax.get({
      url: "/login/logout",
      success: (result) => {
        if (result.success) {
          this.router.navigate(['/pages/login'], {replaceUrl: true});
        }
      }
    });
  }

  /**
   * 为子菜单赋值，通过父组件（layout）的方法来给同级的组件（sidebar）传值，所以这里把子菜单传给了父组件（layout）的方法
   *
   * @param text
   */
  getSubmenus(link) {
    // let menus = this.menu.getSubMenu(link);
    // this.layout.submenus(menus)
  }

}
