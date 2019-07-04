const client = require('../utils/webServer/asyn/wxClient.js');

//继承基础通信交互方法
function apiBasic(){
  client.call(this);
}
apiBasic.prototype = new client();

//接口路径
apiBasic.prototype.urlList = {};

module.exports = apiBasic;