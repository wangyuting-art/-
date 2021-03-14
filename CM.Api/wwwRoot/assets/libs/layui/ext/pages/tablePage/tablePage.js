layui.define(['element', 'jquery', 'table', 'laytpl'], function (exports) {
    var MOD_NAME='tablePage',
        element=layui.element,
        $=layui.jquery,
        table=layui.table,
        laytpl = layui.laytpl, tablePage = function () { };

    tablePage.colCellCompleted = [];  //自定义列回调
    tablePage.colValidators = []; //自定义列验证
    //tablePage.cellValidatedSuccess = new Array(); //为表单提交检验全部数据是否已验证
    tablePage.validAllCells = function (matrix) {
        if (matrix) {
            //matrix = tablePage.cellValidatedSuccess;
        }
        var flag = true;
        for (var i = 0; i < matrix.length; i++) {
            if (matrix[i] === false) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    tablePage.findTableId = function (ev) {
        var p = $(ev).parentsUntil('div.layui-card-body');
        return $(p[p.length - 1]).attr('lay-id');
    }
    tablePage.findColIndex = function (ev) {
        var p = $(ev).parentsUntil('td');
        var t = $(p[p.length - 1]).parent();
        return t[0].cellIndex;
    }
    tablePage.findRowIndex = function (ev) {
        var p = $(ev).parentsUntil('tr');
        var t = $(p[p.length - 1]).parent();
        return t[0].rowIndex;
    }
    tablePage.tableRefresh = function (ev, opts) {
        opts = opts || {};
        table.reload(ev.config.id,opts);
        if (ev.config['defaultToolbar'] && ev.config['defaultToolbar'].length == 0) {
            $('.layui-table-tool-temp').css('padding-right', '0');
        } else {
            $('.layui-table-tool-temp').css('padding-right', '120px');
        }
    }


    //if (typeof ($.pglayout) == undefined || $.pglayout == null) {
        layui.link(layui.cache.base + 'pages/tablePage/tablePage.css');
        
    //}

    function getBtnSkin(index) {//index:0-5
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


    var eventHander = {
        getNextId: function (id,keyCode) {
            var nextid='', keys = id ? id.split('-') : [], ikeys = [];
            for (var i = 1; i < keys.length; i++) {
                ikeys[i - 1] = parseInt(keys[i]);
            }
            if (ikeys.length > 0) {
                var rowIndex = ikeys[0], colIndex = ikeys[2];
                var tr = $('#' + id).parent().parent().parent(), fieldcount = tr.children().length;
                if (keyCode == 13) { //enter
                    var flag = false;
                    for (var i = colIndex + 1; i <= fieldcount; i++) {
                        nextid = keys[0] + '-' + rowIndex + '-' + ikeys[1] + '-' + i;
                        if ($('#' + nextid).length) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {//新增行或下行第一列
                        rowIndex = rowIndex + 1;
                        nextid = keys[0] + '-' + rowIndex + '-' + ikeys[1] + '-' + 1;
                    }
                    //if (!flag) {// 移动下行,从头开始找，如果是最后一行最后一列，则不动或新增行
                    //    rowIndex = rowIndex + 1;
                    //    for (var i = 1; i <= fieldcount; i++) {
                    //        nextid = keys[0] + '-' + rowIndex + '-' + ikeys[1] + '-' + i;
                    //        if ($('#' + nextid).length) {
                    //            flag = true;
                    //            break;
                    //        }
                    //    }
                    //    if (!flag) {//新增行
                    //        rowIndex = rowIndex + 1;
                    //        nextid = keys[0] + '-' + rowIndex + '-' + ikeys[1] + '-' + 1;
                    //    }
                    //}
                } else if (keyCode == 38) { //up
                    rowIndex = rowIndex - 1;
                    nextid = keys[0] + '-' + rowIndex + '-' + ikeys[1] + '-' + ikeys[2];
                    if ($('#' + nextid).length) {

                    } else {
                        nextid = id;
                    }

                } else if (keyCode == 40) { //down
                    rowIndex = rowIndex + 1;
                    nextid = keys[0] + '-' + rowIndex + '-' + ikeys[1] + '-' + ikeys[2];
                    if ($('#' + nextid).length) {

                    } else {
                        nextid = id;
                    }
                }
            }
            return nextid;
        },
        setNextFocus: function (next_id,ev) {
            var nextid = '#' + next_id;
            if ($(nextid).length) {//
                if ($(nextid).prop("tagName") == 'SELECT') {
                    if ($(nextid).parent().hasClass('layui-form-selected')) {

                    } else {
                        var select_input = $(nextid).next().find('.layui-select-title input');
                        select_input.click();
                        select_input.focus();
                    }

                } else if ($(nextid).prop("tagName") == 'INPUT') {
                    $(nextid).focus();
                }

            } else { //新增行
                eventHander.cellInputTextBlur(ev);//先保存
                var emptyLine = {};
                var tableid = tablePage.findTableId(ev.target);
                var mytable = table[tableid];
                mytable && mytable.cols[0].forEach(it => {
                    if (it.field) {
                        emptyLine[it.field] = "";
                        if (it.hasOwnProperty("defaultValue")) {
                            emptyLine[it.field] = it.defaultValue;
                        }
                    }
                });
                table.cache[tableid].push(emptyLine);
                //tablePage.tableRefresh(ev.target, { data: table.cache[tableid] });
                opts = { data: table.cache[tableid] };
                table.reload(tableid, opts);
                if (mytable['defaultToolbar'] && mytable['defaultToolbar'].length == 0) {
                    $('.layui-table-tool-temp').css('padding-right', '0');
                } else {
                    $('.layui-table-tool-temp').css('padding-right', '120px');
                }
                eventHander.setNextFocus(next_id,ev);
            }
        },
        //input text keydown事件处理程序
        cellInputTextKeyDown: function (ev) {
            ev.stopImmediatePropagation();
            var nextid = eventHander.getNextId(ev.target.id, ev.keyCode);
            var t = ev.target.id.split('-'), fieldIndex = parseInt(t[t.length - 1]);

            var cellEvent = tablePage.colCellCompleted[fieldIndex];
            if (cellEvent) {
                cellEvent(ev.target.id, nextid);
            }
            nextid && eventHander.setNextFocus(nextid,ev);


        },
        //select 
        cellSelectChanged: function (ev) {
            //var t = ev.elem.id.split('-'), fieldIndex = parseInt(t[t.length - 1]);
            var rowIndex = tablePage.findRowIndex(ev.elem);
            var fieldIndex = tablePage.findColIndex(ev.elem);
            var id = tablePage.findTableId(ev.elem);
            var mytab = table[id];

            var nextid = eventHander.getNextId(ev.elem.id, 13);
            var cellEvent = tablePage.colCellCompleted[fieldIndex];
            if (cellEvent) {
                cellEvent(ev.value, nextid);
            }

            if (mytab) {
                if (ev.value) {
                    var oitem = (new Function('return ' + ev.value))();
                    var f = mytab.cols[0][fieldIndex].field;
                    if (f && table.cache[id]) {
                        table.cache[id][rowIndex][f] = parseInt(oitem.id);
                    }                    
                }
            }

            eventHander.setNextFocus(nextid,ev);
        },
        cellSwitchChanged: function (ev) {
            var rowIndex = tablePage.findRowIndex(ev.elem);
            var fieldIndex = tablePage.findColIndex(ev.elem);
            var id = tablePage.findTableId(ev.elem);
            var mytab = table[id];

            var cellEvent = tablePage.colCellCompleted[fieldIndex];
            if (cellEvent) {
                cellEvent(ev.value, nextid);
            }

            if (mytab) {
                var f = mytab.cols[0][fieldIndex].field;
                if (f && table.cache[id]) {
                    table.cache[id][rowIndex][f] = 1 - table.cache[id][rowIndex][f];                 
                }
            }
        },
        //input text blur事件处理程序
        cellInputTextBlur: function (ev) {
            ev.stopImmediatePropagation();
            var rowIndex = tablePage.findRowIndex(ev.target);
            var fieldIndex = tablePage.findColIndex(ev.target);
            var id = tablePage.findTableId(ev.target);
            var mytab = table[id];

            var validator = tablePage.colValidators[fieldIndex];
            var vflag = true;
            if (validator) {
                if (!new RegExp(validator.regx).test($(ev.target).val())) {
                    $(ev.target).css('border-color', 'red');
                    layer.msg(validator.err);
                    //$(ev.target).focus();
                    //tablePage.cellValidatedSuccess[rowIndex][fieldIndex] = false;
                    vflag = false;
                } else {
                    $(ev.target).css('border-color', '#e6e6e6');
                }                
            }
            if (vflag) {
                if (mytab) {
                    var f = mytab.cols[0][fieldIndex].field;
                    if (f && table.cache[id]) {
                        table.cache[id][rowIndex][f] = $(ev.target).val();
                    }
                }
                //tablePage.cellValidatedSuccess[rowIndex][fieldIndex] = true;
            }
        },
        //input text focus事件处理程序
        cellInputTextFocus: function (ev) {
            ev.stopImmediatePropagation();
            $(ev.target).select();
        }
    }
    tablePage.prototype.config=function () {
        return {            
            elem: {},                      // 盒子jQuery节点不能为空            
            toolbar: {                     
                searchFieldName: 'Name',       // 模糊搜索字段名
                conditions: [],            // 附加的查询条件
                                           // [{fieldName:'',text:'',dataType:'string'}]
                adv: true,
                buttons: [
                    //{ event: 'del', icon: '&#xe640;', text: '批删' }
                ]                          // 自定义工具栏按钮
            },
            table: {                       // 数据表格选项 与layui.table.render() 参数一致                
                data: [],                  // 表格数据，layui标准数据格式，data.data才是数据
                tableOptions: {            // 表格render选项  
                    elem: '#tab',          // 挂载的dom,string or object
                    id: null,              // table 容器的id
                    skin: 'line',
                    page: {
                        count: 10,
                        limit: 10,
                        limits: [10, 20, 30, 50],
                        layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
                        jump: function (obj) {
                            console.log(obj)
                        }
                    },
                    cols: []               // 显示字段设置
                }
            },
            events: {
                search: function () {
                    layui.layer.msg("事件处理程序未定义");
                },
                delAll: function (ev) {

                },
                add: function (ev) {
                    //增加空行
                    var emptyLine = {};
                    ev.config.cols[0].forEach(it => {
                        if (it.field) {
                            emptyLine[it.field] = "";
                            if (it.hasOwnProperty("defaultValue")) {
                                emptyLine[it.field] = it.defaultValue;
                            }
                        }
                    });
                    ev.config.data.push(emptyLine);
                    var nextid = 'id' + '-' + ev.config.data.length + '-' + '0-1';
                    tablePage.tableRefresh(ev, { data: ev.config.data });                    
                    eventHander.setNextFocus(nextid, ev);
                },
                rowDouble: function (ev) {}
            },            
            
        };
    }

    
    tablePage.prototype.init=function (e) {
        var t = this;
        e = $.extend(true, t.config(), e);
        var realId=e.table.tableOptions.id ? e.table.tableOptions.id : 'tab';
        e.table.tableOptions.elem='#' + realId;
        //初始化页面结构
        e.elem.html([
            '<div class="layui-card">'
            , '<div class="layui-card-body">'
            , ' <table class="layui-table" id="' + realId + '" lay-filter="' + realId + '"></table>'
            , '</div>',
            '</div>'
        ].join(''));

        var preButtons = {
            moveUp: { event: 'DEV_moveUp', icon: '&#xe619;', text: '上移' },
            moveDown: { event: 'DEV_moveDown', icon: '&#xe61a;', text: '下移' },
            refresh: { event: 'DEV_refresh', icon: '&#xe9aa;', text: '刷新' },
            delAll: { event: 'DEV_delAll', icon: '&#xe640;', text: '批删'}
        };

        var toolbarOpts = {
            //左侧按钮
            customButtons: function () {
                var btnArray = [];
                btnArray.push('<div class="layui-inline">');
                e.toolbar.customButtons && e.toolbar.customButtons.forEach(item => {
                    //item.skin  自定义按钮的主题色
                    //item.event 自定义按钮的事件名
                    //item.icon  自定义按钮的图标
                    //item.text  自定义按钮的文本
                    //item.type  内置预定义的按钮
                    //item.style 以控件呈现 默认：button｜tip
                    if (!item.style || item.style == "button") {
                        if (item.type) {
                            if (preButtons[item.type]) {
                                item = $.extend(item, preButtons[item.type]);
                            }
                        }
                        item.skin = item.skin != null ? getBtnSkin(item.skin) : '';
                        laytpl([
                            '<button class="layui-btn {{d.skin}} layui-btn-sm"  lay-filter="toolbar"  lay-event="{{d.event}}">'
                            , '     <i class= "layui-icon" > {{ d.icon }}</i > {{ d.text }}'
                            , '</button > '].join('')).render(item, function (s2) {
                                btnArray.push(s2);
                            })
                    } else if (item.style == "tip") {
                        laytpl('<span class="layui-badge">{{ d.type }}</span><span class="tip">{{d.text}}</span>').render(item, function (s2) {
                                btnArray.push(s2);
                            })
                    }

                })
                btnArray.push('</div>');
                return btnArray.join('');
            }(),
            //搜索文本框
            searchKey: function () {
                var h5 = "";
                if (e.toolbar.searchFieldName) {
                    h5 = laytpl([
                        ' <div class="layui-inline">'
                        , '        <input class="layui-input" style="height:30px" name="{{d.name}}" placeholder="关键字" autocomplete="off">'
                        , ' </div>'
                        , ' <div class="layui-inline ">'
                        , '        <button class="layui-btn layui-btn-sm" lay-filter="toolbar" lay-event="search"><i class="layui-icon layui-icon-search"></i>搜索</button>'
                        , ' </div>'
                    ].join('')).render({ name: e.toolbar.searchFieldName });
                }
                return h5;
            }(),
            //其他搜索条件
            conditions: function () {
                var list=[];
                var dataTypeTemplates={
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
            //高级搜索
            adv: function () {
                var h5 = "";
                if (e.toolbar.adv) {
                    h5 = [
                        ' <div class="layui-inline ">'
                        , '        <a title="高级搜索" class="layui-btn-icon layui-btn-icon-pointer" lay-event="adv"  lay-filter="toolbar" ><i class="layui-icon layui-icon-set-fill"></i></a>'
                        , ' </div>'
                    ].join('');
                }
                return h5;
            }(),
            //右侧自定义按钮
            buttons: function () {
                var btnArray=[];
                e.toolbar.buttons&&e.toolbar.buttons.forEach(item => {
                    if (item.type) {
                        if (preButtons[item.type]) {
                            item = $.extend(item, preButtons[item.type]);
                        }
                    }
                    item.skin = item.skin != null ? getBtnSkin(item.skin) : '';
                    
                    laytpl([
                        '<button class="layui-btn {{d.skin}} layui-btn-sm"  lay-filter="toolbar"  lay-event="{{d.event}}">'
                        , '     <i class= "layui-icon" > {{ d.icon }}</i > {{ d.text }}'
                        , '</button > '].join('')).render(item, function (s2) {
                            btnArray.push(s2);
                        })
                })
                return btnArray.join('');
            }(),
            defaultEventHanders: {                
                //处理选中行向上移动
                DEV_moveUp: function (ev) {
                    var tabid = ev.config.id;

                    for (var i = 0; i < table.cache[tabid].length; i++) {
                        if (i > 0 && table.cache[tabid][i][table.config.checkName]) {

                            var t = table.cache[tabid][i - 1];
                            if (!t[table.config.checkName]) {
                                table.cache[tabid][i - 1] = table.cache[tabid][i];
                                table.cache[tabid][i] = t;
                            }
                        }
                    }

                    tablePage.tableRefresh(ev, { data: table.cache[tabid] });

                },
                //处理选中行向下移动
                DEV_moveDown: function (ev) {
                    var tabid = ev.config.id;

                    for (var i = table.cache[tabid].length - 1;i>=0; i--) {
                        if (i < table.cache[tabid].length - 1 && table.cache[tabid][i][table.config.checkName]) {
                            var t = table.cache[tabid][i + 1];
                            if (!t[table.config.checkName]) {
                                table.cache[tabid][i + 1] = table.cache[tabid][i];
                                table.cache[tabid][i] = t;
                            }
                        }
                    }

                    tablePage.tableRefresh(ev, { data: table.cache[tabid] });
                },
                //处理刷新点击事件
                DEV_refresh: function (ev) {
                    //tablePage.tableRefresh(ev);
                    location.reload();
                },
                DEV_delAll: function (ev) {
                    var tabid = ev.config.id;

                    for (var i = table.cache[tabid].length - 1; i >= 0; i--) {
                        if (table.cache[tabid][i][table.config.checkName]) {
                            table.cache[tabid].splice(i, 1);
                        }
                    }

                    tablePage.tableRefresh(ev, { data: table.cache[tabid] });
                },
                

            }

        };
                
        var toolbar=laytpl([
            '<div>'
            , '  {{d.customButtons}}'
            , '  {{d.conditions}}'
            , '  {{d.searchKey}}'            
            , '  {{d.adv}}' 
            , ' <div class="layui-inline" style="float:right">'
            , '    <div class="layui-inline"><a title="刷新" class="layui-btn-icon layui-btn-icon-pointer" lay-filter="toolbar" lay-event="DEV_refresh"><i class="layui-icon ">&#xe9aa;</i></a></div>'
            , '    <div class="layui-btn-group">'
            , '         {{d.buttons}}'
            , '    </div>'
            , ' </div>'
            , ' </div>'
        ].join('')).render(toolbarOpts);

        
        var opts=$.extend({
            toolbar: toolbar,
            height:'full-35',
            data: e.table.data || [],            
            done: function (res, curr, count) {
                if (count <= 0) {
                    $('.layui-none').html('<img src="' + layui.cache.base + 'pages/tablePage/zanwu.jpg"/>');
                } else {
                    table[this.id] = this;//将当前表格对象暂存，为处理事件提供数据
                    //绑定单元格templet动态组件事件
                    $('.layui-table-cell input[lay-filter="dy-cell-text"]').on('keydown', eventHander.cellInputTextKeyDown)
                    layui.form.on('select(dy-cell-select)', eventHander.cellSelectChanged);
                    layui.form.on('switch(dy-cell-switch)', eventHander.cellSwitchChanged);
                    $('.layui-table-cell input[lay-filter="dy-cell-text"]').on('blur', eventHander.cellInputTextBlur)
                    $('.layui-table-cell input[lay-filter="dy-cell-text"]').on('focus', eventHander.cellInputTextFocus)
                    //off('keydown').
                }
            }
        }, e.table.tableOptions);
        //绑定表格数据
        var tabIns=table.render(opts);
        
        if (e.table.tableOptions['defaultToolbar'] && e.table.tableOptions['defaultToolbar'].length == 0) {
            $('.layui-table-tool-temp').css('padding-right', '0');
        } else {
            $('.layui-table-tool-temp').css('padding-right', '120px');
        }
        //监听行工具栏事件
        table.on('tool(' + realId + ')', function (obj) {
            if (e.events[obj.event]) {
                e.events[obj.event](obj);
            } else {
                var item={
                    msg: '事件处理未定义',
                    event: obj.event || '无',
                    filter: $('#tab').attr('lay-filter') || '无'
                };
                laytpl([
                    '错误消息：{{d.msg}}\n'
                    , '<br/>事件名称：{{d.event}}\n'
                    , '<br/>过滤条件：{{d.filter}}'
                ].join('')).render(item, function (s) {
                    layui.layer.msg(s)
                })
            }
        });

        table.on('rowDouble(' + realId + ')', function (obj) {
            if (e.events['rowDouble']) {
                e.events['rowDouble'](obj);
            } else {
                var item = {
                    msg: '事件处理未定义',
                    event: obj.event || 'rowDouble',
                    filter: $('#tab').attr('lay-filter') || '无'
                };
                laytpl([
                    '错误消息：{{d.msg}}\n'
                    , '<br/>事件名称：{{d.event}}\n'
                    , '<br/>过滤条件：{{d.filter}}'
                ].join('')).render(item, function (s) {
                    layui.layer.msg(s)
                })
            }
        });

        //监听行工具栏事件
        table.on('toolbar(' + realId+')', function (obj) {
            var notEvents=['LAYTABLE_COLS', 'LAYTABLE_EXPORT', 'LAYTABLE_PRINT'];
            if (notEvents.indexOf(obj.event) >= 0) { }
            else if (e.events[obj.event]) {//页面传入自定义事件
                e.events[obj.event](obj);
            }
            else if (toolbarOpts.defaultEventHanders[obj.event]) { //预定义按钮事件处理
                 toolbarOpts.defaultEventHanders[obj.event](obj);
            } else {
                var item={
                    msg: '事件处理未定义',
                    event: obj.event || '无',
                    filter: obj.config.elem.attr('lay-filter') || '无'
                };
                laytpl([
                    '错误消息：{{d.msg}}\n'
                    , '<br/>事件名称：{{d.event}}\n'
                    , '<br/>过滤条件：{{d.filter}}'
                ].join('')).render(item, function (s) {
                    layui.layer.msg(s)
                })
            }
        });

        return tabIns;
    }

    tablePage.prototype.render = function (e) {
        return this.init(e);
    }


    tablePage.prototype.resize=function (id) {
        table.resize(id)
    }
    tablePage.prototype.getCache = function () {
        return table.cache;
    }

    tablePage.prototype.rowbarRender=function (btns,templateid) {
        var list = [];
        if (!templateid) templateid = 0;
        //btn:event|icon|text|enabled
        btns = btns || [{ event: 'del', icon: '&#xe640;', text: '删除' }];
        var templatesFrame = [
            [],
            [
                '<div class="layui-btn-group">',
                '</div>'
            ]
        ];
        var templates = [
            [
                '<a lay-event="{{d.event}}" href="javascript:;" title="{{d.text}}" >',
                '   <i class="layui-icon">{{d.icon}}</i>',
                '</a>'
            ].join(''),
            [
                '<button lay-event="{{d.event}}" type="button" title="{{d.text}}" {{d.disabled}} class="layui-btn layui-btn-xs layui-btn-primary-1 {{d.disabledClass}}">',
                '<i class="layui-icon">{{d.icon}}</i>',
                '{{d.text}}',
                '</button>'
            ].join(''),
        ];
        if (templatesFrame[templateid].length > 0)
            list.push(templatesFrame[templateid][0]);
        btns.forEach(function (item) {
            if (!item.enabled) {
                item["disabled"] = "disabled";
                item["disabledClass"] = "layui-disabled";
            } else {
                item["disabled"] = "";
                item["disabledClass"] = "";
            }
            laytpl(templates[templateid]).render(item, function (s) {
                    list.push(s);
            })
        })
        if (templatesFrame[templateid].length > 0)
            list.push(templatesFrame[templateid][1]);
        return list.join('');
    }
    tablePage.prototype.statusFieldRender = function (status,array) {
        //statusArray:状态数组，每项：{color:0,text:""}
        var codeStyle = ["layui-bg-blue", "layui-bg-green-2", "layui-bg-gray",  "layui-bg-cyan", "","layui-bg-orange","layui-bg-black"];
        var t = { color: "", text: "状态码超出范围" }, tindex = -1, list = [], flag = true;
        if (status < array.length) {
            array.forEach(function (it, index) {
                var item = {};
                if (it["color"] < codeStyle.length) {
                    item["color"] = codeStyle[it["color"]];
                } else {
                    item["color"] = "";
                }
                item["text"] = array[index]["text"];
                list.push(item);
            })
            t = list[status];
        }

        return laytpl('<span class="layui-badge {{d.color}}">{{d.text}}</span>').render(t);
    }
    tablePage.prototype.fieldRender = function (el, o, type, ref,callback,validate) {
        //el:行数据对象  o:templet的this对象 type: 显示类型
        //refdata: 参数值，[{text,rowType,length,seleted}] 

        //注册自定义列完成回调
        var fieldIndex = parseInt(o.key.split('-')[1]);
        if (!tablePage.colCellCompleted[fieldIndex]) {
            tablePage.colCellCompleted[fieldIndex] = callback;
        }
        if (!tablePage.colValidators[fieldIndex]) {
            tablePage.colValidators[fieldIndex] = validate;
        } 

        var types = ['text', 'select', 'radio', 'checkbox', 'switch', 'date'];        
        var item = {
            id: 'id-' + el.LAY_INDEX + '-' + o.key,
            index: el.LAY_INDEX,
            fieldcount: Object.keys(el).length,
            key: o.key,
            field: o.field,
            value: el[o.field]
        };
        
        var parseHelper={
            text: function () {
                return laytpl([
                    '<input class="layui-input" lay-filter="dy-cell-text" id="{{d.id}}"  value="{{d.value}}" required type = "text" > '
                ].join('')).render(item);
            },
            select: function () {
                var h5Array = ['<select lay-filter="dy-cell-select" id="{{d.id}}" required>'];
                h5Array.push('<option value="">请选择</option>');
                ref && ref.forEach(function (it) {
                    //将it.value的字符串转化成js对象
                    var oitem = (new Function('return ' + it.value))();
                    if (oitem.id == item.value) {
                        it.selected = 1;
                    }
                    if (it.selected) {
                        h5Array.push(laytpl('<option value="{{d.value}}" selected>{{d.text}}</option>').render(it));
                    } else {
                        h5Array.push(laytpl('<option value="{{d.value}}">{{d.text}}</option>').render(it));
                    }
                });
                h5Array.push('</select>');
                return laytpl(h5Array.join('')).render(item);
            },
            radio: function () {
                var h5=[
                    ' <input type="radio" lay-filter="" name="gender" title="男" >'
                    , ' <input type="radio" lay-filter="" name="gender" title="女" >'
                ];
                return h5.join('');
            },
            checkbox: function () {
                var h5=[
                    '<input type="checkbox" name="" lay-skin="primary"><label>男</label>'
                    , '<input type="checkbox" name="" lay-skin="primary"><label for="checkbox1">女</label>'
                    , '<input type="checkbox" name="" lay-skin="primary"><label for="checkbox1">女</label>'
                ];
                return h5.join('');
            },
            switch: function () {
                if (item.value == "") {
                    el[o.field] = 0;
                    
                }
                if (item.value) {
                    return '<input type="checkbox" lay-filter="dy-cell-switch"  lay-skin="switch" lay-text="是|否" checked>';
                } else {
                    return '<input type="checkbox" lay-filter="dy-cell-switch" lay-skin="switch" lay-text="是|否">';
                }
            },
            date: function () {
                var h5=[
                    '<input class="layui-input " type="text">'
                ];
                return h5.join('');
            }
        }

        try {
            var t = parseHelper[types[type]]();
        } catch{
            console.log('err:' + type);
        }

        return t;


    }

    //为fieldRender的callback页面处理事件提供支持
    tablePage.prototype.getCellNextId = function (id) {
        return eventHander.getNextId(id, 13);
    }

    tablePage.prototype.getSearchOptions=function () {
        var opts={};

        $('.layui-table-tool .layui-input').each(function (index,item) {
            opts[item.name]=item.value;
        })

        return opts;
    }

    tablePage.prototype.checkStatus = function (id) {
        if (!id) id = 'tab';
        return table.checkStatus(id);
    }


    var obj=new tablePage();
    
    exports(MOD_NAME, obj);
})