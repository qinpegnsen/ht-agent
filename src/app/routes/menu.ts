
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
const withdrawal = {
  text: '提现管理',
  icon: 'fa fa-money',
  alert: '▼',
  submenu: [
    {
      text: '提现记录',
      link: '/main/withdrawal/agentord-record'
    },
    {
      text: '我要提现',
      link: '/main/withdrawal/agentord-apply'
    }
  ]
};

const billingDetails = {
  text: '账单明细',
  link: '/main/billingDetails',
  icon: 'icon-book-open'
};

const sysMessage = {
  text: '系统消息',
  link: '/main/sys-message',
  icon: 'icon-book-open'
};
export const menu = [
    Home,
    stockMan,
    shopOrder,
    afterSale,
    statistics,
    stockAddres,
    withdrawal,
   billingDetails,
    sysMessage

];
