/**
 * Created by qinpengsen on 2017/9/5.
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SettingsService } from './settings/settings.service';
import { ThemesService } from './themes/themes.service';
import { TranslatorService } from './translator/translator.service';
import { MenuService } from './menu/menu.service';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {AjaxService} from "./services/ajax.service";
import {MaskService} from "./services/mask.service";
import {SubmitService} from "./forms/submit.service";
import {PatternService} from "./forms/pattern.service";

@NgModule({
  imports: [
  ],
  providers: [
    SettingsService,
    ThemesService,
    TranslatorService,
    MenuService,
    AjaxService,
    MaskService,
    SubmitService,
    PatternService
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
