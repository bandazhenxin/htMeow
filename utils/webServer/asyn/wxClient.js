function webClient() {
  this.url = '';
  this.contentType = 'application/x-www-form-urlencoded';
  this.dataType = 'json';
  this._header = {};
};

webClient.prototype = {
  setHeader: function (key, value) {
    this._header[key] = value;
  },
  removeHeader: function (key) {
    delete this.header[key];
  },
  //get通信
  get: function (url, data) {
    let self = this;
    let promise = new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: self._getRequestHeader(),
        success: function (res) {//服务器返回数据
          if (res.statusCode == 200) {
            resolve(res.data);
          } else {//返回错误提示信息
            reject(res.data.msg);
          }
        },
        error: function (e) {
          reject('网络出错');
        }
      })
    });

    return promise;
  },
  //post通信
  post: function (url, data) {
    let self = this;
    let promise = new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        method: 'POST',
        header: self._getRequestHeader(),
        success: (response) => {
          if (response.statusCode == 200) {
            resolve(response.data);
          } else {
            reject(response.data.msg);
          }
        },
        fail: e => {
          reject('网络出错');
        }
      })
    });

    return promise;
  },
  //上传文件
  upload: function (url, callback) {

  },
  _getRequestHeader: function () {
    var header = {};
    if (this.contentType != null && this.contentType !== '') {
      header['content-type'] = this.contentType;
    }
    for (var p in this._header) {
      if (this._header.hasOwnProperty(p)) {
        header[p] = this._header[p];
      }
    }
    return header;
  }
};

module.exports = webClient;

