using System;
using System.Linq;
using System.Text;

namespace CM.Models
{
    ///<summary>
    ///
    ///</summary>
    public partial class cm_member
    {
           public cm_member(){


           }
           /// <summary>
           /// Desc:ID
           /// Default:
           /// Nullable:False
           /// </summary>           
           public long id {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string userACC {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string userName {get;set;}

           /// <summary>
           /// Desc:微信头像
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string icon {get;set;}

           /// <summary>
           /// Desc:手机
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string phone {get;set;}

           /// <summary>
           /// Desc:会员标签
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string tags {get;set;}

           /// <summary>
           /// Desc:上次登录时间
           /// Default:
           /// Nullable:True
           /// </summary>           
           public DateTime? lastLoginedTime {get;set;}

           /// <summary>
           /// Desc:微信昵称
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string wx_nick {get;set;}

           /// <summary>
           /// Desc:公众号id
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string wx_openId {get;set;}

           /// <summary>
           /// Desc:小程序id
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string mp_openId {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string unionId {get;set;}

    }
}
