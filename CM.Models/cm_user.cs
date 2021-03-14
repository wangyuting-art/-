using SqlSugar;
using System;
using System.Linq;
using System.Text;

namespace CM.Models
{
    ///<summary>
    ///
    ///</summary>
    public partial class cm_user
    {
           public cm_user(){


           }
        /// <summary>
        /// Desc:ID
        /// Default:
        /// Nullable:False
        /// </summary>           
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public long id {get;set;}

           /// <summary>
           /// Desc:用户账号
           /// Default:
           /// Nullable:False
           /// </summary>           
           public string userAcc {get;set;}

           /// <summary>
           /// Desc:用户口令
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string userPwd {get;set;}

           /// <summary>
           /// Desc:用户姓名
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string userName {get;set;}

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
           /// Nullable:True
           /// </summary>           
           public DateTime? joinTime {get;set;}

    }
}
