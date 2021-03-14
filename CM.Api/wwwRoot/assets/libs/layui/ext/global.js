/** 扩展引入第三方LayUI模块*/
layui
  .config({
    base: "/assets/libs/layui/ext/" //你存放新模块的目录，注意，不是layui的模块目录
  })
  .extend({
    //设定模块别名
    //treeTable: "tree/treeTable",//相对于上述 base 目录的子目录
    dtree: "raw/dtree/dtree",
    treeTable: "raw/treeTable/treeTable",
    formSelects: "raw/formSelects/formSelects-v4",
    iconPicker: "raw/iconPicker/iconPicker",

    pgScroll: "components/scroll/pg-scroll",
    pgLayout: "components/layout/pg-layout",
    pgTree: "components/tree/pg-tree",

    treeTablePage: "pages/treeTablePage/treeTablePage",
    tablePage: "pages/tablePage/tablePage",
    formPage: "pages/formPage2/formPage"
  });



