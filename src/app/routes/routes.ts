import { LayoutComponent } from '../layout/layout.component';
export const routes = [

    {
        path: 'main',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'stockMan', loadChildren: './stock-man/stock-man.module#StockManModule' },
            { path: 'stockAddres', loadChildren: './stock-addres/stock-addres.module#StockAddresModule' }
        ]
    },

    // Not found
    { path: '**', redirectTo: '/main' }

];
