//reply
const app          = getApp();
const serviceClass = require('service.js');
const pageBasic    = require('../../core/pageBasic.js');
const layer        = require('../../utils/webServer/layer.js');
const help         = require('../../utils/help.js');
const config       = require('../../config/basic.js');
const lang         = require('../../config/lang.js');
const link         = require('../../config/link.js');

//instance
const service = new serviceClass();
const { isEmpty } = help;


//继承基类
function IndexPage(title) {
  pageBasic.call(this, title);

  this.vm = {
    db: {}
  }
  IndexPage.prototype = new pageBasic();
}



/** 业务逻辑控制 **/

/**
 * 逻辑初始化
 */
IndexPage.prototype.onPreload = function (option) {

}

Page(new IndexPage(lang.wz));
