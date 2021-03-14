using System;
using System.Linq;
using System.Text;

namespace CM.Models
{
    ///<summary>
    ///
    ///</summary>
    public partial class cm_article
    {
           public cm_article(){


           }
           /// <summary>
           /// Desc:ID
           /// Default:
           /// Nullable:False
           /// </summary>           
           public long id {get;set;}

           /// <summary>
           /// Desc:文章标题
           /// Default:
           /// Nullable:False
           /// </summary>           
           public string title {get;set;}

           /// <summary>
           /// Desc:所属栏目
           /// Default:
           /// Nullable:False
           /// </summary>           
           public long columnId {get;set;}

           /// <summary>
           /// Desc:内容文本
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string body {get;set;}

           /// <summary>
           /// Desc:文章链接
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string url {get;set;}

           /// <summary>
           /// Desc:文章网址
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string fileUrl {get;set;}

           /// <summary>
           /// Desc:大图网址
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string bigPic {get;set;}

           /// <summary>
           /// Desc:小图网址
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string smallPic {get;set;}

           /// <summary>
           /// Desc:列表图网址
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string wxPic {get;set;}

           /// <summary>
           /// Desc:文章状态
           /// Default:0
           /// Nullable:True
           /// </summary>           
           public int? state {get;set;}

           /// <summary>
           /// Desc:同级排序
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string orderNo {get;set;}

           /// <summary>
           /// Desc:编辑ID
           /// Default:
           /// Nullable:True
           /// </summary>           
           public byte[] editorId {get;set;}

           /// <summary>
           /// Desc:编辑姓名
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string editor {get;set;}

           /// <summary>
           /// Desc:上次时间
           /// Default:
           /// Nullable:True
           /// </summary>           
           public DateTime? editTime {get;set;}

           /// <summary>
           /// Desc:发布时间
           /// Default:
           /// Nullable:True
           /// </summary>           
           public DateTime? publishDate {get;set;}

           /// <summary>
           /// Desc:创建人ID
           /// Default:
           /// Nullable:True
           /// </summary>           
           public long? creatorId {get;set;}

           /// <summary>
           /// Desc:创建人姓名
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string creator {get;set;}

           /// <summary>
           /// Desc:创建时间
           /// Default:
           /// Nullable:True
           /// </summary>           
           public DateTime? creatTime {get;set;}

           /// <summary>
           /// Desc:检查人ID
           /// Default:
           /// Nullable:True
           /// </summary>           
           public long? checkerId {get;set;}

           /// <summary>
           /// Desc:检查人姓名
           /// Default:
           /// Nullable:True
           /// </summary>           
           public string checker {get;set;}

           /// <summary>
           /// Desc:检查人时间
           /// Default:
           /// Nullable:True
           /// </summary>           
           public DateTime? checkerTime {get;set;}

    }
}
