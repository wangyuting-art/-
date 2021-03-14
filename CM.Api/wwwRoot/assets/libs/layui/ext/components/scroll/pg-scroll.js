/*
  * 版 本 Lanpai-Dev V3.0.0 揽派敏捷开发框架
  * Copyright (c) 2019-2025 www.lanpai51.com
  * 创建人：yisan-sky@qq.com
  * 日 期：2019.08.26
  * 描 述：滚动条优化
 */
layui.define(['jquery'], function (exports) {
    "use strict";

    var MOD_NAME = 'pgScroll',
        $ = layui.$;

    if (typeof ($.pgScroll) == undefined || $.pgScroll == null) {
        layui.link(layui.cache.base + 'components/scroll/pg-scroll.css');
    }
    //鼠标滚轮效果
    if (typeof ($.fn.mousewheel) == undefined || $.fn.lrscroll == null) {
        (function (l, t, o) {
            var m = l([]),
                q = l.resize = l.extend(l.resize, {}),
                u, w = "setTimeout",
                v = "resize",
                p = v + "-special-event",
                n = "delay",
                r = "throttleWindow";
            q[n] = 250;
            q[r] = true;
            l.event.special[v] = {
                setup: function () {
                    if (!q[r] && this[w]) {
                        return false
                    }
                    var a = l(this);
                    m = m.add(a);
                    l.data(this, p, {
                        w: a.width(),
                        h: a.height()
                    });
                    if (m.length === 1) {
                        s()
                    }
                },
                teardown: function () {
                    if (!q[r] && this[w]) {
                        return false
                    }
                    var a = l(this);
                    m = m.not(a);
                    a.removeData(p);
                    if (!m.length) {
                        clearTimeout(u)
                    }
                },
                add: function (a) {
                    if (!q[r] && this[w]) {
                        return false
                    }
                    var c;

                    function b(h, d, e) {
                        var f = l(this),
                            g = l.data(this, p);
                        g.w = d !== o ? d : f.width();
                        g.h = e !== o ? e : f.height();
                        c.apply(this, arguments)
                    }
                    if (l.isFunction(a)) {
                        c = a;
                        return b
                    } else {
                        c = a.handler;
                        a.handler = b
                    }
                }
            };

            function s() {
                u = t[w](function () {
                    m.each(function () {
                        var c = l(this),
                            b = c.width(),
                            a = c.height(),
                            d = l.data(this, p);
                        if (b !== d.w || a !== d.h) {
                            c.trigger(v, [d.w = b, d.h = a])
                        }
                    });
                    s()
                }, q[n])
            }
        })($, window);
        //wheel
        (function (a) {
            var l = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                k = ("onwheel" in document || document.documentMode >= 9) ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                h = Array.prototype.slice,
                f, d;
            if (a.event.fixHooks) {
                for (var c = l.length; c;) {
                    a.event.fixHooks[l[--c]] = a.event.mouseHooks
                }
            }
            var j = a.event.special.mousewheel = {
                setup: function () {
                    if (this.addEventListener) {
                        for (var m = k.length; m;) {
                            this.addEventListener(k[--m], b, false)
                        }
                    } else {
                        this.onmousewheel = b
                    }
                    a.data(this, "mousewheel-line-height", j.getLineHeight(this));
                    a.data(this, "mousewheel-page-height", j.getPageHeight(this))
                },
                teardown: function () {
                    if (this.removeEventListener) {
                        for (var m = k.length; m;) {
                            this.removeEventListener(k[--m], b, false)
                        }
                    } else {
                        this.onmousewheel = null
                    }
                },
                getLineHeight: function (i) {
                    return parseInt(a(i)["offsetParent" in a.fn ? "offsetParent" : "parent"]().css("fontSize"), 10)
                },
                getPageHeight: function (i) {
                    return a(i).height()
                },
                settings: {
                    adjustOldDeltas: true
                }
            };
            a.fn.extend({
                mousewheel: function (i) {
                    return i ? this.bind("mousewheel", i) : this.trigger("mousewheel")
                },
                unmousewheel: function (i) {
                    return this.unbind("mousewheel", i)
                }
            });

            function b(q) {
                var s = q || window.event,
                    m = h.call(arguments, 1),
                    n = 0,
                    o = 0,
                    p = 0,
                    i = 0;
                q = a.event.fix(s);
                q.type = "mousewheel";
                if ("detail" in s) {
                    p = s.detail * -1
                }
                if ("wheelDelta" in s) {
                    p = s.wheelDelta
                }
                if ("wheelDeltaY" in s) {
                    p = s.wheelDeltaY
                }
                if ("wheelDeltaX" in s) {
                    o = s.wheelDeltaX * -1
                }
                if ("axis" in s && s.axis === s.HORIZONTAL_AXIS) {
                    o = p * -1;
                    p = 0
                }
                n = p === 0 ? o : p;
                if ("deltaY" in s) {
                    p = s.deltaY * -1;
                    n = p
                }
                if ("deltaX" in s) {
                    o = s.deltaX;
                    if (p === 0) {
                        n = o * -1
                    }
                }
                if (p === 0 && o === 0) {
                    return
                }
                if (s.deltaMode === 1) {
                    var r = a.data(this, "mousewheel-line-height");
                    n *= r;
                    p *= r;
                    o *= r
                } else {
                    if (s.deltaMode === 2) {
                        var t = a.data(this, "mousewheel-page-height");
                        n *= t;
                        p *= t;
                        o *= t
                    }
                }
                i = Math.max(Math.abs(p), Math.abs(o));
                if (!d || i < d) {
                    d = i;
                    if (g(s, i)) {
                        d /= 40
                    }
                }
                if (g(s, i)) {
                    n /= 40;
                    o /= 40;
                    p /= 40
                }
                n = Math[n >= 1 ? "floor" : "ceil"](n / d);
                o = Math[o >= 1 ? "floor" : "ceil"](o / d);
                p = Math[p >= 1 ? "floor" : "ceil"](p / d);
                q.deltaX = o;
                q.deltaY = p;
                q.deltaFactor = d;
                q.deltaMode = 0;
                m.unshift(q, n, o, p);
                if (f) {
                    clearTimeout(f)
                }
                f = setTimeout(e, 200);
                return (a.event.dispatch || a.event.handle).apply(this, m)
            }
            function e() {
                d = null
            }
            function g(m, i) {
                return j.settings.adjustOldDeltas && m.type === "mousewheel" && i % 120 === 0
            }
        })($);
    }

    var $move = null;

    var methods = {
        init: function ($this, callback) {
            var id = $this.attr('id');
            if (!id) {
                id = 'pg_' + function () { // newGuid
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    })
                }();
                $this.attr('id', id);
            }
            //var $div = $('<div class="pg-scroll-wrap"></div>');
            $this.addClass('pg-scroll-wrap');
            // 加载内容
            var $content = $this.children();

            var $scroll = $('<div class="pg-scroll-box" id="' + id + '_box" ></div>');
            //$this.append($div);
            //$div.append($scroll);
            $this.append($scroll);
            $scroll.append($content);

            // 加载y滚动条
            var $vertical = $('<div class="pg-scroll-vertical"   ><div class="pg-scroll-vertical-block" id="' + id + '_vertical"></div></div>')
            $this.append($vertical);

            // 加载x滚动条
            var $horizontal = $('<div class="pg-scroll-horizontal" ><div class="pg-scroll-horizontal-block" id="' + id + '_horizontal"></div></div>')
            $this.append($horizontal);

            // 添加一个移动板
            if ($move === null) {
                $move = $('<div style="-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;display: none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 9999;cursor: pointer;" ></div>');
                $('body').append($move);
            }
            // 初始化数据
            var sh = $scroll.innerHeight();
            var sw = $scroll.innerWidth();


            var h = $this.height();
            var w = $this.width();
            var data = {
                id: id,
                sy: 0,
                sx: 0,
                sh: sh,
                sw: sw,
                h: h,
                w: w,
                yh: 0,
                xw: 0,
                callback: callback
            };
            $this[0].op = data;
            methods.update($this);
            methods.bindEvent($this, $scroll, $vertical, $horizontal);

            $scroll = null;
            $content = null;
            $vertical = null;
            $horizontal = null;
            $this = null;
        },
        bindEvent: function ($this, $scroll, $vertical, $horizontal) { // 绑定监听事件
            // div大小变化
            $this.resize(function () {
                var $this = $(this);
                var op = $this[0].op;
                var h = $this.height();
                var w = $this.width();
                if (h != op.h) {
                    op.h = h;
                    methods.updateY($this);
                }
                if (w != op.w) {
                    op.w = w;
                    methods.updateX($this);
                }
                $this = null;
            });
            $scroll.resize(function () {
                var $this = $(this);
                var $scrollWrap = $this.parent();
                var op = $scrollWrap[0].op;
                var sh = $this.innerHeight();
                var sw = $this.innerWidth();

                if (sh != op.sh) {
                    op.sh = sh;
                    methods.updateY($scrollWrap);
                }
                if (sw != op.sw) {
                    op.sw = sw;
                    methods.updateX($scrollWrap);
                }
                $this = null;
                $scrollWrap = null;
            });

            // 监听鼠标滚动
            $this.mousewheel(function (event, delta, deltaX, deltaY) {

                var $this = $(this);
                var op = $this[0].op;
                var d = delta * 10;
                if (op.sh > op.h) {
                    op.oldsy = op.sy;
                    op.sy = op.sy - d;
                    methods.moveY($this, true);
                    $this = null;
                    return false;
                } else if (op.sw > op.w) {
                    op.oldsx = op.sx;
                    op.sx = op.sx - d;
                    methods.moveX($this, true);
                    $this = null;
                    return false;
                }
            });

            // 监听鼠标移动
            $vertical.find('.pg-scroll-vertical-block').on('mousedown', function (e) {
                $move.show();
                var $this = $(this).parent().parent();
                var op = $this[0].op;
                op.isYMousedown = true;
                op.yMousedown = e.pageY;
                $this.addClass('pg-scroll-active');
                $this = null;
            });
            $horizontal.find('.pg-scroll-horizontal-block').on('mousedown', function (e) {
                $move.show();
                var $this = $(this).parent().parent();
                var op = $this[0].op;
                op.isXMousedown = true;
                op.xMousedown = e.pageX;
                $this.addClass('pg-scroll-active');
                $this = null;
            });


            $(document).on('mousemove', { $obj: $this }, function (e) {
                var op = e.data.$obj[0].op;
                if (op.isYMousedown) {
                    var y = e.pageY;
                    var _yd = y - op.yMousedown;
                    op.yMousedown = y;
                    op.oldsy = op.sy;
                    op.blockY = op.blockY + _yd;

                    if ((op.blockY + op.yh) > op.h) {
                        op.blockY = op.h - op.yh;
                    }
                    if (op.blockY < 0) {
                        op.blockY = 0;
                    }
                    methods.getY(op);
                    methods.moveY(e.data.$obj);
                }
                else if (op.isXMousedown) {
                    var op = e.data.$obj[0].op;
                    var x = e.pageX;
                    var _xd = x - op.xMousedown;
                    op.xMousedown = x;
                    op.oldsx = op.sx;
                    op.blockX = op.blockX + _xd;
                    if ((op.blockX + op.xw) > op.w) {
                        op.blockX = op.w - op.xw;
                    }
                    if (op.blockX < 0) {
                        op.blockX = 0;
                    }
                    methods.getX(op);
                    methods.moveX(e.data.$obj);
                }
            }).on('mouseup', { $obj: $this }, function (e) {
                e.data.$obj[0].op.isYMousedown = false;
                e.data.$obj[0].op.isXMousedown = false;
                $move.hide();
                e.data.$obj.removeClass('pg-scroll-active');
            });
        },
        update: function ($this) { // 更新滚动条
            methods.updateY($this);
            methods.updateX($this);
        },
        updateY: function ($this) {
            var op = $this[0].op;
            var $scroll = $this.find('#' + op.id + '_box');
            var $vertical = $this.find('#' + op.id + '_vertical');
            if (op.sh > op.h) { // 出现纵向滚动条
                // 更新显示区域位置
                if ((op.sh - op.sy) < op.h) {
                    var _sy = 0;
                    op.sy = op.sh - op.h;
                    if (op.sy < 0) {
                        op.sy = 0;
                    } else {
                        _sy = 0 - op.sy;
                    }
                    $scroll.css('top', _sy + 'px');
                }
                // 更新滚动条高度
                var scrollH = parseInt(op.h * op.h / op.sh);
                scrollH = (scrollH < 30 ? 30 : scrollH);
                op.yh = scrollH;

                // 更新滚动条位置
                var _y = parseInt(op.sy * (op.h - scrollH) / (op.sh - op.h));
                if ((_y + scrollH) > op.h) {
                    _y = op.h - scrollH;
                }
                if (_y < 0) {
                    _y = 0;
                }

                op.blockY = _y;

                // 设置滚动块大小和位置
                $vertical.css({
                    'top': _y + 'px',
                    'height': scrollH + 'px'
                });
            } else {
                op.blockY = 0;
                op.sy = 0;
                $scroll.css('top', '0px');
                $vertical.css({
                    'top': '0px',
                    'height': '0px'
                });
            }

            op.callback && op.callback(op.sx, op.sy);
            $scroll = null;
            $vertical = null;
        },
        updateX: function ($this) {
            var op = $this[0].op;
            var $scroll = $this.find('#' + op.id + '_box');
            var $horizontal = $this.find('#' + op.id + '_horizontal');
            if (op.sw > op.w) {
                // 更新显示区域位置
                if ((op.sw - op.sx) < op.w) {
                    var _sx = 0;
                    op.sx = op.sw - op.w;
                    if (op.sx < 0) {
                        op.sx = 0;
                    } else {
                        _sx = 0 - op.sx;
                    }
                    $scroll.css('left', _sx + 'px');
                }
                // 更新滚动条高度
                var scrollW = parseInt(op.w * op.w / op.sw);
                scrollW = (scrollW < 30 ? 30 : scrollW);
                op.xw = scrollW;

                // 更新滚动条位置
                var _x = parseInt(op.sx * (op.w - scrollW) / (op.sw - op.w));
                if ((_x + scrollW) > op.w) {
                    _x = op.w - scrollW;
                }
                if (_x < 0) {
                    _x = 0;
                }
                op.blockX = _x;
                // 设置滚动块大小和位置
                $horizontal.css({
                    'left': _x + 'px',
                    'width': scrollW + 'px'
                });

            } else {
                op.sx = 0;
                op.blockX = 0;
                $scroll.css('left', '0px');
                $horizontal.css({
                    'left': '0px',
                    'width': '0px'
                });
            }
            op.callback && op.callback(op.sx, op.sy);
            $scroll = null;
            $horizontal = null;
        },
        moveY: function ($this, isMousewheel) {
            var op = $this[0].op;
            var $scroll = $this.find('#' + op.id + '_box');
            var $vertical = $this.find('#' + op.id + '_vertical');

            // 更新显示区域位置
            var _sy = 0;
            if (op.sy < 0) {
                op.sy = 0;
            } else if (op.sy + op.h > op.sh) {
                op.sy = op.sh - op.h;
                _sy = 0 - op.sy;
            } else {
                _sy = 0 - op.sy;
            }
            if (isMousewheel) {
                var _y = methods.getBlockY(op);
                if (_y == 0 && op.sy != 0) {
                    op.sy = 0;
                    _sy = 0;
                }
                op.blockY = _y;
                // 设置滚动块位置
                //var d = Math.abs(op.sy - op.oldsy) * 100 / 4;
                $scroll.css({
                    'top': _sy + 'px'
                });
                $vertical.css({
                    'top': _y + 'px'
                });
            } else {
                $scroll.css({
                    'top': _sy + 'px'
                });
                $vertical.css({
                    'top': op.blockY + 'px'
                });
            }
            op.callback && op.callback(op.sx, op.sy);
            $scroll = null;
            $vertical = null;
        },
        moveX: function ($this, isMousewheel) {
            var op = $this[0].op;
            var $scroll = $this.find('#' + op.id + '_box');
            var $horizontal = $this.find('#' + op.id + '_horizontal');

            // 更新显示区域位置
            var _sx = 0;
            if (op.sx < 0) {
                op.sx = 0;
            } else if (op.sx + op.w > op.sw) {
                op.sx = op.sw - op.w;
                _sx = 0 - op.sx;
            } else {
                _sx = 0 - op.sx;
            }

            if (isMousewheel) {
                // 更新滑块的位置
                var _x = methods.getBlockX(op);
                if (_x == 0 && op.sx != 0) {
                    op.sx = 0;
                    _sx = 0;
                }
                op.blockX = _x;
                // 设置滚动块位置
                //var d = Math.abs(op.sx - op.oldsx) * 100 / 4;
                $scroll.css({
                    'left': _sx + 'px'
                });
                $horizontal.css({
                    'left': _x + 'px'
                });
            } else {
                $scroll.css({
                    'left': _sx + 'px'
                });
                $horizontal.css({
                    'left': op.blockX + 'px'
                });
            }
            op.callback && op.callback(op.sx, op.sy);
            $scroll = null;
            $horizontal = null;

        },
        getBlockY: function (op) {
            var _y = parseFloat(op.sy * (op.h - op.yh) / (op.sh - op.h));
            if ((_y + op.yh) > op.h) {
                _y = op.h - op.yh;
            }
            if (_y < 0) {
                _y = 0;
            }
            return _y;
        },
        getY: function (op) {
            op.sy = parseInt(op.blockY * (op.sh - op.h) / (op.h - op.yh));
            if ((op.sy + op.h) > op.sh) {
                op.sy = op.sh - op.h;
            }
            if (op.sy < 0) {
                op.sy = 0;
            }
        },
        getBlockX: function (op) {
            var _x = parseFloat(op.sx * (op.w - op.xw) / (op.sw - op.w));
            if ((_x + op.xw) > op.w) {
                _x = op.w - op.xw;
            }
            if (_x < 0) {
                _x = 0;
            }
            return _x;
        },
        getX: function (op) {
            op.sx = parseInt(op.blockX * (op.sw - op.w) / (op.w - op.xw));
            if ((op.sx + op.w) > op.sw) {
                op.sx = op.sw - op.w;
            }
            if (op.sx < 0) {
                op.sx = 0;
            }
        },
    };
    $.fn.pgScroll = function (callback) {
        $(this).each(function () {
            var $this = $(this);
            methods.init($this, callback);
        });
    }

    $.fn.pgScrollSet = function (name, data) {
        switch (name) {
            case 'moveRight':
                var $this = $(this);
                setTimeout(function () {
                    var op = $this[0].op;
                    op.oldsx = op.sx;
                    op.sx = op.sw - op.w;
                    methods.moveX($this, true);
                    $this = null;
                }, 250);
                break;
            case 'moveBottom':
                var $this = $(this);
                setTimeout(function () {
                    var op = $this[0].op;
                    op.oldsy = op.sx;
                    op.sy = op.sh - op.h;
                    methods.moveY($this, true);
                    $this = null;
                }, 250);
                break;
        }
    }


    exports(MOD_NAME, null);
});