layui.define(['element', 'layer', 'form', 'tablePage', 'laytpl', 'pgScroll','dtree'], function (exports) {
    var MOD_NAME = 'formPage',
        element = layui.element,
        layer = layui.layer,
        $ = layui.jquery,
        form = layui.form,
        tablePage = layui.tablePage,
        laytpl = layui.laytpl,
        dtree = layui.dtree,
        hasParentPage = false,
        formPage = function () { };

    if (parent != window && parent.layer) {
        layer = parent.layer;
        hasParentPage = true;
    }

    layui.link(layui.cache.base + 'pages/formPage2/formPage.css');

    formPage.prototype.config = function () {
        return {
            elem: {},                      // form挂载的dom
            tabs: [
                {
                    title: "表信息",
                    type: "form",
                    opts: [
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
                    ]
                },
                {
                    title: "表字段",
                    type: "table",
                    opts: {
                        elem: '',                //table父容器挂载的dom或jQuery DOM
                        toolbar: {
                            searchFieldName: 'Name',
                            conditions: [
                                { fieldName: 'testFieldName', text: '测试', dataType: 'string' }
                            ],
                            buttons: [
                                { event: 'delAll', icon: '&#xe640;', text: '批删' }
                                , { event: 'del', icon: '&#xe640;', text: '新建' }
                            ],
                        },
                        table: {
                            data: [],
                            tableOptions: {
                                elem: '#tab',   //表格容器
                                id: null,       //表格id
                                cols: [
                                    [
                                        {
                                            type: 'checkbox'
                                        }, {
                                            field: 'id',
                                            title: 'ID',
                                            width: 80
                                        }, {
                                            field: 'name',
                                            title: '角色名称'
                                        }
                                        , {
                                            title: '操作',
                                            align: 'center',
                                            width: 250,
                                            templet: function () {
                                                return page.rowbarRender([
                                                    { event: 'rowEnable', icon: '&#xe601;', text: '启用"' },
                                                    { event: 'rowEdit', icon: '&#xe642;', text: '编辑"' },
                                                    { event: 'rowPsw', icon: '&#xe631;', text: '修改密码' },
                                                    { event: 'rowDel', icon: '&#xe640;', text: '删除' }
                                                ]);
                                            }
                                        }
                                    ]
                                ],
                                
                            }
                        }
                    }
                }
            ],
            initFormData: null,
            events: {
                title21: function (data) {
                    alert('This is a form item event test.')
                    console.log(data);
                },
                dosubmit: function (data,callback) {
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
    var extEvents = [];//{field:'',event:'',binder:''}
    //字段映射,字段名与动态控件的对应关系
    var fieldMap = {};

    

    //生成tabItem body form
    var formCreator = {
        form: function (opts) {
            //定义函数：ItemData => formItemH5
            function formItemToH5(it) {
                var r = [];
                var formItemTemplates = {
                    label: function (item) {
                        var res = [];
                        res.push('<label class="layui-form-label">' + item.label + '</label>');
                        if (item.widthType && item.widthType == 'fluid')
                            res.push('<div class="layui-input-block">');
                        else
                            res.push('<div class="layui-input-inline">');

                        res.push('<input type="text" readonly autocomplete="off" class="layui-input"');
                        res.push(' name="' + item.field + '"');
                        res.push('>');
                        res.push('</div>');
                        if (item.description && item.description != "") {
                            res.push('<div class="layui-form-mid layui-word-aux">' + item.description + '</div>');
                        }
                        return res.join('');
                    },
                    text: function (item) {
                        var res = [];
                        if (item.label)
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
                            res.push(' placeholder="' + item.placeholder + '"');
                        else
                            res.push(' placeholder="请输入"');
                        if (item.refData && (typeof item.refData == 'string' && item.refData.constructor == String)) {
                            res.push(' value="' + item.refData + '"');
                        }
                        if (item.disabled) {
                            res.push(' disabled ');
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
                                        event: 'select(' + item.field + ')',
                                        binder:form
                                    });
                                    res.push('<div class="layui-input-inline">');
                                    res.push('<select lay-filter="' + item.field + '" name="' + item.field + 'Id">');
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
                            res.push(' placeholder="' + item.placeholder + '"');
                        else
                            res.push(' placeholder="请输入"');
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
                                    event: 'radio(' + item.field + ')',
                                    binder:form
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
                                    event: 'checkbox(' + item.field + ')',
                                    binder:form
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
                                    res.push('<input type="checkbox"   lay-filter="' + item.field + '" name="' + item.field + '_' + id + '" title="' + txt + '" ' + flag + '>');
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
                            res.push(' placeholder="' + item.placeholder + '"');
                        else
                            res.push(' placeholder="请输入"');
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
                            event: 'switch(' + item.field + ')',
                            binder:form
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
                                    event: 'select(' + item.field + ')',
                                    binder:form
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
                    tree: function (item) {
                        var res = [];
                        res.push('<label class="layui-form-label">' + item.label + '</label>');
                        if (item.widthType && item.widthType == 'fluid')
                            res.push('<div class="layui-input-block">');
                        else
                            res.push('<div class="layui-input-inline">');

                        if (item.refData.data) {
                            //refData  [id,text,selected]
                            var theInitValue = item.refData.selectInitVal;
                            if (!theInitValue || theInitValue == 0) {
                                (item.refData.data.length > 0) && (theInitValue = item.refData.data[0].id);
                            }
                            var treeId = item.field;

                            fieldMap[item.field] = item.field + "_select_nodeId";
                            var renderData = {
                                elem: "#" + treeId,
                                data: item.refData.data,
                                dataStyle: "layuiStyle",  //使用layui风格的数据格式
                                dataFormat: "list",  //配置data的风格为list
                                select: true,
                                skin: "laySimple",
                                selectInitVal: theInitValue, // 你可以在这里指定默认值
                                done: function (data, src) {
                                    //dtree.dataInit(item.field, "1");
                                    // 也可以在这里指定，第二个参数如果不填，则会自动返显当前选中的数据
                                    dtree.selectVal(item.field, this.selectInitVal.toString());
                                    //console.log(selectParam);

                                }
                            };

                            extEvents.push({
                                field: item.field,
                                event: renderData,
                                binder: dtree
                            });
                            //res.push('<select lay-filter="' + item.field + '" name="' + item.field + '">');
                            res.push('<ul id="' + item.field + '" class="dtree" data-id="0"></ul>');


                        }
                        res.push('</div>');
                        if (item.description && item.description != "") {
                            res.push('<div class="layui-form-mid layui-word-aux">' + item.description + '</div>');
                        }
                        return res.join('');
                    },
                    formselect: function (item) {
                        var res = [];
                        res.push('<label class="layui-form-label">' + item.label + '</label>');
                        res.push('<div class="layui-input-inline" style="width:153px">');
                        res.push('<input type="text" autocomplete="off" class="layui-input"');
                        res.push(' name="' + item.field + '"');
                        if (item.validator && item.validator.length > 0) {
                            res.push(' lay-verify="' + item.field + '"');
                        } else {
                            if (item.verify && item.verify != "")
                                res.push(' lay-verify="' + item.verify + '"');
                        }
                        if (item.placeholder && item.placeholder != "")
                            res.push(' placeholder="' + item.placeholder + '"');
                        else
                            res.push(' placeholder="请输入"');
                        if (item.disabled) {
                            res.push(' disabled ');
                        }
                        res.push('/>');                       
                        
                        res.push('</div>');
                        res.push(' <div class="layui-form-mid layui-word-aux">');
                        var btnName = 'formSelectBtnClickHandler';
                        res.push(' <button lay-event="' + item.field + '" type="button" class="layui-btn-primary layui-btn-xs">');
                        res.push('   <i class="layui-icon">&#xe65f;</i>');
                        res.push(' </button>');
                        res.push('</div>');

                        if (item.description && item.description != "") {
                            res.push('<div class="layui-form-mid layui-word-aux">' + item.description + '</div>');
                        }

                        extEvents.push({
                            field: item.field,
                            event: item.refData,
                            binder: 'button[lay-event="' + item.field + '"]'
                        });
                        return res.join('');
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

            var items = [];
            items.push('<div class="layui-form-item"><div class="layui-inline"></div></div>');
            opts.forEach(item => {
                items.push(formItemToH5(item));
            })
            items.push('<div class="layui-form-item"><div class="layui-inline"></div></div>');
            return items.join('');
        },
        table: function (id) {
            var items = [];
            id = 'pg-table-' + id;
            items.push('<div id="'+id+'" class="pg-table">');
            //items.push('<table class="layui-table" id="'+id+'" lay-filter="'+id+'"></table>');
            items.push('</div>');
            return items.join('');
        },
        //组装:form
        package: function (c) {//c:{headers:[],bodyItems:[]}
            var pageH5 = [
                '<div class="pg-form layui-form" lay-filter="auto-form">'
                , ' <div class="pg-form-content">'
                , '     <div class="pg-form-body">'
                , '         {{d.tabs}}'
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

            var res = '';
            if (c.bodyItems.length > 1) {
                var t = {
                    header: '',
                    body: ''
                };
                var hd = [];
                //hd.push('<ul class="layui-tab-title">');
                c.headers.forEach(function (item, index) {
                    if (index == 0) {
                        hd.push('<li class="layui-this">' + item + '</li>');
                    } else {
                        hd.push('<li>' + item + '</li>');
                    }
                })
                //hd.push('</ul>');
                t.header = hd.join('');

                var bd = [];
                //bd.push('<div class="layui-tab-content">');
                c.bodyItems.forEach(function (item, index) {
                    //console.log(item);
                    if (index == 0) {
                        bd.push(' <div class= "layui-tab-item layui-show" >');
                    } else {
                        bd.push(' <div class= "layui-tab-item" >');
                    }
                    bd.push(item);
                    bd.push('</div>');
                })
                //bd.push('</div>');
                t.body = bd.join('');

                laytpl([' <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">'
                    , ' <ul class="layui-tab-title"> {{d.header}} </ul>'
                    , ' <div class="layui-tab-content"> {{d.body}} </div>'
                    , ' </div>'].join('')).render(t, function (s2) {
                        res = laytpl(pageH5).render({ tabs: s2 });
                    });


            } else if (c.bodyItems.length == 1) {
                res = laytpl(pageH5).render({ tabs: c.bodyItems[0] });
            }
            return res;
        }
    }

    formPage.prototype.init = function (e) {
        var t = this;
        e = $.extend(t.config(), e);
        //初始化页面结构

        if (e.tabs) {
            var t = {
                headers: [],
                bodyItems: []
            }
            e.tabs.forEach(function (item, index) {
                laytpl('步骤 {{d.index}}：{{d.title}}').render({ index: index + 1, title:item.title }, function (s) {
                    t.headers.push(s);
                })
                if (item.type == 'form') {
                    t.bodyItems.push(formCreator[item.type](item.opts));
                } else if (item.type == 'table') {
                    t.bodyItems.push(formCreator[item.type](item.type + index));
                }
            })
            if (e.elem.outerHTML)
                e.elem.outerHTML = formCreator.package(t);
            else
                e.elem.prop('outerHTML', formCreator.package(t));
            
            form.render();
            //render table
            e.tabs.forEach(function (item, index) {
                if (item.type == 'table') {
                    var tabId = item.type + index;
                    item.opts.elem = $('#pg-table-' + tabId);  //tablebox-elem
                    item.opts.table.tableOptions.id = tabId;   //table-id
                    item.opts.table.tableOptions.elem = '#' + tabId; //table-elem
                    tablePage.render(item.opts);
                }
            })

            //if (e.tabs.length == 1) {
            //$('.pg-form-content').pgScroll();
            //} else {
            //}
            
            //处理选项卡切换事件
            element.on('tab(docDemoTabBrief)', function (elem) {
                var item = e.tabs[elem.index];
                if (item.type == 'table') {
                    var tabId = item.type + elem.index;
                    tablePage.resize(tabId);

                }
            });

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
            if (eit.binder == form) {
                if (e.events[eit.field]) {
                    form.on(eit.event, e.events[eit.field])
                } else {
                    form.on(eit.event, function (data) {  //未定义的表单事件
                        if (eit.event.indexOf('select') > -1) { //未定义的表单下拉事件
                            var txt = data.elem[data.elem.selectedIndex].text;
                            $('input[name="' + eit.field + '"]').val(txt);
                        }
                    })
                }
            } else if (eit.binder == dtree) {
                dtree.render(eit.event);
                dtree.on("node('" + eit.field + "')", function (obj) {
                    //下拉列表 选项被点击
                    //layer.msg(JSON.stringify(obj.param));

                });
                $("body").on("click", function (event) {
                    //$("div[" + eit.field + "][dtree-select]").removeClass("layui-form-selected");
                    //$("div["+ eit.field +"][dtree-card]").removeClass("dtree-select-show layui-anim layui-anim-upbit");
                });

            } else if (eit.binder.constructor == String) {
                $(eit.binder).on("click", function (o) {
                    var owner = $('input[name="' + eit.field + '"]'), opts = eit.event;
                    
                    window._cache = {};
                    window._cache[eit.field] = null;
                     
                    layer.open({
                        type: 2,
                        title: opts.title,
                        //closeBtn: 0, //不显示关闭按钮
                        shade: [0],
                        scrollbar: true,
                        area: [opts.width+'px', opts.height+'px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        content: [opts.url, 'no'], //iframe的url
                        success: function (layero, index) {
                            var iframeWin = layero.find('iframe')[0].contentWindow; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();

                            iframeWin.formSelectCallback = function (tdata) {
                                window._cache[eit.field] = tdata;
                            }
                        },
                        end: function () {
                            if (window._cache[eit.field])
                                e.events['formselect'] && e.events['formselect'](owner, window._cache[eit.field]);
                        }
                    });
                });

            }
        })

        //初始化表单元素值
        if (e.initFormData) {
            xsq = JSON.stringify(e.initFormData);
            form.val('auto-form', JSON.parse(xsq));

        }

        form.on('submit(auto-submit)', function (data) {
            Object.keys(fieldMap).forEach(k => {
                if (!data.field[k])
                    data.field[k] = data.field[fieldMap[k]];
            })
            var tdata = {
                table: data.field,
                fields: tablePage.getCache()
            };      
            e.events['dosubmit'](tdata); 
            
            
        });
        $("[lay-filter='auto-close']").on('click', function (obj) {
            if (hasParentPage) {
                var index = parent.layer.getFrameIndex(window.name)
                layer.close(index);
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