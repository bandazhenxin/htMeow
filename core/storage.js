const help = require('../utils/help.js');
const md5 = help.hexMD5;
const isNumber = help.isNumber;
const getSingle = help.getSingle;

/**
 * 封装缓存类，全部是同步版本
 */
function storage(){}

storage.prototype = {
  /**
   * 添加、修改数据
   */
  setData:function(key,value,time){
    //init
    if (!typeof (key) == 'string'){
      return false;
    } else if (time !== undefined && !isNumber(time)){
      return false;
    }else{
      time = parseInt(time);
    }
    
    //set
    key = md5(key);
    try{
      wx.setStorageSync(key, value);
      if (time){
        let now = parseInt(new Date().getTime() / 1000);
        let exp = now + time;
        wx.setStorageSync(key + '_exp', exp);
      }
      return true;
    }catch(e){
      return false;
    }
  },
  
  /**
   * 访问数据
   */
  getData:function(key){
    //init
    if (!typeof (key) == 'string') return;

    //get
    let now = parseInt(new Date().getTime() / 1000);
    key = md5(key);
    try{
      let value = wx.getStorageSync(key);
      let exp = wx.getStorageSync(key + '_exp');
      if (exp && now >= exp){
        wx.removeStorageSync(key);
        wx.removeStorageSync(key + '_exp');
        return;
      }
      return value;
    }catch(e){
      return;
    }
  },
  
  /**
   * 删除数据
   */
  delData:function(key){
    //init
    if (!typeof (key) == 'string') return false;

    //del
    key = md5(key);
    try{
      if (wx.getStorageSync(key)) wx.removeStorageSync(key);
      if (wx.getStorageSync(key + '_exp')) wx.removeStorageSync(key + '_exp');
      return true;
    }catch(e){
      return false;
    }
  },

  /**
   * 清空数据
   */
  clear:function(){
    try {
      wx.clearStorageSync();
      return true;
    } catch (e) {
      return false;
    }
  }
};

//代理单例
let single = (function(){
  let instance;
  return function(){
    if (!instance) instance = new storage();
    return instance;
  }
})();

module.exports = single;