
const Home = {
    text: '主页',
    link: '/main/home',
    icon: 'icon-home'
};
const stockMan = {
  text: '进货管理',
  icon: 'fa fa-cubes',
  alert: '▼',
  submenu: [
    {
      text: '我要进货',
      link: '/main/stockMan/agentord'
    },
    {
      text: '进货记录',
      link: '/main/stockMan/ordRecord'
    }
  ]
};
const shopOrder = {
  text: '购物工单',
  link: '/main/shopOrder',
  icon: 'fa fa-file-text'
};
const afterSale = {
  text: '售后工单',
  link: '/main/afterSale',
  icon: 'icon-book-open'
};
const statistics = {
  text: '统计',
  link: '/main/statistics',
  icon: 'fa fa-line-chart'
};
const stockAddres = {
  text: '收货地址',
  link: '/main/stockAddres',
  icon: 'icon-location-pin'
};
const messageInform = {
  text: '系统消息',
  link: '/main/message-inform',
  icon: 'icon-bell'
};
export const menu = [
    Home,
    stockMan,
    shopOrder,
    afterSale,
    statistics,
    stockAddres,
    messageInform
];
