
const Home = {
    text: '主页',
    link: '/main/home',
    icon: 'icon-home'
};
const headingMain = {
  text: 'Main Navigation',
  heading: true
};
const stockMan = {
  text: '进货管理',
  link: '/main/stockMan',
  icon: 'fa fa-users',
  submenu: [
    {
      text: '我要进货',
      icon: 'fa fa-area-chart',
      link: '/main/stockMan/agentord'
    },
    {
      text: '进货记录',
      icon: 'fa fa-book',
      link: '/main/stockMan/ordRecord'
    }
  ]
};
const shopOrder = {
  text: '购物工单',
  link: '/main/shopOrder',
  icon: 'fa fa-users'
};
const afterSale = {
  text: '售后工单',
  link: '/main/afterSale',
  icon: 'fa fa-users'
};
const statistics = {
  text: '统计',
  link: '/main/statistics',
  icon: 'fa fa-users'
};
const stockAddres = {
  text: '收货地址',
  link: '/main/stockAddres',
  icon: 'fa fa-users'
};
export const menu = [
    headingMain,
    Home,
    stockMan,
    shopOrder,
    afterSale,
    statistics,
    stockAddres
];
