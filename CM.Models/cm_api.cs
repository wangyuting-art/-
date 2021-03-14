using System;
using System.Linq;
using System.Text;

namespace CM.Models
{
    ///<summary>
    ///
    ///</summary>
    public partial class cm_api
    {
           public cm_api(){


           }
           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:False
           /// </summary>           
           public long id {get;set;}

           /// <summary>
           /// Desc:接口名词
           /// Default:
           /// Nullable:False
           /// </summary>           
           public string name {get;set;}

           /// <summary>
           /// Desc:接口端点
           /// Default:
           /// Nullable:False
           /// </summary>           
           public string url {get;set;}

           /// <summary>
           /// Desc:可调方法
           /// Default:
           /// Nullable:False
           /// </summary>           
           public string methods {get;set;}

           /// <summary>
           /// Desc:同级排序号
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string orderNo {get;set;}

    }
}
