/*
  * 版 本 Lanpai-Dev V3.0.0 揽派敏捷开发框架
  * Copyright (c) 2019-2025 www.lanpai51.com
  * 创建人：yisan-sky@qq.com
  * 日 期：2019.08.26
  * 描 述：pgLayout 页面布局样式
 */
layui.define(['jquery'], function (exports) {    
    "use strict";

    var MOD_NAME = 'pgLayout',
        $ = layui.$;

    if (typeof ($.pglayout) == undefined || $.pglayout == null) {
        layui.link(layui.cache.base + 'components/layout/pg-layout.css');
    }

    $.fn.pgLayout = function (op) {
        var dfop = {
            blocks: [
                {
                    target: '.pg-layout-left',
                    type: 'right',
                    size: 203
                }
            ]
        };
        $.extend(dfop, op || {});
        var $this = $(this);
        if ($this.length <= 0) {
            return false;
        }

        $this.hasClass("pg-layout pg-layout-left-center") || $this.addClass("pg-layout pg-layout-left-center");

        if ($this.children(".pg-layout-left").length <= 0) {
            var htmlArray = [];
            htmlArray.push([
                '<div class="pg-layout-left">'
                , '   <div class="pg-layout-wrap"></div>'
                , '</div>'
            ].join(''));

            htmlArray.push([
                '<div class="pg-layout-center">'
                , '   <div class="pg-layout-wrap"></div>'
                , '</div > '
            ].join(''));

            $this.html(htmlArray.join(''));
        }

        $this[0]._pgLayout = { "dfop": dfop };
        dfop.id = "pglayout" + new Date().getTime();

        for (var i = 0, l = dfop.blocks.length; i < l; i++) {
            var _block = dfop.blocks[i];
            $this.children(_block.target).append('<div class="pg-layout-move pg-layout-move-' + _block.type + ' " path="' + i + '"  ></div>');
        }

        $this.on('mousedown', function (e) {
            var et = e.target || e.srcElement;
            var $et = $(et);
            var $this = $(this);
            var dfop = $this[0]._pgLayout.dfop;
            if ($et.hasClass('pg-layout-move')) {
                var _index = $et.attr('path');
                dfop._currentBlock = dfop.blocks[_index];
                dfop._ismove = true;
                dfop._pageX = e.pageX;
            }
        });

        $this.mousemove(function (e) {
            var $this = $(this);
            var dfop = $this[0]._pgLayout.dfop;
            if (!!dfop._ismove) {
                var $block = $this.children(dfop._currentBlock.target);
                $block.css('width', dfop._currentBlock.size + (e.pageX - dfop._pageX));
                $this.css('padding-left', dfop._currentBlock.size + (e.pageX - dfop._pageX));
            }
            window.dispatchEvent(new Event('resize'));
        });

        $this.on('click', function (e) {
            var $this = $(this);
            var dfop = $this[0]._pgLayout.dfop;
            if (!!dfop._ismove) {
                dfop._currentBlock.size += (e.pageX - dfop._pageX);
                dfop._ismove = false;
            }
        });

        return {
            left:$('.pg-layout-left .pg-layout-wrap')[0],
            content: $('.pg-layout-center .pg-layout-wrap')[0]
        }
    }

    exports(MOD_NAME, null);
});