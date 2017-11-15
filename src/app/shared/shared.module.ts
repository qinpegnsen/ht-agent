/**
 * Created by qinpengsen on 2017/9/5.
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { FlotDirective } from './directives/flot/flot.directive';
import { SparklineDirective } from './directives/sparkline/sparkline.directive';
import { EasypiechartDirective } from './directives/easypiechart/easypiechart.directive';
import { ColorsService } from './colors/colors.service';
import { CheckallDirective } from './directives/checkall/checkall.directive';
import { VectormapDirective } from './directives/vectormap/vectormap.directive';
import { NowDirective } from './directives/now/now.directive';
import { ScrollableDirective } from './directives/scrollable/scrollable.directive';
import { JqcloudDirective } from './directives/jqcloud/jqcloud.directive';
import {DataTableModule} from "./directives/ng2-datatable/DataTableModule";
import {StockManService} from "../routes/stock-man/stock-man.service";
import {SelectAreaModule} from "./directives/select-area/select-area.module";
import {HeaderComponent} from "../layout/header/header.component";
import {HomeComponent} from "../routes/home/home/home.component";
import {AccordionComponent, BsDatepickerModule} from "ngx-bootstrap";
import {FoueAreasModule} from "./directives/foue-areas/foue-areas.module";
import {HoverDirective} from "./hover/hover.directive";
import {SubstringPipe} from "./pipe/substring.pipe";
import {RzhButtonsModule} from "../routes/buttons/rzh-buttons.module";
import {StatePipe} from "./pipe/state.pipe";
import {RzhtoolsService} from "../core/services/rzhtools.service";
import {GetWeekPipe} from "./pipe/get-week.pipe";
import {AngularEchartsModule} from "ngx-echarts";
import {DataDictService} from "../core/services/data-dict.service";
import {PopoverModule} from "ngx-bootstrap";
import {StrJsonPipe} from "./pipe/str-json.pipe";
import {FileUploadModule} from "ng2-file-upload";
import {ImgUrlPipe} from "./pipe/img-url.pipe";
import {GetUidService} from "../core/services/get-uid.service";
import {DecimalTwoPipe} from "./pipe/decimal-two.pipe";

// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RzhButtonsModule,
    ButtonsModule.forRoot(),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot(),
    ToasterModule,
    DataTableModule,
    SelectAreaModule,
    FoueAreasModule,
    AngularEchartsModule,
    FileUploadModule,
  ],
  providers: [
    ColorsService,StockManService,HeaderComponent,AccordionComponent,RzhtoolsService,DataDictService,GetUidService
  ],
  declarations: [
    ImgUrlPipe,
    FlotDirective,
    SparklineDirective,
    EasypiechartDirective,
    CheckallDirective,
    VectormapDirective,
    NowDirective,
    ScrollableDirective,
    JqcloudDirective,
    HomeComponent,
    SubstringPipe,
    HoverDirective,
    StatePipe,
    GetWeekPipe,
    StrJsonPipe,
    DecimalTwoPipe,
  ],
  exports: [
    DecimalTwoPipe,
    ImgUrlPipe,
    FileUploadModule,
    StrJsonPipe,
    HoverDirective,
    SubstringPipe,
    DataTableModule,
    RzhButtonsModule,
    BsDatepickerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    AccordionModule,
    AlertModule,
    ButtonsModule,
    CarouselModule,
    CollapseModule,
    DatepickerModule,
    BsDropdownModule,
    ModalModule,
    PaginationModule,
    ProgressbarModule,
    RatingModule,
    TabsModule,
    TimepickerModule,
    TooltipModule,
    TypeaheadModule,
    ToasterModule,
    FlotDirective,
    PopoverModule,
    SparklineDirective,
    EasypiechartDirective,
    CheckallDirective,
    VectormapDirective,
    NowDirective,
    ScrollableDirective,
    JqcloudDirective,
    FoueAreasModule,
    SelectAreaModule,
    StatePipe,
    GetWeekPipe,
    AngularEchartsModule
  ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
