using System;
using System.Linq;
using System.Text;

namespace CM.Models
{
    ///<summary>
    ///
    ///</summary>
    public partial class cm_role_column
    {
           public cm_role_column(){


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
           public long roleId {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           public long? columnId {get;set;}

    }
}
