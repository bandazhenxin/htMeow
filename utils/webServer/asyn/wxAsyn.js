/**
 * 同步化封装原厂开放接口
 */
const wxPromisify = require('wxPromisify.js');

//api list
const getLocation = wxPromisify(wx.getLocation); //获取经纬度
const showModal = wxPromisify(wx.showModal);     //弹窗
const getSetting = wxPromisify(wx.getSetting);   //判断权限
const getUserInfo = wxPromisify(wx.getUserInfo); //获取用户信息
const login = wxPromisify(wx.login);             //登录
const openSetting = wxPromisify(wx.openSetting); //弹出授权

module.exports = {
  getLocation: getLocation,
  showModal: showModal,
  getSetting: getSetting,
  getUserInfo: getUserInfo,
  login: login,
  openSetting: openSetting
}