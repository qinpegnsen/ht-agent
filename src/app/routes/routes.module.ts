import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatorService } from '../core/translator/translator.service';
import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';

import { menu } from './menu';
import { routes } from './routes';
import {PagesModule} from "./pages/pages.module";
// import {CanLoadStockMan, Permissions} from "./stock-man/can-load-stock-man";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        PagesModule
    ],
    declarations: [],
    // providers: [CanLoadStockMan, Permissions],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {
    // constructor(public menuService: MenuService, tr: TranslatorService) {
    //     menuService.addMenu(menu);
    // }
}
