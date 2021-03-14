/*
 * @Author: your name
 * @Date: 2020-02-28 11:47:49
 * @LastEditTime: 2020-03-02 14:10:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \CM\pc\scripts\index.js
 */
layui.use(["layer", "element", "jquery"], function () {
    layer = layui.layer;
    element = layui.element;
    $ = layui.jquery;

    top.refreshCurrentTab = function () {
        $(
            "[lay-filter='xbs_tab'] .layui-tab-content .layui-show iframe"
        )[0].contentWindow.location.reload();
    };

    var bus = {
        bindMenus: function (menus) {
            $("#nav").html("");

            var opt = {
                data: []
            };
            menus.forEach(function (item) {
                opt.data.push({
                    id: item.id,
                    name: item.name,
                    url: item.url,
                    icon: item.icon || "",
                    parentId: item.parentId,
                    type: 0,
                    orderNo: item.orderNo
                });
            });
            xadmin.menuList = opt.data;

            var topopt = {
                data: xadmin.getMenuChildren(0, 1)
            };
            xadmin.showTopMenu(topopt);
            var firstopt = {
                data: xadmin.getMenuChildren(topopt.data[0].id)
            };
            xadmin.showLeftNav(firstopt);
            element.init();
        }
    };

    //app.httpAsync('GET', './json/menu.json', {}, {}, function (res) {
    //    if (res && res.code == "200") {
    //        bus.bindMenus(res.data);
    //        // console.log(res.data);
    //    }

    //    else
    //        window.top.location.href = "login.html"


    //});
    var user = JSON.parse(sessionStorage.getItem("token"));
    if (user && user.token) {
        $("#username").text(user.username);
        var url = '/api/menu/user/' + user.userid;
        app.httpAsync('GET', url, {}, {}, function (res) {
            if (res && res.code == "200") {
                bus.bindMenus(res.data);
                // console.log(res.data);
            }
            else
                app.alert.error(res.msg);
        });
    }


    //else
    //    window.top.location.href="login.html"
});