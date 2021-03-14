/*
 * @Author: your name
 * @Date: 2020-02-28 11:59:24
 * @LastEditTime: 2020-02-29 12:41:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \CM\assets\js\app.js
 */
;
!function (top) {
    "use strict";

    var app = {
        base: "https://localhost:5001",
        keys: {
            accessTokenKey: "dev_access_token",
            refreshTokenKey: "dev_refresh_token",
            clientIdKey: "dev_client_id",
            //登录失败次数Key,值 > 3 须输入验证码
            loginFailedNumKey: "dev_login_failed_num"
        },

        methods: {
            getClientId: function () {
                var clientId = sessionStorage.getItem(app.keys.clientIdKey) || app.helper.guid();
                sessionStorage.setItem(app.keys.clientIdKey, clientId);
                return clientId;
            },
            setClientId: function (value) {
                sessionStorage.setItem(app.keys.clientIdKey, value);
            },
            getAccessToken: function () {
                return sessionStorage.getItem(app.keys.accessTokenKey);
            },
            setAccessToken: function (value) {
                return sessionStorage.setItem(app.keys.accessTokenKey, value);
            },
            getLoginFailedNum: function () {
                var failedNum = sessionStorage.getItem(app.keys.loginFailedNumKey) || 0;
                sessionStorage.setItem(app.keys.loginFailedNumKey, failedNum);
                return parseInt(failedNum);
            },
            setLoginFailedNum: function (value) {
                sessionStorage.setItem(app.keys.loginFailedNumKey, value);
            },
            getRequestHeader: function () {
                var res = {};
                var token = this.getAccessToken();
                if (token) {
                    res.Authorization = "Bearer " + token;
                    res.client_id = this.getClientId();
                } else {

                }
            }
        },


    }
    top.app = app;

} (window.top);