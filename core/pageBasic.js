//reply
const app  = getApp();
const help = require('../utils/help.js');

//instance
const { isFunction, isObj } = help;

/**
 * 基类控制器
 */
function pageBasic(title){
  this.vm = null;
  this.title = title;
}

/**
 * 初始化
 */
pageBasic.prototype.onLoad = function (options) {
  let me = this;
  if (this.title != null) this.setTitle(this.title);

  //私有初始化
  this.onPreload(options);
}

/**
 * 设置页面标题
 */
pageBasic.prototype.setTitle = function (title) {
  this.title = title;
  wx.setNavigationBarTitle({ title: this.title });
}

/**
 * 整体更新数据
 */
pageBasic.prototype.render = function () {
  var data = {};
  for (var p in this.vm) {
    var value = this.vm[p];
    if (!this.vm.hasOwnProperty(p) || p == 'db') {
      continue;
    }
    if (value == null || typeof (value) === 'function') {
      continue;
    }
    if (value.__route__ != null) {
      continue;
    }
    data[p] = this.vm[p];
  }
  this.setData(data);
}

/**
 * 局部渲染
 */
pageBasic.prototype.renderDetail = function (obj, fn) {
  //validata
  if (!isObj(obj)) return;
  let self = this;

  //更新vm
  Object.keys(obj).forEach(function (key) {
    self.vm[key] = obj[key];
  });

  //渲染数据
  if (isFunction(fn)) {
    this.setData(obj, fn);
  } else {
    this.setData(obj);
  }
}

/**
 * 页面重定向
 */
pageBasic.prototype.go = function (url, addToHistory) {
  if (addToHistory === false) {
    wx.redirectTo({ url: url });
  } else {
    wx.navigateTo({ url: url });
  }
}

/**
 * 页面出栈
 */
pageBasic.prototype.goBack = function () {
  wx.navigateBack({});
}

/**
 * 获取完整路径
 */
pageBasic.prototype.getFullUrl = function () {
  var url = this.route.indexOf('/') === 0 ? this.route : '/' + this.route;
  var parts = [];
  for (var p in this.options) {
    if (this.options.hasOwnProperty(p)) {
      parts.push(p + "=" + this.options[p]);
    }
  }
  if (parts.length > 0) {
    url += "?" + parts.join('&');
  }
  return url;
}

/**
 * 判断是否是是首页
 */
pageBasic.prototype.isCurrentPage = function () {
  let pages = getCurrentPages();
  let is = pages.length > 0 ? pages[0] : null;
  return this === is;
}

/**
 * 获取首页实例
 */
pageBasic.prototype.getIndexPage = function () {
  if (this.isCurrentPage()) return this;

  let pages = getCurrentPages();
  let length = pages.length;
  let instance = this;
  for (let i = 1; true; i++) {
    instance = pages[pages.length - i];
    if (instance.isCurrentPage()) break;
  }

  return instance;
}

/**
 * 回到首页
 */
pageBasic.prototype.goIndex = function () {
  let pages = getCurrentPages();
  let length = pages.length;
  wx.navigateBack({
    delta: length - 1
  })
}

/**
 * 构造url参数
 */
pageBasic.prototype.creatUrlParams = function (params) {
  //init
  if (!isObj(params)) return '';
  let params_arr = [];

  Object.keys(params).forEach(function (key) {
    let str = key + '=' + params[key];
    params_arr.push(str);
  });
  let params_str = '?' + params_arr.join('&');

  return params_str;
}

/**
 * 初始化 初始化方法
 */
pageBasic.prototype.onPreload = function (options) {

}

module.exports = pageBasic;