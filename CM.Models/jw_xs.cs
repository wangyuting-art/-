using SqlSugar;
using System;
using System.Linq;
using System.Text;
namespace CM.Models
{
    ///<summary>
    ///
    ///</summary>
    public partial class jw_xs
    {
           public jw_xs(){


           }
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        /// <summary>
        /// Desc:ID
        /// Default:
        /// Nullable:False
        /// </summary>           
        public long id {get;set;}

           /// <summary>
           /// Desc:姓名
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string xsName {get;set;}

           /// <summary>
           /// Desc:电话号码
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string phone {get;set;}

           /// <summary>
           /// Desc:禁用？
           /// Default:0
           /// Nullable:False
           /// </summary>           
           public byte disabled {get;set;}

           /// <summary>
           /// Desc:最近登录时间
           /// Default:
           /// Nullable:True
           /// </summary>           
           public DateTime? lastLoginedTime {get;set;}

           /// <summary>
           /// Desc:用户口令
           /// Default:CURRENT_TIMESTAMP
           /// Nullable:False
           /// </summary>           
           public DateTime joinTime {get;set;}

    }
}
