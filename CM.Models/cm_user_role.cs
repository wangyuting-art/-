using System;
using System.Linq;
using System.Text;

namespace CM.Models
{
    ///<summary>
    ///
    ///</summary>
    public partial class cm_user_role
    {
           public cm_user_role(){


           }
           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:False
           /// </summary>           
           public long id {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:False
           /// </summary>           
           public long userId {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           public long roleId {get;set;}

    }
}
