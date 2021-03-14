using SqlSugar;
using System;
using System.Linq;
using System.Text;

namespace CM.Models
{
    ///<summary>
    ///
    ///</summary>
    public partial class cm_column
    {
           public cm_column(){


           }
        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:False
        /// </summary>     
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public long id {get;set;}

           /// <summary>
           /// Desc:栏目名词
           /// Default:
           /// Nullable:False
           /// </summary>           
           public string name {get;set;}

           /// <summary>
           /// Desc:上级栏目ID
           /// Default:
           /// Nullable:False
           /// </summary>           
           public long parentId {get;set;}

           /// <summary>
           /// Desc:同级排序
           /// Default:'99'
           /// Nullable:True
           /// </summary>           
           public string orderNo {get;set;}

    }
}
