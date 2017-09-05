import { LayoutComponent } from '../layout/layout.component';
import {PagesComponent} from "./pages/pages/pages.component";
import {LoginComponent} from "./pages/login/login.component";
export const routes = [

    {
        path: 'main',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: '/main/home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'stockMan', loadChildren: './stock-man/stock-man.module#StockManModule'},
            {path: 'edit-pw', loadChildren: './edit-pw/edit-pw.module#EditPwModule'},
        ]
    },
    {
      path: 'pages',
      component: PagesComponent,
      children: [
        {path: '', redirectTo: '/main/home', pathMatch: 'full'},
        {path: 'login', component: LoginComponent}
      ]
    },
    // Not found
    { path: '**', redirectTo: '/main' }

];
