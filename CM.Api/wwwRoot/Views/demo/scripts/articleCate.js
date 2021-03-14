layui.use(['element', 'treeTable', 'layer', 'form', 'laypage'], function () {
    var $ = layui.jquery;
    var element = layui.element;
    var table = layui.treeTable;
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;


    $.extend(table, {
        init: function () {
            //监听行工具栏事件addSub
            table.on('tree(addSub)', function (obj) {
                //console.log(obj);
                table.addSub(obj.item);
            });
            //监听行工具栏事件rowEdit
            table.on('tree(rowEdit)', function (obj) {
                //console.log(obj);
                //alert("行编辑");
                table.rowEdit(obj.item);
            });
            //监听行工具栏事件rowDel
            table.on('tree(rowDel)', function (obj) {
                //console.log(obj);
                //alert("行删除");
                table.rowDel(obj);

            });
            //监听工具栏“添加”按钮点击事件
            $("#btnAdd").on("click", function () {
                table.add();
            })
        },       // 页面初始化事件绑定方法
        showAll: function () {
            var index = layer.load(2);  // 数据加载等待的动画
            $.ajax({
                type: "GET",
                //url: "/api/Category",
                url: "json/treetable.json",
                data: {
                    token: "itg"
                },
                dataType: "json",
                success: function (data) {
                    table.show(data);
                    layer.close(index); // 关闭数据加载等待的动画
                    
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    layer.close(index);
                }

            });

        },    // 显示所有栏目档案方法
        show: function (mydata) {
            //格式转化
            var dataList = [];
            mydata.data.forEach(item => {
                dataList.push({
                    id: item.id,
                    Name: item.name,
                    pid: item.parentCategoryId,
                    Sort: item.displaySequence
                })
            });
            table.render({
                elem: '#tab',
                data: dataList,
                icon_key: 'Name',
                is_checkbox: false,
                end: function (e) {
                    form.render();
                    laypage.render({
                        elem: 'pager'
                        , count: mydata.count
                        , layout: ['count']
                        , jump: function (obj) {
                            console.log(obj)
                        }
                    });
                },
                cols: [

                    {
                        key: 'id',
                        title: 'ID',
                        width: '50px',
                        align: 'center',
                    },
                    {
                        key: 'Name',
                        title: '栏目名称',
                        template: function (item) {
                            //console.log(item);
                            if (item.level == 0 && (!item.is_end)) {
                                return '<span style="font-weight:bold">' + item.Name + '</span>';
                            } else 
                                return '<span>' + item.Name + '</span>';
                            
                        }
                    },
                    {
                        key: 'Sort',
                        title: '排序号',
                        width: '50px',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: '250px',
                        template: function (item) {
                            return $("#rowBar").html();
                        }
                    }
                ]
            });

        }, // 显示给定数据的栏目档案方法
        add: function () {
            layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '文章栏目',
                area: ['720px', '500px'],
                maxmin: true,
                content: ['articleCateAdd.html', 'no']
            });
        },     // 添加栏目方法
        addSub: function (data) {
            var tb = "add";
            var fkey = tb + '_category_' + data.id;
            layui.data(tb, {
                key: fkey,
                value: data
            });
            layer.open({
                type: 2, //此处以iframe举例   
                title: '添加下级栏目',
                area: ['720px', '500px'],
                shade: 0,
                maxmin: true,
                content: ['articleCateAdd.html?add=' + fkey, 'no']
            });
        }, // 添加子栏目方法
        adv: function (obj) {
            alert('高级搜索');
        },     // 高级搜索方法
        delAll: function (obj) {
            alert('delAll');
        },  // 删除所选方法
        search: function (obj) {
            //alert('reload');
            var myurl = "/api/Category";
            var key = $("#demoReload").val();
            if (key != "") {
                myurl = myurl + "/" + key;
            }

            $.ajax({
                type: "GET",
                url: myurl,
                data: {
                    token: "itg"
                },
                dataType: "json",
                success: function (data) {
                    table.show(data);
                }
            });

        },  // 关键字搜索方法
        rowDel: function (data) {
            console.log(data);
            layer.confirm('您确定要删除?', {
                icon: 3,
                title: '提示'
            }, function (index) {
                //do something
                $.ajax({
                    url: "/api/category/" + data.item.id,
                    type: "DELETE",
                    success: function (result) {
                        table.showAll();
                    }
                });
                layer.close(index);
            });
        }, // 行删除方法
        rowEdit: function (data) {
            //alert('rowEdit');
            // console.log(data);
            var tb = "edit";
            var fkey = tb + '_category_' + data.id;
            layui.data(tb, {
                key: fkey,
                value: data
            });
            layer.open({
                type: 2, //此处以iframe举例   
                title: '编辑栏目档案',
                area: ['720px', '500px'],
                shade: 0,
                maxmin: true,
                content: ['articleCateAdd.html?edit=' + fkey, 'no']
            });

        } // 行编辑方法
    });

    table.init();
    table.showAll();
    
});