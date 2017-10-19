const bb = 'http://192.168.10.178:';  //伯白
const br = 'http://192.168.10.110:';  //伯融
const sz = 'http://192.168.10.112:';  //尚泽
const sg = 'http://192.168.10.111:';  //善谷
const zyg = 'http://192.168.10.167:'; //张阳光
const gh = 'http://192.168.10.109:';  //高辉
const wp = 'http://192.168.10.182:';  //万鹏


/**
 * Created by qinpengsen on 2017/9/4.
 */
const PROXY_CONFIG = [
  {
    context: [
      "/goodsQuery",
      "/admin",
      "/agent",
      "/nativeWXPay",
      "/ord",
      "/woAgent",
      "/login",
      "/statistical"
    ],
    target: sz + "8085",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/basicExpress",
      "/res"
    ],
    target: sz + "8082",   //拦截 context配置路径，经过此地址
    secure: false
  },
];
module.exports = PROXY_CONFIG;
