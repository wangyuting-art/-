using SqlSugar;
using System;
using System.Linq;
using System.Text;

namespace CM.Models
{
    ///<summary>
    ///
    ///</summary>
    public partial class cm_menu
    {
           public cm_menu(){


           }
        /// <summary>
        /// Desc:id
        /// Default:
        /// Nullable:False
        /// </summary>           
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public long id {get;set;}

           /// <summary>
           /// Desc:菜单名词
           /// Default:
           /// Nullable:False
           /// </summary>           
           public string name {get;set;}

           /// <summary>
           /// Desc:菜单网址
           /// Default:#
           /// Nullable:False
           /// </summary>           
           public string url {get;set;}

           /// <summary>
           /// Desc:菜单图标
           /// Default:#
           /// Nullable:True
           /// </summary>           
           public string icon {get;set;}

           /// <summary>
           /// Desc:上级菜单id
           /// Default:0
           /// Nullable:True
           /// </summary>           
           public long parentId {get;set;}

           /// <summary>
           /// Desc:同级排序号
           /// Default:'99'
           /// Nullable:True
           /// </summary>           
           public string orderNo {get;set;}

    }
}
