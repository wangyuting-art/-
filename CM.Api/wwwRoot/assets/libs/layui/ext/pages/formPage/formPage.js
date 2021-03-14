layui.define(['element', 'layer', 'form', 'laytpl', 'pgScroll'], function (exports) {
    var MOD_NAME = 'formPage',
        element = layui.element,
        layer = layui.layer,
        $ = layui.jquery,
        form = layui.form,
        laytpl = layui.laytpl,
        hasParentPage = false,
        formPage = function () { };

    if (parent != window && parent.layer) {
        layer = parent.layer;
        hasParentPage = true;
    }

    layui.link(layui.cache.base + 'pages/formPage/formPage.css');

    formPage.prototype.config = function () {
        return {
            elem: {},                      // 盒子节点不能为空
            form: [
                [
                    {
                        label: "单行输入框",
                        field: "title1",
                        inputType: "text",//text,password,date,radio,check,textarea,switch,select,formselect
                        widthType: "fluid",//"fluid"
                        holder: "请输入",       //文本占位符
                        verify: "required",        //required|phone|email|url|number|date|identity
                        validator: [{ regx: "^[0-9]*$", err: "只能为数字" }],
                        description: "辅助说明文本", //辅助说明文本
                        refData: "初始参考值"      // "" | [] | [[id,key,0],[]] |[{}]|{}

                    }
                ],
                [
                    {
                        label: "单行输入框",
                        field: "title2",
                        inputType: "text",//text,password,date,radio,check,textarea,switch,select,formselect
                        //widthType: "fluid",//"fluid"
                        holder: "请输入",       //文本占位符
                        //verify: "",
                        description: "辅助说明文本", //辅助说明文本
                        //refData: "初始参考值"      // "" | [] | [[id,key,0],[]] |[{}]|{}
                        refData: [
                            [1, '杭州', 0],
                            [2, '宁波', 1]
                        ]
                    }
                ],
                [
                    {
                        label: "单行输入框",
                        field: "title3",
                        inputType: "text",//text,password,date,radio,check,textarea,switch,select,formselect
                        //widthType: "fluid",//"fluid"
                        holder: "请输入",       //文本占位符
                        //verify: "",
                        //description: "辅助说明文本", //辅助说明文本
                        refData: "初始参考值"      // "" | [] | [[id,key,0],[]] |[{}]|{}

                    },
                    {
                        label: "单行输入框",
                        field: "title4",
                        inputType: "text",//text,password,date,radio,check,textarea,switch,select,formselect
                        //widthType: "fluid",//"fluid"
                        holder: "请输入",       //文本占位符
                        //verify: "",
                        //description: "辅助说明文本", //辅助说明文本
                        //refData: "初始参考值"      // "" | [] | [[id,key,0],[]] |[{}]|{}
                        //refData: [
                        //    [1, '杭州', 0],
                        //    [2, '宁波', 0]
                        //]
                    }
                ],
                [
                    {
                        label: "密码输入框",
                        field: "title5",
                        inputType: "password",//text,password,date,radio,check,textarea,switch,select,formselect
                        //widthType: "fluid",//"fluid"
                        holder: "请输入",       //文本占位符
                        //verify: "",
                        description: "密码", //辅助说明文本
                        //refData: "初始参考值"      // "" | [] | [[id,key,0],[]] |[{}]|{}
                        refData: [
                            [1, '杭州', 0],
                            [2, '宁波', 0]
                        ]
                    }
                ],
                [
                    {
                        label: "单选框",
                        field: "title6",
                        inputType: "radio",//text,password,date,radio,check,textarea,switch,select,formselect
                        //widthType: "fluid",//"fluid"
                        holder: "请输入",       //文本占位符
                        //verify: "",
                        description: "密码", //辅助说明文本
                        //refData: "初始参考值"      // "" | [] | [[id,key,0],[]] |[{}]|{}
                        refData: [
                            [1, '杭州', 0],
                            [2, '宁波', 1]
                        ]
                    }
                ],
                [
                    {
                        label: "复选框",
                        field: "city7",
                        inputType: "checkbox",//text,password,date,radio,check,textarea,switch,select,formselect
                        //widthType: "fluid",//"fluid"
                        holder: "请输入",       //文本占位符
                        //verify: "",
                        description: "城市", //辅助说明文本
                        //refData: "初始参考值"      // "" | [] | [[id,key,0],[]] |[{}]|{}
                        refData: [
                            [1, '杭州', 0],
                            [2, '宁波', 1]
                        ]
                    },
                    {
                        label: "性别",
                        field: "gender",
                        inputType: "switch",//text,password,date,radio,check,textarea,switch,select,formselect
                        //widthType: "fluid",//"fluid"
                        //holder: "请输入",       //文本占位符
                        //verify: "",
                        description: "性别", //辅助说明文本
                        //refData: "初始参考值"      // "" | [] | [[id,key,0],[]] |[{}]|{}
                        refData: "男|女"
                    }

                ],
                [
                    {
                        label: "描述",
                        field: "descr8",
                        inputType: "textarea",//text,password,date,radio,check,textarea,switch,select,formselect
                        //widthType: "fluid",//"fluid"
                        holder: "请输入",       //文本占位符
                        //verify: "",
                        //description: "城市", //辅助说明文本
                        //refData: "初始参考值"      // "" | [] | [[id,key,0],[]] |[{}]|{}
                        //refData: [
                        //    [1, '杭州', 0],
                        //    [2, '宁波', 0]
                        //]
                    }
                ],
                [
                    {
                        label: "城市",
                        field: "city9",
                        inputType: "select",//text,password,date,radio,check,textarea,switch,select,formselect
                        //widthType: "fluid",//"fluid"
                        holder: "请输入",       //文本占位符
                        //verify: "",
                        description: "密码", //辅助说明文本
                        //refData: "初始参考值"      // "" | [] | [[id,key,0],[]] |[{}]|{}
                        refData: [
                            [1, '杭州', 0],
                            [2, '宁波', 0]
                        ]
                    }
                ],
            ],
            rawdata: null,
            events: {
                title21: function (data) {
                    alert('This is a form item event test.')
                    console.log(data);
                },
                gender: function (data) {
                    alert('gender test');
                },
                city7: function (data) {
                    alert('checkbox test')
                },
                title6: function (data) {
                    alert('radio test')
                },
                city9: function (data) {
                    alert('select test');
                },
                dosubmit: function (data) {
                    var item = {
                        msg: '事件处理未定义',
                        event: 'dosubmit',
                        data: JSON.stringify(data)
                    };
                    laytpl([
                        '错误消息：{{d.msg}}\n'
                        , '<br/>事件名称：{{d.event}}\n'
                        , '<br/>表单数据：{{d.data}}'
                    ].join('')).render(item, function (s) {
                        layui.layer.msg(s)
                    })
                    return false;
                }
            },

        };
    }

    //自定义验证
    var validators = {};
    //表单事件
    var extEvents = [];

    function formItemToH5(it) {
        var r = [];
        var formItemTemplates = {
            text: function (item) {
                var res = [];
                res.push('<label class="layui-form-label">' + item.label + '</label>');
                if (item.widthType && item.widthType == 'fluid')
                    res.push('<div class="layui-input-block">');
                else
                    res.push('<div class="layui-input-inline">');
                res.push('<input type="text" autocomplete="off" class="layui-input"');
                res.push(' name="' + item.field + '"');
                if (item.validator && item.validator.length > 0) {
                    res.push(' lay-verify="' + item.field + '"');
                } else {
                    if (item.verify && item.verify != "")
                        res.push(' lay-verify="' + item.verify + '"');
                }
                if (item.placeholder && item.placeholder != "")
                    res.push(' placeholder = "' + item.placeholder + '"');
                else
                    res.push(' placeholder = "请输入"');
                if (item.refData && (typeof item.refData == 'string' && item.refData.constructor == String)) {
                    res.push(' value = "' + item.refData+'"');
                }

                res.push('>');
                res.push('</div>');
                if (item.widthType && item.widthType == 'fluid') {

                } else {
                    if (item.refData) {
                        //refData  [id,text,selected]
                        if ($.isArray(item.refData)) {
                            extEvents.push({
                                field: item.field,
                                event: 'select(' + item.field + ')'
                            });
                            res.push('<div class="layui-input-inline">');
                            res.push('<select lay-filter="' + item.field+'" name="' + item.field + '_ref">');
                            res.push('<option value="">请选择</option>');
                            item.refData.forEach(it => {
                                var id, txt, flag;
                                if (it.length == 2) {
                                    id = txt = it[0];
                                    flag = it[1] == 1 ? "selected" : "";
                                } else if (it.length == 3) {
                                    id = it[0];
                                    txt = it[1];
                                    flag = it[2] == 1 ? "selected" : "";
                                }
                                res.push('<option value="' + id + '" ' + flag + '>' + txt + '</option>');
                            });
                            res.push('</select>');
                            res.push('</div>');
                        }
                    }

                    if (item.description && item.description != "") {
                        res.push('<div class="layui-form-mid layui-word-aux">' + item.description + '</div>');
                    }
                }

                return res.join('');
            },
            password: function (item) {
                var res = [];
                res.push('<label class="layui-form-label">' + item.label + '</label>');
                if (item.widthType && item.widthType == 'fluid')
                    res.push('<div class="layui-input-block">');
                else
                    res.push('<div class="layui-input-inline">');
                res.push('<input type="password" autocomplete="off" class="layui-input"');
                res.push(' name="' + item.field + '"');
                if (item.verify && item.verify != "")
                    res.push(' lay-verify="' + item.verify + '"');
                if (item.placeholder && item.placeholder != "")
                    res.push(' placeholder = "' + item.placeholder + '"');
                else
                    res.push(' placeholder = "请输入"');
                res.push('>');
                res.push('</div>');
                if (item.description && item.description != "") {
                    res.push('<div class="layui-form-mid layui-word-aux">' + item.description + '</div>');
                }
                return res.join('');
            },
            radio: function (item) {
                var res = [];
                res.push('<label class="layui-form-label">' + item.label + '</label>');
                if (item.widthType && item.widthType == 'fluid')
                    res.push('<div class="layui-input-block">');
                else
                    res.push('<div class="layui-input-inline">');
                
                if (item.refData) {
                    //refData  [id,text,selected]
                    if ($.isArray(item.refData)) {
                        extEvents.push({
                            field: item.field,
                            event: 'radio(' + item.field + ')'
                        });
                        item.refData.forEach(it => {
                            var id, txt, flag;
                            if (it.length == 2) {
                                id = txt = it[0];
                                flag = it[1] == 1 ? "checked" : "";
                            } else if (it.length == 3) {
                                id = it[0];
                                txt = it[1];
                                flag = it[2] == 1 ? "checked" : "";
                            }
                            //res.push('<option value="' + id + '" ' + flag + '>' + txt + '</option>');

                            res.push('<input type="radio" lay-filter="' + item.field + '" name="' + item.field + '" value="' + id + '" title="' + txt + '" ' + flag + '>');
                        });
                    }
                }                
                res.push('</div>');
                if (item.description && item.description != "") {
                    res.push('<div class="layui-form-mid layui-word-aux">' + item.description + '</div>');
                }
                return res.join('');
            },
            checkbox: function (item) {
                var res = [];
                res.push('<label class="layui-form-label">' + item.label + '</label>');
                if (item.widthType && item.widthType == 'fluid')
                    res.push('<div class="layui-input-block">');
                else
                    res.push('<div class="layui-input-inline">');

                if (item.refData) {
                    //refData  [id,text,selected]
                    if ($.isArray(item.refData)) {
                        extEvents.push({
                            field: item.field,
                            event: 'checkbox(' + item.field + ')'
                        });
                        item.refData.forEach(it => {
                            var id, txt, flag;
                            if (it.length == 2) {
                                id = txt = it[0];
                                flag = it[1] == 1 ? "checked" : "";
                            } else if (it.length == 3) {
                                id = it[0];
                                txt = it[1];
                                flag = it[2] == 1 ? "checked" : "";
                            }
                            //res.push('<option value="' + id + '" ' + flag + '>' + txt + '</option>');
                            res.push('<input type="checkbox" lay-filter="' + item.field+'" name="' + item.field + '['+id+']" title="' + txt + '" ' + flag + '>');
                        });
                    }
                }
                res.push('</div>');
                if (item.description && item.description != "") {
                    res.push('<div class="layui-form-mid layui-word-aux">' + item.description + '</div>');
                }
                return res.join('');
            },
            textarea: function (item) {
                var res = [];
                res.push('<label class="layui-form-label">' + item.label + '</label>');
                res.push('<div class="layui-input-block">');
                res.push('<textarea class="layui-textarea" ');

                res.push(' name="' + item.field + '"');
                if (item.verify && item.verify != "")
                    res.push(' lay-verify="' + item.verify + '"');
                if (item.placeholder && item.placeholder != "")
                    res.push(' placeholder = "' + item.placeholder + '"');
                else
                    res.push(' placeholder = "请输入"');
                res.push('></textarea>');
                res.push('</div>');
                //if (item.description && item.description != "") {
                //    res.push('<div class="layui-form-mid layui-word-aux">' + item.description + '</div>');
                //}
                return res.join('');
            },
            switch: function (item) {
                var res = [];
                res.push('<label class="layui-form-label">' + item.label + '</label>');
                if (item.widthType && item.widthType == 'fluid')
                    res.push('<div class="layui-input-block">');
                else
                    res.push('<div class="layui-input-inline">');

                extEvents.push({
                    field: item.field,
                    event: 'switch(' + item.field + ')'
                });
                var opts = "ON|OFF";
                if (item.refData) {
                    opts = item.refData;
                }

                res.push('<input type="checkbox" lay-filter="' + item.field + '" name="' + item.field + '" lay-skin="switch" lay-text="' + opts + '">');
                
                res.push('</div>');
                if (item.description && item.description != "") {
                    res.push('<div class="layui-form-mid layui-word-aux">' + item.description + '</div>');
                }
                return res.join('');
            },
            select: function (item) {
                var res = [];
                res.push('<label class="layui-form-label">' + item.label + '</label>');
                if (item.widthType && item.widthType == 'fluid')
                    res.push('<div class="layui-input-block">');
                else
                    res.push('<div class="layui-input-inline">');

                if (item.refData) {
                    //refData  [id,text,selected]
                    if ($.isArray(item.refData)) {
                        extEvents.push({
                            field: item.field,
                            event: 'select(' + item.field + ')'
                        });
                        res.push('<select lay-filter="' + item.field + '" name="' + item.field + '">');
                        res.push('<option value="">请选择</option>');
                        item.refData.forEach(it => {
                            var id, txt, flag;
                            if (it.length == 2) {
                                id = txt = it[0];
                                flag = it[1] == 1 ? "selected" : "";
                            } else if (it.length == 3) {
                                id = it[0];
                                txt = it[1];
                                flag = it[2] == 1 ? "selected" : "";
                            }
                            res.push('<option value="' + id + '" ' + flag + '>' + txt + '</option>');
                        });
                        res.push('</select>');
                    }
                }
                res.push('</div>');
                if (item.description && item.description != "") {
                    res.push('<div class="layui-form-mid layui-word-aux">' + item.description + '</div>');
                }
                return res.join('');
            },
            formselect: function (item) {
            }

        }

        r.push('<div class="layui-form-item">');
        if ($.isArray(it)) {
            if (it.length > 1) {
                it.forEach(its => {
                    if (its.validator) validators[its.field] = its.validator;
                    r.push('<div class="layui-inline">');
                    r.push(formItemTemplates[its.inputType](its));
                    r.push('</div>');

                })
            } else if (it.length == 1) {
                if (it[0].validator) validators[it[0].field] = it[0].validator;
                if (formItemTemplates[it[0].inputType]) {
                    r.push(formItemTemplates[it[0].inputType](it[0]));
                }
            }

        }

        r.push('</div>');

        return r.join('');
    }
     
    formPage.prototype.init = function (e) {
        var t = this;
        e = $.extend(t.config(), e);
        //初始化页面结构
        var formH5 = [
            '<div class="pg-form layui-form" lay-filter="auto-form">'
            , ' <div class="pg-form-content">'
            , '     <div class="pg-form-body">'
            , '         <div class="layui-form-item"><div class="layui-inline"></div></div>'
            , '         {{d.items}}'
            , '         <div class="layui-form-item"><div class="layui-inline"></div></div>'
            , '     </div>'
            , ' </div>'
            , ' <div class="pg-form-footer">'
            , '     <input type="checkbox" name="continue" lay-skin="primary" title="确认并关闭窗口" checked>'
            , '     <div class="btn-group">'
            , '         <button class="layui-btn" lay-submit lay-filter="auto-submit">保存</button>'
            , '         <button class="layui-btn layui-btn-primary" lay-filter="auto-reset">重置</button>'
            , '         <button class="layui-btn layui-btn-primary" lay-filter="auto-close">关闭</button>'
            , '     </div>'
            , ' </div>'
            , '</div>'
        ].join('');

        if (e.form) {
            var items = [];

            e.form.forEach(item => {
                items.push(formItemToH5(item));
            })
            var t = {
                items: items.join('')
            };
            e.elem.outerHTML = laytpl(formH5).render(t);
            $('.pg-form-body').pgScroll();
            form.render();

            //创建自定义验证
            var tv = {};
            for (var k in validators) {
                tv[k] = function (value, item) {
                    for (var t = 0; t < validators[k].length; t++) {
                        if (!new RegExp(validators[k][t].regx).test(value)) {
                            return validators[k][t].err;
                        }
                    }
                }
            }
            form.verify(tv);

        }

        //绑定表单元素事件
        extEvents.forEach(eit => {
            if (e.events[eit.field]) {
                form.on(eit.event, e.events[eit.field])
            } else {
                form.on(eit.event, function (data) {
                    var txt = data.elem[data.elem.selectedIndex].text;
                    $('input[name="' + eit.field + '"]').val(txt);
                })
            }
        })

        //初始化表单元素值
        if (e.rawdata) {
            form.val('auto-form',e.rawdata);
        }

        form.on('submit(auto-submit)', function (data) {
            if (e.events['dosubmit'](data.field)) {
                if (data.field.continue && data.field.continue == 'on') {
                    location.reload();
                } else {
                    if (hasParentPage) {
                        layer.close(layer.index);
                        
                    } else {
                        window.close();
                    }
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                }
            }
            
            
        });
        $("[lay-filter='auto-close']").on('click', function (obj) {
            if (hasParentPage) {
                layer.close(layer.index);
            } else {
                window.close();
            }
        });
        $("[lay-filter='auto-reset']").on('click', function (obj) {
            location.reload();
        });
    }

    formPage.prototype.render = function (e) {
        this.init(e);
    }
    
    exports(MOD_NAME, new formPage());
})