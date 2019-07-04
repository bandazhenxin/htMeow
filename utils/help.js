/**
 * 助手方法
 */

//格式化时间
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//惰性单例
const getSingle = function (fn) {
  let result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  }
}

//md5加密
/* 
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message 
 * Digest Algorithm, as defined in RFC 1321. 
 * Version 1.1 Copyright (C) Paul Johnston 1999 - 2002. 
 * Code also contributed by Greg Holt 
 * See http://pajhome.org.uk/site/legal.html for details. 
 */
/* 
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters. 
 */
function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF)
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
  return (msw << 16) | (lsw & 0xFFFF)
}
/* 
 * Bitwise rotate a 32-bit number to the left. 
 */
function rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt))
}
/* 
 * These functions implement the four basic operations the algorithm uses. 
 */
function cmn(q, a, b, x, s, t) {
  return safe_add(rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
}
function ff(a, b, c, d, x, s, t) {
  return cmn((b & c) | ((~b) & d), a, b, x, s, t)
}
function gg(a, b, c, d, x, s, t) {
  return cmn((b & d) | (c & (~d)), a, b, x, s, t)
}
function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t)
}
function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | (~d)), a, b, x, s, t)
}
/* 
 * Calculate the MD5 of an array of little-endian words, producing an array 
 * of little-endian words. 
 */
function coreMD5(x) {
  var a = 1732584193
  var b = -271733879
  var c = -1732584194
  var d = 271733878

  for (var i = 0; i < x.length; i += 16) {
    var olda = a
    var oldb = b
    var oldc = c
    var oldd = d

    a = ff(a, b, c, d, x[i + 0], 7, -680876936)
    d = ff(d, a, b, c, x[i + 1], 12, -389564586)
    c = ff(c, d, a, b, x[i + 2], 17, 606105819)
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330)
    a = ff(a, b, c, d, x[i + 4], 7, -176418897)
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426)
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341)
    b = ff(b, c, d, a, x[i + 7], 22, -45705983)
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416)
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417)
    c = ff(c, d, a, b, x[i + 10], 17, -42063)
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162)
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682)
    d = ff(d, a, b, c, x[i + 13], 12, -40341101)
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290)
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329)

    a = gg(a, b, c, d, x[i + 1], 5, -165796510)
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632)
    c = gg(c, d, a, b, x[i + 11], 14, 643717713)
    b = gg(b, c, d, a, x[i + 0], 20, -373897302)
    a = gg(a, b, c, d, x[i + 5], 5, -701558691)
    d = gg(d, a, b, c, x[i + 10], 9, 38016083)
    c = gg(c, d, a, b, x[i + 15], 14, -660478335)
    b = gg(b, c, d, a, x[i + 4], 20, -405537848)
    a = gg(a, b, c, d, x[i + 9], 5, 568446438)
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690)
    c = gg(c, d, a, b, x[i + 3], 14, -187363961)
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501)
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467)
    d = gg(d, a, b, c, x[i + 2], 9, -51403784)
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473)
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734)

    a = hh(a, b, c, d, x[i + 5], 4, -378558)
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463)
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562)
    b = hh(b, c, d, a, x[i + 14], 23, -35309556)
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060)
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353)
    c = hh(c, d, a, b, x[i + 7], 16, -155497632)
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640)
    a = hh(a, b, c, d, x[i + 13], 4, 681279174)
    d = hh(d, a, b, c, x[i + 0], 11, -358537222)
    c = hh(c, d, a, b, x[i + 3], 16, -722521979)
    b = hh(b, c, d, a, x[i + 6], 23, 76029189)
    a = hh(a, b, c, d, x[i + 9], 4, -640364487)
    d = hh(d, a, b, c, x[i + 12], 11, -421815835)
    c = hh(c, d, a, b, x[i + 15], 16, 530742520)
    b = hh(b, c, d, a, x[i + 2], 23, -995338651)

    a = ii(a, b, c, d, x[i + 0], 6, -198630844)
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415)
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905)
    b = ii(b, c, d, a, x[i + 5], 21, -57434055)
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571)
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606)
    c = ii(c, d, a, b, x[i + 10], 15, -1051523)
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799)
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359)
    d = ii(d, a, b, c, x[i + 15], 10, -30611744)
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380)
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649)
    a = ii(a, b, c, d, x[i + 4], 6, -145523070)
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379)
    c = ii(c, d, a, b, x[i + 2], 15, 718787259)
    b = ii(b, c, d, a, x[i + 9], 21, -343485551)

    a = safe_add(a, olda)
    b = safe_add(b, oldb)
    c = safe_add(c, oldc)
    d = safe_add(d, oldd)
  }
  return [a, b, c, d]
}
/* 
 * Convert an array of little-endian words to a hex string. 
 */
function binl2hex(binarray) {
  var hex_tab = "0123456789abcdef"
  var str = ""
  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
      hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF)
  }
  return str
}
/* 
 * Convert an array of little-endian words to a base64 encoded string. 
 */
function binl2b64(binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  var str = ""
  for (var i = 0; i < binarray.length * 32; i += 6) {
    str += tab.charAt(((binarray[i >> 5] << (i % 32)) & 0x3F) |
      ((binarray[i >> 5 + 1] >> (32 - i % 32)) & 0x3F))
  }
  return str
}
/* 
 * Convert an 8-bit character string to a sequence of 16-word blocks, stored 
 * as an array, and append appropriate padding for MD4/5 calculation. 
 * If any of the characters are >255, the high byte is silently ignored. 
 */
function str2binl(str) {
  var nblk = ((str.length + 8) >> 6) + 1 // number of 16-word blocks  
  var blks = new Array(nblk * 16)
  for (var i = 0; i < nblk * 16; i++) blks[i] = 0
  for (var i = 0; i < str.length; i++)
    blks[i >> 2] |= (str.charCodeAt(i) & 0xFF) << ((i % 4) * 8)
  blks[i >> 2] |= 0x80 << ((i % 4) * 8)
  blks[nblk * 16 - 2] = str.length * 8
  return blks
}
/* 
 * Convert a wide-character string to a sequence of 16-word blocks, stored as 
 * an array, and append appropriate padding for MD4/5 calculation. 
 */
function strw2binl(str) {
  var nblk = ((str.length + 4) >> 5) + 1 // number of 16-word blocks  
  var blks = new Array(nblk * 16)
  for (var i = 0; i < nblk * 16; i++) blks[i] = 0
  for (var i = 0; i < str.length; i++)
    blks[i >> 1] |= str.charCodeAt(i) << ((i % 2) * 16)
  blks[i >> 1] |= 0x80 << ((i % 2) * 16)
  blks[nblk * 16 - 2] = str.length * 16
  return blks
}
/* 
 * External interface 
 */
function hexMD5(str) { return binl2hex(coreMD5(str2binl(str))) }
function hexMD5w(str) { return binl2hex(coreMD5(strw2binl(str))) }
function b64MD5(str) { return binl2b64(coreMD5(str2binl(str))) }
function b64MD5w(str) { return binl2b64(coreMD5(strw2binl(str))) }
/* Backward compatibility */
function calcMD5(str) { return binl2hex(coreMD5(str2binl(str))) } 

function base64_encode(str) { // 编码，配合encodeURIComponent使用
  var c1, c2, c3;
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var i = 0, len = str.length, strin = '';
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
      strin += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
      strin += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    strin += base64EncodeChars.charAt(c1 >> 2);
    strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    strin += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    strin += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return strin
}

function base64_decode(input) { // 解码，配合decodeURIComponent使用
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
    enc1 = base64EncodeChars.indexOf(input.charAt(i++));
    enc2 = base64EncodeChars.indexOf(input.charAt(i++));
    enc3 = base64EncodeChars.indexOf(input.charAt(i++));
    enc4 = base64EncodeChars.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  return utf8_decode(output);
}

/**
 * 严格字符串判断
 */
function isNumber(val){
  if (typeof (val) == 'string'){
    let regPos = /^\d+(\.\d+)?$/; //非负浮点数
    let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
      return true;
    } else {
      return false;
    }
  }else{
    if (typeof val !== 'number') return false;
    if (!isNaN(val)) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * 严格对象类型判断
 */
function isObj(obj){
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 严格字符串判断
 */
function isString(str){
  return (typeof str == 'string') && str.constructor == String;
}

/**
 * 严格函数类型判断
 */
function isFunction(fn){
  return Object.prototype.toString.call(fn) === '[object Function]';
}

/**
 * 严格判断数组类型
 */
function isArr(arr){
  return Object.prototype.toString.call(arr) === '[object Array]';
}

/**
 * 空类型判断
 */
function isEmpty(param){
  if(!param) return true;
  if (Array.prototype.isPrototypeOf(param) && param.length === 0) return true;
  if (Object.prototype.isPrototypeOf(param) && Object.keys(param).length === 0) return true;
  return false;
}

/**
 * 对象合并
 */
function mergeObj(preObj1, preObj2){
  if (isEmpty(preObj1)) preObj1 = {};
  if (isEmpty(preObj2)) preObj2 = {};
  if (!isObj(preObj1)) return false;
  if (!isObj(preObj2)) return false;
  
  let newObj = {};
  Object.assign(newObj, preObj1, preObj2);
  return newObj;
}

/**
 * 数组合并
 */
function mergeArr(arr1,arr2){
  if (isEmpty(arr1)) arr1 = [];
  if (isEmpty(arr2)) arr2 = [];
  if (!isArr(arr1)) return false;
  if (!isArr(arr2)) return false;

  let c = arr1.concat(arr2);
  return c;
}

/**
 * 去换行转义
 */
function feedFilter(text){
  if (!isString(text)) return false;

  let target = '\n';
  return text.replace(/\\n/g, target);
}

/**
 * 转utf-8
 */
function utf8(inputStr){
  var outputStr = "";
  for (var i = 0; i < inputStr.length; i++) {
    var temp = inputStr.charCodeAt(i);
    //0xxxxxxx
    if (temp < 128) {
      outputStr += String.fromCharCode(temp);
    }
    //110xxxxx 10xxxxxx
    else if (temp < 2048) {
      outputStr += String.fromCharCode((temp >> 6) | 192);
      outputStr += String.fromCharCode((temp & 63) | 128);
    }
    //1110xxxx 10xxxxxx 10xxxxxx
    else if (temp < 65536) {
      outputStr += String.fromCharCode((temp >> 12) | 224);
      outputStr += String.fromCharCode(((temp >> 6) & 63) | 128);
      outputStr += String.fromCharCode((temp & 63) | 128);
    }
    //11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    else {
      outputStr += String.fromCharCode((temp >> 18) | 240);
      outputStr += String.fromCharCode(((temp >> 12) & 63) | 128);
      outputStr += String.fromCharCode(((temp >> 6) & 63) | 128);
      outputStr += String.fromCharCode((temp & 63) | 128);
    }
  }
  return outputStr;
}

/**
 * u聘加签
 */
function sign(key,params){
  //validata
  if (!isObj(params)) return false;
  if (!isString(key)) return false;
  
  //sign
  let arr = [];
  let base64_key = base64_encode(key);
  for (let i in params){
    if (i !== 'sign') arr.push(params[i]);
  }
  arr.push(base64_key);
  
  return hexMD5(utf8(arr.join('')));
}

/**
 * 计算编辑距离
 */
function levenshtein(s1, s2) {
  const len1 = s1.length
  const len2 = s2.length

  let matrix = []

  for (let i = 0; i <= len1; i++) {
    // 构造二维数组
    matrix[i] = new Array()
    for (let j = 0; j <= len2; j++) {
      // 初始化
      if (i == 0) {
        matrix[i][j] = j
      } else if (j == 0) {
        matrix[i][j] = i
      } else {
        // 进行最小值分析
        let cost = 0
        if (s1[i - 1] != s2[j - 1]) { // 相同为0，不同置1
          cost = 1
        }
        const temp = matrix[i - 1][j - 1] + cost

        matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, temp)
      }
    }
  }
  return matrix[len1][len2] //返回右下角的值
}

/**
 * 对象按某值排序
 */
function sortObj(obj, propertyName){
  if (!isArr(obj)) return false;
  if (!isString(propertyName)) return false;

  obj.sort(compare(propertyName));
  return obj;
}
//定义一个比较器
function compare(propertyName) {
  return function (object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value2 < value1) {
      return 1;
    } else if (value2 > value1) {
      return -1;
    } else {
      return 0;
    }
  }
}

/**
 * 获取url参数
 */
function getQueryString(url, name){
  let reg   = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
  let judge = url.substr(1).match(reg);
  if (judge != null) return judge[2];
  return null;
}

//exports
module.exports = {
  date: formatTime,
  getSingle: getSingle,
  feedFilter: feedFilter,
  utf8: utf8,
  base64_encode: base64_encode,
  base64_decode: base64_decode,
  hexMD5: hexMD5,
  hexMD5w: hexMD5w,
  b64MD5: b64MD5,
  b64MD5w: b64MD5w,
  isNumber: isNumber,
  isObj: isObj,
  isString: isString,
  isFunction: isFunction,
  isArr: isArr,
  isEmpty: isEmpty,
  mergeObj: mergeObj,
  mergeArr: mergeArr,
  sign: sign,
  levenshtein: levenshtein,
  sortObj: sortObj,
  getQueryString: getQueryString
}
