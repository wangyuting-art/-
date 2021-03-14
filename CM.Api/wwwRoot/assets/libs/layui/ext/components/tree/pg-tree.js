/*
  * 版 本 Lanpai-Dev V3.0.0 揽派敏捷开发框架
  * Copyright (c) 2019-2025 www.lanpai51.com
  * 创建人：yisan-sky@qq.com
  * 日 期：2019.08.26
  * 描 述：pgTree 页面导航树样式
 */
layui.define(['dtree','pgScroll'], function (exports) {    
    "use strict";

    var MOD_NAME = 'pgTree',
        $ = layui.$, dtree = layui.dtree;


    if (typeof ($.pgTree) == undefined || $.pgTree == null) {
        layui.link(layui.cache.base + 'components/tree/pg-tree.css');
    }

    $.fn.pgTree = function (settings) {

        var config = {
            elem: '',
            title: '未设置',
            checkbar: false,
            record: true,
            line: true,
            toolbar: false,
            toolbarWay:'follow',
            icon: 4,
            data: [],
            dataFormat: "list",
            response: {
                treeId: "id",
                title: "name",
                parentId: "pid"
            },
        }, events = {
            nodeClick: null,                //树节点点击事件 function(tree,obj){}, 必填
            nodeDbClick: null,              //树节点双击事件 function(tree,obj){}，默认空
            treeRefreshClick: null,         //树节点点击事件 function(tree,obj){}, 默认刷新
            addTreeNodeCallback: null,      //树节点添加点击事件 function(tree,data){}, 开启工具栏必填
            editTreeNodeCallback: null,     //树节点编辑点击事件 function(tree,data){}, 开启工具栏必填
            delTreeNodeCallback: null       //树节点删除点击事件 function(tree,data){}, 开启工具栏必填
        };

        if (settings && settings.config)
            $.extend(config, settings.config);
        if (settings && settings.events)
            $.extend(events, settings.events);

        //当传的不是树形结构（即未指定 parentId）,补全
        var tdata = [];
        config.data.forEach(function (item, index) {
            if (!item[config.parentId]) {
                tdata.push($.extend(item, { parentId: 0 }));
            }
        });
        config.data = tdata;

        var $this = $(this);

        if ($this.length <= 0) {
            return false;
        }

        var guid= function () { // newGuid
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            })
        }();
        var treeId = 'tree_' + guid, btnId = 'btn_' + guid;

        if ($this.children(".pg-tree-title").length <= 0) {
            $this.html([
                ' <div class="pg-tree-title">',
                , ' <div class="layui-inline">'
                ,       config.title
                , ' </div>'   
                , ' <div class="layui-inline" style="float:right">'
                , '     <a title="刷新" class="layui-btn-icon" id="' + btnId + '"><i class="layui-icon-12 ">&#xe9aa;</i></a>'
                , ' </div>' 
                ,'</div>'
                ,'<div class="pg-tree-content">'
                , '   <div class="pg-tree-body"><ul id="' + treeId+'" class="dtree" data-id="0"></ul></div>'
                ,'</div>'
            ].join(''));
        }
        var elObj = $(".pg-tree-body");
        elObj.pgScroll();        

        config.elem = '#' + treeId;
        var tree = dtree.render(
            $.extend(config, {
                done: function () {
                    // 会自动帮你触发一次对应Id的节点的点击事件
                    var currentSelectNode = dtree.getNowParam(tree);
                    if ($.isEmptyObject(currentSelectNode)) {
                        dtree.click(tree, config.data[0][config.response.treeId]);
                    }
                    else
                        dtree.click(tree, currentSelectNode.nodeId);
                        
                },
                toolbarFun: {
                    addTreeNode: function (treeNode, $div) {
                        if (events.addTreeNodeCallback) {
                            if (events.addTreeNodeCallback(tree, treeNode))
                                tree.changeTreeNodeAdd("refresh");
                            else
                                tree.changeTreeNodeAdd(false);
                        } else {
                            tree.changeTreeNodeAdd(false);
                            layui.layer.msg('错误消息：回调函数未定义\n<br/>事件名称：添加树节点回调 \n');
                        }
                    },
                    editTreeNode: function (treeNode, $div) {
                        if (events.editTreeNodeCallback) {                            
                            tree.changeTreeNodeEdit(events.editTreeNodeCallback(tree, treeNode));
                        } else {
                            tree.changeTreeNodeEdit(false);
                            layui.layer.msg('错误消息：回调函数未定义\n<br/>事件名称：编辑树节点回调 \n');
                        }
                    },
                    delTreeNode: function (treeNode, $div) {
                        if (events.delTreeNodeCallback) {
                            tree.changeTreeNodeDel(events.delTreeNodeCallback(tree, treeNode));
                        } else {
                            tree.changeTreeNodeDel(false);
                            layui.layer.msg('错误消息：回调函数未定义\n<br/>事件名称：删除树节点回调 \n');
                        }
                    }
                }
            }));

        //绑定事件
        dtree.on('node("' + treeId + '")', function (owner) {
            if (events.nodeClick)
                events.nodeClick(tree, owner);
            else {
                layui.layer.msg('错误消息：事件处理未定义\n<br/>事件名称：树节点单击事件\n');
            }
        });
        dtree.on('nodedblclick("' + treeId + '")', function (owner) {
            events.nodeDbClick && events.nodeDbClick(tree,owner);
        });
        $('#' + btnId).on('click', function (owner) {
            if (events.treeRefreshClick)
                events.treeRefreshClick(tree);
            else
                tree.refreshTree();
        });
    }

    exports(MOD_NAME, null);
});