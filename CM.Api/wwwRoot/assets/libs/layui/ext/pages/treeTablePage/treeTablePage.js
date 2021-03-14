layui.define(['element', 'jquery', 'treeTable', 'laypage','laytpl'], function (exports) {
    var MOD_NAME = 'treeTablePage',
        element = layui.element,
        $ = layui.jquery,
        treeTable = layui.treeTable,
        laypage = layui.laypage,
        laytpl = layui.laytpl,
        treeTablePage = function () { };

    //if (typeof ($.pglayout) == undefined || $.pglayout == null) {
    layui.link(layui.cache.base + 'pages/treeTablePage/treeTablePage.css');

    //}

    treeTablePage.prototype.config = function () {
        return {            
            elem: {},                      // 盒子节点不能为空
            toolbar: {                     
                searchFieldName: '',       // 模糊搜索字段名
                conditions: [],            // 附加的查询条件
                                           // [{fieldName:'',text:'',dataType:'string'}]
                buttons: [
                    { event: 'del', icon: '&#xe640;', text: '批删' }
                ]                          // 自定义工具栏按钮
            },
            table: {                       // 树状数据表格
                data: [],                  // 表格数据
                tableOptions: {            // 表格render选项
                    primary_key: 'id',
                    parent_key: 'pid',
                    icon_key: 'Name',      // 树状层级图标展示的字段名
                    is_checkbox: false,    // 是否显示筛选框
                    cols: []               // 显示字段设置

                }
            },
            events: {
                search: function () {
                    layui.layer.msg("事件处理程序未定义");
                },
                adv: {},
                rowDouble: function (ev) { }
            },            
            
        };
    }

    function getBtnSkin(index) {//index:0-6
        var res='';
        var skins=['layui-btn-primary', '', 'layui-btn-normal', 'layui-btn-warm', 'layui-btn-danger', 'layui-btn-disabled','layui-btn-success'];
        if (!index) {
            index=0;
        }
        if (index >= 0 && index < skins.length) {
            res=skins[index];
        }
        return res;
    }

    treeTablePage.prototype.init = function (e) {
        var t = this;
        e = $.extend(t.config(), e);

        var toolbarOpts = {
            name: e.toolbar.searchFieldName || 'Name',
            conditions: function () {
                var list = [];
                var dataTypeTemplates = {
                    string: [
                        '<div class="layui-inline">',
                        '   <input class="layui-input" style="height:30px" name="{{d.fieldName}}" placeholder="{{d.text}}" autocomplete="off">',
                        '</div>',
                    ].join('')
                };
                e.toolbar.conditions.forEach(item => {
                    laytpl(dataTypeTemplates[item.dataType]).render(item, function (s2) {
                            list.push(s2);
                        })
                })
                return list.join('');
            }(),
            buttons: function () {
                var btnArray = [];
                e.toolbar.buttons.forEach(item => {
                    item.skin = item.skin != null ? getBtnSkin(item.skin) : '';
                    laytpl([
                        '<button class="layui-btn {{d.skin}} layui-btn-sm"  lay-filter="toolbar"  lay-event="{{d.event}}">'
                        , '     <i class= "layui-icon" > {{ d.icon }}</i > {{ d.text }}'
                        , '</button > '].join('')).render(item, function (s2) {
                            btnArray.push(s2);
                        })
                })
                return btnArray.join('');
            }()

        };
        laytpl([
            '<div class="layui-card layui-card-offset">'
            , ' <div class="layui-card-body">'
            , '     <div class="layui-table-tool">'
            , '         {{d.conditions}}'
            , '         <div class="layui-inline">'
            , '             <input class="layui-input" style="height:30px" name="{{d.name}}" id="txtKey" placeholder="关键字" autocomplete="off">'
            , '         </div>'
            , '         <div class="layui-inline ">'
            , '             <button class="layui-btn layui-btn-sm" data-type="reload" lay-filter="toolbar" lay-event="search"><i class="layui-icon layui-icon-search"></i>搜索</button>'
            , '         </div>'
            , '         <div class="layui-inline ">'
            , '             <a title="高级搜索" class="layui-btn-icon" lay-event="adv"  lay-filter="toolbar" ><i class="layui-icon layui-icon-set-fill"></i></a>'
            , '         </div>'
            , '         <div class="layui-inline" style="float:right">'
            , '             <div class="layui-inline"><a title="刷新" class="layui-btn-icon" onclick="location.reload()"><i class="layui-icon ">&#xe9aa;</i></a></div>'
            , '             <div class="layui-btn-group">'
            , '                 {{d.buttons}}'
            , '             </div>'
            , '         </div>'
            , '     </div>'
            , ' </div>'
            , '<div class="layui-card-body">'
            , ' <table class="layui-table" id="tab" lay-filter="tab" lay-size="xs"></table>'
            , ' <div  id="pager"></div>'
            , '</div>',
            '</div>'
        ].join('')).render(toolbarOpts, function (s) {
                e.elem.innerHTML = s;
        });        

        //绑定双击事件
        $(document).on('dblclick', function (obj) {
            //obj.stopImmediatePropagation && obj.stopImmediatePropagation();
            var srcObj = obj.target;


            var tr = $(srcObj).parents('[data-id]'), tdata = null;
            if (tr.length>0) {
                tdata = {
                    id: tr.data('id'),
                    pid: tr.data('pid')
                };
                srcObj["data"] = tdata;
                var eventName = 'rowDouble';
                if (eventName && e.events[eventName])
                    e.events[eventName](srcObj);
                else {
                    //var item = {
                    //    msg: '事件处理未定义',
                    //    event: eventName,
                    //    filter: '无'
                    //};
                    //laytpl([
                    //    '错误消息：{{d.msg}}\n'
                    //    , '<br/>事件名称：{{d.event}}\n'
                    //    , '<br/>过滤条件：{{d.filter}}'
                    //].join('')).render(item, function (s) {
                    //    layui.layer.msg(s)
                    //})
                }
            }

            
           

        });


        //绑定点击事件
        $(document).on('click', '*[lay-event]', function (obj) {
            //console.log(obj);
            obj.stopImmediatePropagation && obj.stopImmediatePropagation();
            var srcObj = obj.currentTarget;
            
            var tr = $(this).parents('[data-id]'), tdata = {
                id: tr.data('id'),
                pid: tr.data('pid')
            };
            srcObj["data"] = tdata;
            //if (srcObj.attributes['lay-filter'].value == 'toolbar') {
            var eventName = srcObj.attributes['lay-event'].value;
            if (eventName && e.events[eventName])
                e.events[eventName](srcObj);
            else {
                var item = {
                    msg: '事件处理未定义',
                    event: srcObj.attributes['lay-event'] ? srcObj.attributes['lay-event'].value:'无',
                    filter: srcObj.attributes['lay-filter'] ? srcObj.attributes['lay-filter'].value:'无'
                };
                laytpl([
                    '错误消息：{{d.msg}}\n'
                    , '<br/>事件名称：{{d.event}}\n'
                    , '<br/>过滤条件：{{d.filter}}'
                ].join('')).render(item, function (s) {
                    layui.layer.msg(s)
                })

            }

            //}
        });

        treeTable.on('tree(add)', function (data) {
            layer.msg(JSON.stringify(data));
        })

        

        var opts = $.extend({
            elem: '#tab',
            data: e.table.data.data || [],
            end: function (el) {
                if (opts.data.length > 0) {
                    $("#pager").removeClass('table-none');
                    laypage.render({
                        elem: 'pager'
                        , count: e.table.data.count
                        , layout: ['count']
                        , jump: function (obj) {
                            console.log(obj)
                        }
                    });
                } else {
                    $("#pager").addClass('table-none').html('<img src="' + layui.cache.base + 'pages/treeTablePage/zanwu.jpg">');
                }
            }
        }, e.table.tableOptions);
        //绑定表格数据
        treeTable.render(opts);
        
    }

    treeTablePage.prototype.render = function(e){
        var t = this;
        e = $.extend(t.config(), e);
        this.init(e);
    }

    treeTablePage.prototype.rowbarRender = function (btns) {
        var list = [];
        btns = btns || [{ event: 'del', icon: '&#xe640;', text: '删除' }];
        btns.forEach(function (item) {
            laytpl([
                '<a lay-event="{{d.event}}" href="javascript:;" title="{{d.text}}">',
                '   <i class="layui-icon">{{d.icon}}</i>',
                '</a>'
            ].join('')).render(item, function (s) {
                    list.push(s);
            })
        })
        return list.join('');
    }

    treeTablePage.prototype.getSearchOptions = function () {
        var opts = {};

        $('.layui-table-tool .layui-input').each(function (index,item) {
            opts[item.name] = item.value;
        })

        return opts;
    }


    var obj = new treeTablePage();
    
    exports(MOD_NAME, obj);
})