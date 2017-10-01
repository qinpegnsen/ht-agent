/**
 * Created by qinpengsen on 2017/9/4.
 */
const PROXY_CONFIG = [
  {
    context: [
      "/goodsQuery",
      "/login",
      "/admin",
      "/agent",
      "/nativeWXPay",
      "/ord",
      "/woAgent"
    ],
    target: "http://192.168.10.112:8085",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/basicExpress",
      "/res"
    ],
    target: "http://192.168.10.110:8068",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/statistical"
    ],
    target: "http://192.168.10.178:8096",   //拦截 context配置路径，经过此地址
    secure: false
  }
];
module.exports = PROXY_CONFIG;
