/**
 * Created by qinpengsen on 2017/9/4.
 */
const PROXY_CONFIG = [
  {
    context: [
      "/goodsQuery",
      "/agent"
    ],
    target: "http://192.168.10.109:8088",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/login",
      "/admin",
    ],
    target: "http://192.168.10.167:8901",   //拦截 context配置路径，经过此地址
    secure: false
  }
];
module.exports = PROXY_CONFIG;
