import {LayoutComponent} from '../layout/layout.component';
import {LoginComponent} from "./pages/login/login.component";
import {PagesComponent} from "./pages/pages/pages.component";
export const routes = [
  {
    path: 'main',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
      {path: 'stockMan', loadChildren: './stock-man/stock-man.module#StockManModule'},
      {path: 'sys-message', loadChildren: './sys-message/sys-message.module#sysMessageModule'},
      {path: 'shopOrder', loadChildren: './shopping-order/shopping-order.module#ShoppingOrderModule'},
      {path: 'stockAddres', loadChildren: './stock-addres/stock-addres.module#StockAddresModule'},
      {path: 'edit-pw', loadChildren: './edit-pw/edit-pw.module#EditPwModule'},
      {path: 'afterSale', loadChildren: './after-sale/after-sale.module#AfterSaleModule'},
      {path: 'agent-information', loadChildren: './agent-information/agent-information.module#AgentInformationModule'},
      {path: 'withdrawal', loadChildren: './withdrawal/withdrawal.module#WithdrawalModule'},
      {path: 'billingDetails', loadChildren: './billing-details/billing-details.module#BillingDetailsModule'},
      {path: 'redPacket', loadChildren: './red-packet/red-packet.module#RedPacketModule'}
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
  {path: '**', redirectTo: '/main/home'}

];
