/*
 * @Author: yisansky
 * @Date: 2020-02-29 11:05:08
 * @LastEditTime: 2020-02-29 16:50:46
 * @Description: 前端js工具方法库
 *               >> load layui.js >> load this js >> load js的自定义插件
 * @FilePath: \CM\assets\js\helper.js
 */

if (window != window.top) {
  window.layer = window.layer;
}
if (!window.layer)
  layui.use(["layer"], function() {
    layer = layui.layer;
    $ = layui.jquery;
  });

var that = (helper = {
    isDebug: true,
    log: function () {
        if (helper.isDebug) {
            console.log("=====>" + new Date().getTime() + "<=====");
            var len = arguments.length;
            for (var i = 0; i < len; i++) {
                console.log(arguments[i]);
            }
        }
    },
    /**后端返回Json ！！！！必看
     * {
     *   code:200,
     *   msg:"ok",
     *   count:1,
     *   data:null,
     *   dataObject:{}
     * }
     */
    // http 通信异常的时候调用此方法
    httpErrorLog: function (msg) {
        that.log(msg);
    },

    msg: function (_text) {
        //加载动画显示与否
        if (!!_text) {
            layer.msg(_text, {
                icon: 16,
                shade: 0.01
            });
        } else {
            layer.msg("正在拼了命为您加载…", {
                icon: 16,
                shade: 0.01
            });
        }
    },
    // 提示消息栏
    alert: {
        msg: function (msg) {
            layer.msg(msg);
        },
        success: function (msg) {
            layer.alert(msg, {
                icon: 1,
                title: "成功"
            });
        },
        info: function (msg) {
            layer.alert(msg);
        },
        warning: function (msg) {
            layer.alert(msg, {
                icon: 0,
                title: "提醒"
            });
        },
        error: function (msg) {
            layer.alert(msg, {
                icon: 2,
                title: "错误"
            });
        }
    },
    // http请求返回数据码
    httpCode: {
        success: "200", //成功回调
        overdue: "401", //token过期
        exception: "500", //系统异常,
        unauthorized: "401", //未授权,
        forbidden: "403" //禁止
    },
    // httpCode:httpCode,

    beforeSendHandler: function (xhr) {
        //处理提交请的回调
    },
    /**
     * get请求方法（异步）:url地址,callback回调函数
     *
     * @param {*} url
     * @param {*} param
     * @param {*} callback
     */
    httpAsyncGet: function (url, param, callback) {
        var index = layer.load(2);
        $.ajax({
            url: url,
            type: "GET",
            data: param,
            dataType: "json",
            async: true,
            cache: false,
            success: function (data) {
                if (data.code == that.httpCode.exception) {
                    that.httpErrorLog(data.msg);
                }
                layer.close(index);
                callback(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                that.httpErrorLog(textStatus);
                layer.close(index);
                callback(exres);
            },
            beforeSend: beforeSendHandler,
            complete: function () { }
        });
    },
    // get请求方法（同步）:url地址,param参数
    httpGet: function (url, param) {
        var index = layer.load(2);
        var res = {};
        $.ajax({
            url: url,
            data: param,
            type: "GET",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                layer.close(index);
                if (data.code == that.httpCode.exception) {
                    that.httpErrorLog(data.msg);
                }
                res = data;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                that.httpErrorLog(textStatus);
                layer.close(index);
            },
            beforeSend: beforeSendHandler,
            complete: function () { }
        });

        return res;
    },
    // post请求方法（异步）:url地址,param参数,callback回调函数
    httpAsyncPost: function (url, param, callback) {
        var index = layer.load(2);
        $.ajax({
            url: url,
            data: param,
            type: "POST",
            dataType: "json",
            async: true,
            cache: false,
            success: function (data) {
                layer.close(index);
                if (data.code == that.httpCode.exception) {
                    that.httpErrorLog(data.msg);
                }
                callback(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                that.httpErrorLog(textStatus);
                layer.close(index);
                callback();
            },
            beforeSend: beforeSendHandler,
            complete: function () { }
        });
    },
    // post请求方法（同步步）:url地址,param参数,callback回调函数
    httpPost: function (url, param, callback) {
        var index = layer.load(2);
        $.ajax({
            url: url,
            data: param,
            type: "POST",
            dataType: "json",
            async: false,
            cache: false,

            success: function (data) {
                layer.close(index);
                if (data.code == that.httpCode.exception) {
                    that.httpErrorLog(data.msg);
                } else {
                    callback(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.close(index);
                that.httpErrorLog(textStatus);
                callback({});
            },
            beforeSend: beforeSendHandler,
            complete: function () { }
        });
    },
    httpPostHeader: function (url, param, header, callback) {
        var index = layer.load(2);
        $.ajax({
            url: url,
            data: param,
            type: "POST",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                layer.close(index);
                if (data.code == that.httpCode.exception) {
                    that.httpErrorLog(data.msg);
                } else {
                    callback(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                that.httpErrorLog(textStatus);
                layer.close(index);
                callback({});
            },
            beforeSend: function (xhr) {
                for (var p in header) {
                    xhr.setRequestHeader(p, header[p]);
                }
            },
            complete: function () { }
        });
    },
    httpAsync: function (type, url, param, header, callback) {
        var user = JSON.parse(sessionStorage.getItem("token"));
        if (user && user.token)
            this.httpAsyncWithToken(type, url, param, header, user.token, callback);
        else
            this.httpAsyncOpen(type, url, param, header, callback);
    },
    // ajax 异步封装 无token认证
    httpAsyncWithToken: function (type, url, param, header, token,callback) {
        var index = layer.load(2);
        $.ajax({
            url: url,
            data: param,
            type: type,
            dataType: "json",
            contentType: "application/json",
            async: true,
            cache: false,
            success: function (res) {
                layer.close(index);
                if (res.code == that.httpCode.success) {
                    callback(res);
                } else if (res.code == that.httpCode.overdue) {
                    that.httpErrorLog(res.msg);
                    that.alert.warning("token失效，自行封装");
                } else if (res.code == that.httpCode.overdue) {
                    that.httpErrorLog(res.msg);
                    that.alert.warning("系统异常，请联系管理员");
                } else {
                    that.alert.warning(res.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                that.httpErrorLog(textStatus);
                layer.close(index);
                callback(null);
            },
            beforeSend: function (xhr) {
                if (header) {
                    for (var p in header) {
                        xhr.setRequestHeader(p, header[p]);
                    }
                }
                if (token) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                }
            },
            complete: function () { }
        });
    },
    httpAsyncOpen: function (type, url, param, header,  callback) {
        var index = layer.load(2);
        $.ajax({
            url: url,
            data: param,
            type: type,
            dataType: "json",
            contentType: "application/json",
            async: true,
            cache: false,
            success: function (res) {
                layer.close(index);
                if (res.code == that.httpCode.success) {
                    callback(res);
                } else if (res.code == that.httpCode.overdue) {
                    that.httpErrorLog(res.msg);
                    that.alert.warning("token失效，自行封装");
                } else if (res.code == that.httpCode.overdue) {
                    that.httpErrorLog(res.msg);
                    that.alert.warning("系统异常，请联系管理员");
                } else {
                    that.alert.warning(res.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                that.httpErrorLog(textStatus);
                layer.close(index);
                callback(null);
            },
            beforeSend: function (xhr) {
                if (header) {
                    for (var p in header) {
                        xhr.setRequestHeader(p, header[p]);
                    }
                }
            },
            complete: function () { }
        });
    },
    deleteForm: function (url, param, callback) {
        // that.loading(true, '正在删除数据');
        var index = layer.load(2);
        that.httpAsyncPost(url, param, function (res) {
            //that.loading(false);
            layer.close(index);
            if (res.code == that.httpCode.success) {
                if (!!callback) {
                    callback(res);
                }
                that.alert.success(res.info);
            } else {
                that.alert.error(res.info);
                that.httpErrorLog(res.info);
            }
            layer.close(layer.index);
        });
    },
    postForm: function (url, param, callback) {
        that.loading(true, "正在提交数据");
        var index = layer.load(2);
        that.httpAsyncPost(url, param, function (res) {
            //that.loading(false);
            layer.close(index);
            if (res.code == that.httpCode.success) {
                if (!!callback) {
                    callback(res);
                }
                that.alert.success(res.info);
            } else {
                that.alert.error(res.info);
                that.httpErrorLog(res.info);
            }
            layer.close(layer.index);
        });
    },
    //改变url参数
    urlChangeParam: function (url, key, value) {
        var newUrl = "";
        var reg = new RegExp("(^|)" + key + "=([^&]*)(|$)");
        var tmp = key + "=" + value;
        if (url.match(reg) != null) {
            newUrl = url.replace(eval(reg), tmp);
        } else {
            if (url.match("[?]")) {
                newUrl = url + "&" + tmp;
            } else {
                newUrl = url + "?" + tmp;
            }
        }
        return newUrl;
    },
    //获取url参数
    urlGetParamValue: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2];
        return null;
    },
    //获取url参数
    urlGetParam: function (search, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = search.substr(1).match(reg);
        if (r != null) return r[2];
        return null;
    }
});
//加密解密算法
helper.cryption = {
  //md5加密算法
  md5: function(md5str) {
    var createMD5String = function(string) {
      var x = Array();
      var k, AA, BB, CC, DD, a, b, c, d;
      var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
      var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
      var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
      var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;
      string = uTF8Encode(string);
      x = convertToWordArray(string);
      a = 0x67452301;
      b = 0xefcdab89;
      c = 0x98badcfe;
      d = 0x10325476;
      for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070db);
        b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
        a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
        c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
        c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
        a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
        a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
        a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
        a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
        c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xf4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432aff97);
        c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
        b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
        c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
        d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
        c = II(c, d, a, b, x[k + 6], S43, 0xa3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
        a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
        d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
        b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
      }
      var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
      return tempValue.toLowerCase();
    };
    var rotateLeft = function(lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    };
    var addUnsigned = function(lX, lY) {
      var lX4, lY4, lX8, lY8, lResult;
      lX8 = lX & 0x80000000;
      lY8 = lY & 0x80000000;
      lX4 = lX & 0x40000000;
      lY4 = lY & 0x40000000;
      lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
      if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
      if (lX4 | lY4) {
        if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
        else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
      } else {
        return lResult ^ lX8 ^ lY8;
      }
    };
    var F = function(x, y, z) {
      return (x & y) | (~x & z);
    };
    var G = function(x, y, z) {
      return (x & z) | (y & ~z);
    };
    var H = function(x, y, z) {
      return x ^ y ^ z;
    };
    var I = function(x, y, z) {
      return y ^ (x | ~z);
    };
    var FF = function(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };
    var GG = function(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };
    var HH = function(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };
    var II = function(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };
    var convertToWordArray = function(string) {
      var lWordCount;
      var lMessageLength = string.length;
      var lNumberOfWordsTempOne = lMessageLength + 8;
      var lNumberOfWordsTempTwo =
        (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
      var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
      var lWordArray = Array(lNumberOfWords - 1);
      var lBytePosition = 0;
      var lByteCount = 0;
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] =
          lWordArray[lWordCount] |
          (string.charCodeAt(lByteCount) << lBytePosition);
        lByteCount++;
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
      return lWordArray;
    };
    var wordToHex = function(lValue) {
      var WordToHexValue = "",
        WordToHexValueTemp = "",
        lByte,
        lCount;
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        WordToHexValueTemp = "0" + lByte.toString(16);
        WordToHexValue =
          WordToHexValue +
          WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
      }
      return WordToHexValue;
    };
    var uTF8Encode = function(string) {
      string = string.toString().replace(/\x0d\x0a/g, "\x0a");
      var output = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          output += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          output += String.fromCharCode((c >> 6) | 192);
          output += String.fromCharCode((c & 63) | 128);
        } else {
          output += String.fromCharCode((c >> 12) | 224);
          output += String.fromCharCode(((c >> 6) & 63) | 128);
          output += String.fromCharCode((c & 63) | 128);
        }
      }
      return output;
    };
    return createMD5String(md5str);
  }
};

//转换方法
helper.convert = {
  // 转化成十进制
  toDecimal: function(num) {
    if (num == null) {
      num = "0";
    }
    num = num.toString().replace(/\$|\,/g, "");
    if (isNaN(num)) num = "0";
    var sign = num == (num = Math.abs(num));
    num = Math.floor(num * 100 + 0.50000000001);
    var cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
      num =
        num.substring(0, num.length - (4 * i + 3)) +
        "" +
        num.substring(num.length - (4 * i + 3));
    return (sign ? "" : "-") + num + "." + cents;
  },
  /** 四舍五入强制保留n位小数
   * x  操作数字
   * num 保留位数
   */
  toDecimal(x, num) {
    var f = parseFloat(x);
    if (isNaN(f) && isNaN(num)) {
      return false;
    }
    if (num === 0) return Math.round(x);
    var num = Number("1E" + num);
    var f = Math.round(x * num) / num;
    var s = f.toString();
    var rs = s.indexOf(".");
    if (rs < 0) {
      rs = s.length;
      s += ".";
    }
    while (s.length <= rs + num) {
      s += "0";
    }
    return s;
  },
  // 数字格式转换成千分位
  toCommafy: function(num) {
    if (num == null) {
      num = "0";
    }
    if (isNaN(num)) {
      return "0";
    }
    num = num + "";
    if (/^.*\..*$/.test(num)) {
      varpointIndex = num.lastIndexOf(".");
      varintPart = num.substring(0, pointIndex);
      varpointPart = num.substring(pointIndex + 1, num.length);
      intPart = intPart + "";
      var re = /(-?\d+)(\d{3})/;
      while (re.test(intPart)) {
        intPart = intPart.replace(re, "$1,$2");
      }
      num = intPart + "." + pointPart;
    } else {
      num = num + "";
      var re = /(-?\d+)(\d{3})/;
      while (re.test(num)) {
        num = num.replace(re, "$1,$2");
      }
    }
    return num;
  },
  // 文件大小转换
  toCountFileSize: function(size) {
    if (size < 1024.0) return that.toDecimal(size) + " 字节";
    else if (size >= 1024.0 && size < 1048576)
      return that.toDecimal(size / 1024.0) + " KB";
    else if (size >= 1048576 && size < 1073741824)
      return that.toDecimal(size / 1024.0 / 1024.0) + " MB";
    else if (size >= 1073741824)
      return that.toDecimal(size / 1024.0 / 1024.0 / 1024.0) + " GB";
  },
  /**为数字加上单位：万
   *
   * 例如：
   *      10000 => 1万
   *      99000 => 9.9万
   *  输入数字.
   */
  toWanFormat(input) {
    // 精确到整数，直接用js自带方法input.toFixed(0)也可以
    if (input >= 10000) {
      const num = input / 10000;
      return `${num.toFixed(2)}万`;
    } else {
      let v = input;
      if (v == "" || v == null || v == undefined) {
        return v;
      }
      return v.toFixed(2);
    }
  },
  /** 数字金额大写转换
   * mny 金额
   */
  toChineseMoney(mny) {
    var num = mny;
    var fraction = ["角", "分"];
    var digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    var unit = [
      ["元", "万", "亿"],
      ["", "拾", "佰", "仟"]
    ];
    var head = num < 0 ? "欠" : "";
    num = Math.abs(num);
    var s = "";
    for (var i = 0; i < fraction.length; i++) {
      s += (
        digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]
      ).replace(/零./, "");
    }
    s = s || "整";
    num = Math.floor(num);
    for (var i = 0; i < unit[0].length && num > 0; i++) {
      var p = "";
      for (var j = 0; j < unit[1].length && num > 0; j++) {
        p = digit[num % 10] + unit[1][j] + p;
        num = Math.floor(num / 10);
      }
      s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
    }
    return (
      head +
      s
        .replace(/(零.)*零元/, "元")
        .replace(/(零.)+/g, "零")
        .replace(/^整$/, "零元整")
    );
  },
  /**将数值四舍五入(保留2位小数)后格式化成金额形式
   *  num 数值(Number或者String)
   *  n 保留几位小数
   * 返回值 金额格式的字符串,如'1,234,567.45'
   */
  toFormatCurrency(num, n) {
    var CurrencyAndAmountRegExp = /^(\d{1,18})|(\d{1,18}\.)|(\d{1,17}\.\d{0,1})|(\d{1,16}\.\d{0,2})|(\.\d{1,2})$/;
    var _result = CurrencyAndAmountRegExp.test(strData);
    if (_result == false) {
      return strData;
    }
    // 一般来说最多就6位吧，当然如果有特殊需求可自行更改(｀・∀・´)
    n = n > 0 && n <= 6 ? n : 2;
    var formatData =
      parseFloat((strData + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = formatData
      .split(".")[0]
      .split("")
      .reverse();
    var r = formatData.split(".")[1];
    var t = "";
    for (i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
    }
    return (
      t
        .split("")
        .reverse()
        .join("") +
      "." +
      r
    );
  }
};
//日期时间方法
helper.datetime = {
  /**时间戳转时间
   * number 时间戳
   * format 返回格式
   * formatTime(number, 'Y年M月D日 h:m:s')
   * formatTime(number, 'Y-M-D h:m:s')
   * unix Timestamp 不除1000
   */
  fromUnixTimestamp: function(timestamp, format) {
    var a,
      jsdate = timestamp ? new Date(timestamp) : new Date();
    var pad = function(n, c) {
      if ((n = n + "").length < c) {
        return new Array(++c - n.length).join("0") + n;
      } else {
        return n;
      }
    };
    var txt_weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    var txt_ordin = {
      1: "st",
      2: "nd",
      3: "rd",
      21: "st",
      22: "nd",
      23: "rd",
      31: "st"
    };
    var txt_months = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var f = {
      // Day
      d: function() {
        return pad(f.j(), 2);
      },
      D: function() {
        return f.l().substr(0, 3);
      },
      j: function() {
        return jsdate.getDate();
      },
      l: function() {
        return txt_weekdays[f.w()];
      },
      N: function() {
        return f.w() + 1;
      },
      S: function() {
        return txt_ordin[f.j()] ? txt_ordin[f.j()] : "th";
      },
      w: function() {
        return jsdate.getDay();
      },
      z: function() {
        return (
          ((jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5) >> 0
        );
      },

      // Week
      W: function() {
        var a = f.z(),
          b = 364 + f.L() - a;
        var nd2,
          nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
        if (b <= 2 && (jsdate.getDay() || 7) - 1 <= 2 - b) {
          return 1;
        } else {
          if (a <= 2 && nd >= 4 && a >= 6 - nd) {
            nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
            return date("W", Math.round(nd2.getTime() / 1000));
          } else {
            return (1 + (nd <= 3 ? (a + nd) / 7 : (a - (7 - nd)) / 7)) >> 0;
          }
        }
      },

      // Month
      F: function() {
        return txt_months[f.n()];
      },
      m: function() {
        return pad(f.n(), 2);
      },
      M: function() {
        return f.F().substr(0, 3);
      },
      n: function() {
        return jsdate.getMonth() + 1;
      },
      t: function() {
        var n;
        if ((n = jsdate.getMonth() + 1) == 2) {
          return 28 + f.L();
        } else {
          if ((n & 1 && n < 8) || (!(n & 1) && n > 7)) {
            return 31;
          } else {
            return 30;
          }
        }
      },

      // Year
      L: function() {
        var y = f.Y();
        return !(y & 3) && (y % 1e2 || !(y % 4e2)) ? 1 : 0;
      },
      //o not supported yet
      Y: function() {
        return jsdate.getFullYear();
      },
      y: function() {
        return (jsdate.getFullYear() + "").slice(2);
      },

      // Time
      a: function() {
        return jsdate.getHours() > 11 ? "pm" : "am";
      },
      A: function() {
        return f.a().toUpperCase();
      },
      B: function() {
        // peter paul koch:
        var off = (jsdate.getTimezoneOffset() + 60) * 60;
        var theSeconds =
          jsdate.getHours() * 3600 +
          jsdate.getMinutes() * 60 +
          jsdate.getSeconds() +
          off;
        var beat = Math.floor(theSeconds / 86.4);
        if (beat > 1000) beat -= 1000;
        if (beat < 0) beat += 1000;
        if (String(beat).length == 1) beat = "00" + beat;
        if (String(beat).length == 2) beat = "0" + beat;
        return beat;
      },
      g: function() {
        return jsdate.getHours() % 12 || 12;
      },
      G: function() {
        return jsdate.getHours();
      },
      h: function() {
        return pad(f.g(), 2);
      },
      H: function() {
        return pad(jsdate.getHours(), 2);
      },
      i: function() {
        return pad(jsdate.getMinutes(), 2);
      },
      s: function() {
        return pad(jsdate.getSeconds(), 2);
      },
      //u not supported yet

      // Timezone
      //e not supported yet
      //I not supported yet
      O: function() {
        var t = pad(Math.abs((jsdate.getTimezoneOffset() / 60) * 100), 4);
        if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
        else t = "+" + t;
        return t;
      },
      P: function() {
        var O = f.O();
        return O.substr(0, 3) + ":" + O.substr(3, 2);
      },
      //T not supported yet
      //Z not supported yet

      // Full Date/Time
      c: function() {
        return (
          f.Y() +
          "-" +
          f.m() +
          "-" +
          f.d() +
          "T" +
          f.h() +
          ":" +
          f.i() +
          ":" +
          f.s() +
          f.P()
        );
      },
      //r not supported yet
      U: function() {
        return Math.round(jsdate.getTime() / 1000);
      }
    };

    return format.replace(/[\ ]?([a-zA-Z])/g, function(t, s) {
      if (t != s) {
        // escaped
        ret = s;
      } else if (f[s]) {
        // a date function exists
        ret = f[s]();
      } else {
        // nothing special
        ret = s;
      }
      return ret;
    });
  },
  fromTimestamp: function(timestamp, format) {
    return this.dtFromUnixTimestamp(timestamp * 1000, format);
  },
  /** 日期字符串转Unix时间戳
   * dt 日期字符串
   */
  toTimestamp: function(dt) {
    if (isNaN(dt) || isNaN(Date.parse(dt))) dt = new Date();
    else dt = Date.parse(dt);
    return Math.floor(dt.getTime() / 1000);
  },
  /**格式化日期 默认为当前日期
   * dt  日期对象
   * returns 格式化的字符串日期
   */
  getDates: function(dtstr,format) {//yyyyMMddHHmmss
    
      var str = ""; //存储时间的字符串
      if (!format) format = "yyyyMMddHHmm";
      var dateSet = {}
      if (dtstr) {
          var dt = new Date(dtstr);
          //获取年
          var year = dt.getFullYear();
          //获取月
          var month = dt.getMonth() + 1;
          //获取日
          var day = dt.getDate();
          //获取小时
          var hour = dt.getHours();
          //获取分钟
          var min = dt.getMinutes();
          //获取秒
          var sec = dt.getSeconds();
          dateSet['yyyy'] = year;
          dateSet['MM'] = month= month < 10 ? "0" + month : month;
          dateSet['dd'] =day= day < 10 ? "0" + day : day;
          dateSet['HH'] = hour= hour < 10 ? "0" + hour : hour;
          dateSet['mm'] =min= min < 10 ? "0" + min : min;
          dateSet['ss'] = sec = sec < 10 ? "0" + sec : sec;
          dateSet['yyyyMM'] = year + '年' + month + '月';
          dateSet['MMdd'] = month + '月' + day + '日';
          dateSet['yyyyMMdd'] = year + '-' + month + '-' + day;
          dateSet['HHmm'] = hour + ':' + min;
          dateSet['HHmmss'] = hour + ':' + min + ':' + sec;
          dateSet['yyyyMMddHHmm'] = year + '-' + month + '-' + day + ' ' + hour + ':' + min;
          dateSet['yyyyMMddHHmmss'] = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;

          str = dateSet[format];
          if (!str) str = "格式符对?";
          
      }
    return str;
  },
  /** 获取星期几
   * date 日期字符串
   */
  getDayofWeek: function(date) {
    switch (new Date(date).getDay()) {
      case 0:
        return "星期日";
      case 1:
        return "星期一";
      case 2:
        return "星期二";
      case 3:
        return "星期三";
      case 4:
        return "星期四";
      case 5:
        return "星期五";
      case 6:
        return "星期六";
    }
  },
  /**计算两个时间差
   * 开始时间（xxxx-xx-xx）
   * 结束时间（xxxx-xx-xx）
   * return xx年xx天  || xx天xx小时 || xx小时xx分
   */
  getDateDiff: function(startTime, endTime) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
    var sTime = new Date(startTime); //开始时间
    var eTime = new Date(endTime); //结束时间
    var timeOff = eTime - sTime; //相差时间戳（毫秒数）
    var timeMinute = 1000 * 60;
    var timeHour = 1000 * 3600;
    var timeDay = 1000 * 3600 * 24;
    var timeYear = 1000 * 3600 * 24 * 365;
    if (timeOff / timeYear >= 1) {
      return (
        parseInt(timeOff / timeYear) +
        "年" +
        parseInt((timeOff % timeYear) / timeDay) +
        "天"
      );
    } else if (timeOff / timeDay >= 1) {
      return (
        parseInt(timeOff / timeDay) +
        "天" +
        parseInt((timeOff % timeDay) / timeHour) +
        "小时"
      );
    } else {
      return (
        parseInt(timeOff / timeHour) +
        "小时" +
        parseInt((timeOff % timeHour) / timeMinute) +
        "分"
      );
    }
  },
  /**获取两个日期相差天数
   * sDate1,sDate2 （xxxx-xx-xx）
   */
  getDateDiff: function(sDate1, sDate2) {
    let arrDate, objDate1, objDate2, iDays;
    arrDate = sDate1.split("-");
    objDate1 = new Date(arrDate[1] + "/" + arrDate[2] + "/" + arrDate[0]);
    arrDate = sDate2.split("-");
    objDate2 = new Date(arrDate[1] + "/" + arrDate[2] + "/" + arrDate[0]);
    iDays = parseInt(Math.abs(objDate1 - objDate2) / 1000 / 60 / 60 / 24); // 相差毫秒数转成天数
    return iDays;
  },
  /** 到某一个时间的倒计时*/
  getRestTimeString: function(endTime) {
    var startDate = new Date(); //开始时间，当前时间
    var endDate = new Date(endTime); //结束时间，需传入时间参数
    var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
    var d = 0,
      h = 0,
      m = 0,
      s = 0;
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor((t / 1000 / 60 / 60) % 24);
      m = Math.floor((t / 1000 / 60) % 60);
      s = Math.floor((t / 1000) % 60);
    }
    return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
  }
};

helper.string = {
  /** 字符串格式化
   * type
   * 1:首字母大写
   * 2：首页母小写
   * 3：大小写转换
   * 4：全部大写
   * 5：全部小写
   */
  changeCase: function(str, type) {
    function ToggleCase(str) {
      var itemText = "";
      str.split("").forEach(function(item) {
        if (/^([a-z]+)/.test(item)) {
          itemText += item.toUpperCase();
        } else if (/^([A-Z]+)/.test(item)) {
          itemText += item.toLowerCase();
        } else {
          itemText += item;
        }
      });
      return itemText;
    }
    switch (type) {
      case 1:
        return str.replace(/^(\w)(\w+)/, function(v, v1, v2) {
          return v1.toUpperCase() + v2.toLowerCase();
        });
      case 2:
        return str.replace(/^(\w)(\w+)/, function(v, v1, v2) {
          return v1.toLowerCase() + v2.toUpperCase();
        });
      case 3:
        return ToggleCase(str);
      case 4:
        return str.toUpperCase();
      case 5:
        return str.toLowerCase();
      default:
        return str;
    }
  },
  /**字符串替换(字符串,要替换的字符,替换成什么)
   */
  replaceAll: function(str, AFindText, ARepText) {
    raRegExp = new RegExp(AFindText, "g");
    return str.replace(raRegExp, ARepText);
  },
  /**检测字符串
   * type
   */
  checkType: function(str, type) {
    switch (type) {
      case "email":
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case "phone":
        return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
      case "tel":
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case "number":
        return /^[0-9]$/.test(str);
      case "english":
        return /^[a-zA-Z]+$/.test(str);
      case "chinese":
        return /^[\u4E00-\u9FA5]+$/.test(str);
      case "lower":
        return /^[a-z]+$/.test(str);
      case "upper":
        return /^[A-Z]+$/.test(str);
      default:
        return true;
    }
  },
  /** 检测密码强度
   * type
   */
  checkPwdRule: function(str) {
    var nowLv = 0;
    if (str.length < 6) {
      return nowLv;
    }
    if (/[0-9]/.test(str)) {
      nowLv++;
    }
    if (/[a-z]/.test(str)) {
      nowLv++;
    }
    if (/[A-Z]/.test(str)) {
      nowLv++;
    }
    if (/[\.|-|_]/.test(str)) {
      nowLv++;
    }
    return nowLv;
  },
  /** 去除空格
   * type
   * 1 去除头和尾
   * 2 去除所有空格
   * 3 去除右边所有空格
   */
  trim: function(str, type) {
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "");
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s*)/g, "");
      case 4:
        return str.replace(/(\s*$)/g, "");
      default:
        return str;
    }
  },
  // 创建一个GUID
  newGuid: function() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
      var n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
      if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
    }
    return guid;
  },
  /**生成范围内的随机数
   * minNum 最小值
   * maxNum 最大值
   */
  randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  }
};

window.app = that;
