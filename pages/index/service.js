//reply
const config = require('../../config/request.js');
const basic = require('../../config/basic.js');
const lang = require('../../config/lang.js');
const apiBasic = require('../../core/apiBasic.js');
const storageClass = require('../../core/storage.js');
const layer = require('../../utils/webServer/layer.js');
const wxAsyn = require('../../utils/webServer/asyn/wxAsyn.js');
const help = require('../../utils/help.js');

//instance
const api = new apiBasic();
const storage = new storageClass();
const { mergeObj, mergeArr, isEmpty } = help;

//private
function service() {
  /**
   * 接口路径
   */
  this.urlList = {
    test: config.test
  };
}

//public
/**
 * 授权登录初始化
 */
service.prototype.init = function (app, that, detail) {
  //init
  let self = this;

  //construct
  let params = {

  };
  let url = this.urlList.test;

  //render 更新
  api.post(url, params).then(res => {
    
  }, msg => {
    layer.toast(msg.message);
  });
}