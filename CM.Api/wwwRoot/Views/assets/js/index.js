layui.use(['layer', 'element', 'jquery'], function () {
    layer = layui.layer;
    element = layui.element;
    $ = layui.jquery;
     
    var app = layui.app;

    top.refreshCurrentTab = function () {
        $("[lay-filter='xbs_tab'] .layui-tab-content .layui-show iframe")[0].contentWindow.location.reload();
    }

    var bus = {
        bindMenus: function (menus) {
            $('#nav').html('');

            var opt = {
                data: []
            };
            menus.forEach(function (item) {
                opt.data.push({
                    id: item.ID,
                    name: item.Name,
                    url: item.Url,
                    icon: item.Icon || '',
                    parentId: item.FatherId,
                    type: 0,
                    orderNo: item.Sort
                });
            })
            xadmin.menuList = opt.data;

            var topopt = {
                data: xadmin.getMenuChildren(0, 1)
            }
            xadmin.showTopMenu(topopt)
            var firstopt = {
                data: xadmin.getMenuChildren(topopt.data[0].id)
            }
            xadmin.showLeftNav(firstopt)
            element.init();
        }
    };


    app.httpAsync('GET', '/api/menu/1', {}, function (res) {
        if (res && res.code == "200") {
            bus.bindMenus(res.data);
            console.log(res.data);
        }
            
    //    else
    //        window.top.location.href="login.html"

    });
})