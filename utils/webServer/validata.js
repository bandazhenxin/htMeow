/* private */
function Validata (){
  /**
   * 地区数组
   */
  this.aCity = { 
    11: "北京", 
    12: "天津", 
    13: "河北", 
    14: "山西", 
    15: "内蒙古", 
    21: "辽宁", 
    22: "吉林", 
    23: "黑龙江", 
    31: "上海", 
    32: "江苏", 
    33: "浙江", 
    34: "安徽", 
    35: "福建", 
    36: "江西", 
    37: "山东", 
    41: "河南", 
    42: "湖北", 
    43: "湖南", 
    44: "广东", 
    45: "广西", 
    46: "海南", 
    50: "重庆", 
    51: "四川", 
    52: "贵州", 
    53: "云南", 
    54: "西藏", 
    61: "陕西", 
    62: "甘肃", 
    63: "青海", 
    64: "宁夏", 
    65: "新疆", 
    71: "台湾", 
    81: "香港", 
    82: "澳门", 
    91: "国外" 
  }

  /**
   * 获取生日信息
   */
  this.getBirthday = function (card) {
    let i = this.isCardID(card);
    if (i !== true) {
      return false;
    } else {
      let year = card.substr(6, 4);
      let mouth = card.substr(10, 2);
      let day = card.substr(12, 2);
      let birthday = year + "-" + mouth + "-" + day;
      return birthday;
    }
  }

  /**
   * 获取性别信息
   */
  this.getSex = function (card) {
    let i = this.isCardID(card);
    let sexArr = ['女','男'];

    if (i !== true) {
      return false;
    } else {
      let sex = card.substr(16, 1);
      return sexArr[sex % 2];
    }
  }
}

/* public */
/**
 * 验证身份证
 */
Validata.prototype.isCardID = function (sId) {
  //init
  if (typeof sId != 'string' || sId.constructor != String) return "非法参数";
  let iSum = 0;
  let info = "";
  
  //action
  if (!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
  sId = sId.replace(/x$/i, "a");
  if (this.aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份证地区非法";
  
  let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
  let d = new Date(sBirthday.replace(/-/g, "/"));
  if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
  for (let i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
  if (iSum % 11 != 1) return "你输入的身份证号非法";
  
  return true;
}

/**
 * 获取身份证信息
 */
Validata.prototype.getIDInfo = function (sId) {
  //init
  if (typeof sId != 'string' || sId.constructor != String) return "非法参数";

  return {
    birthday: this.getBirthday(sId),
    sex: this.getSex(sId)
  };
}

/**
 * 验证手机、电话号
 */
Validata.prototype.checkPhone = function (phone) {
  //init
  if (typeof phone != 'string' || phone.constructor != String) return "非法参数";

  let mobileTest = /^1(3|4|5|6|7|8|9)\d{9}$/;
  let telTest = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
  if (!mobileTest.test(phone) && !telTest.test(phone)) return "号码格式错误";

  return true;
}

//代理单例
let single = (function () {
  let instance;
  return function () {
    if (!instance) instance = new Validata();
    return instance;
  }
})();

module.exports = single;