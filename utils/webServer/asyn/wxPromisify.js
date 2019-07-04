/**
 * 将小程序的API封装成支持Promise的API
 * @params fn {Function} 小程序原始API，如wx.login
 */

//添加finally：因为还有一个参数里面还有一个complete方法。
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}

module.exports = wxPromisify;