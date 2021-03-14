using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace CM.Repository
{
    public interface IRepository<T> where T :class,new()
    {

        #region 标准方法

        ///<summary>
        ///取得模型对象
        ///<summary>
        ///<param name="id"></param>
        ///<returns></returns>
        T GetModel(dynamic id);//传进一个id返回T对象
        T GetModel(Expression<Func<T,bool>>expression);//传进一个表达式返回对象

        ///<summary>
        ///获取所有
        ///<summary>
        ///<returns></returns>
        List<T> GetList();//返回表的所有数据，以列表的形式

        ///<summary>
        ///获取所有
        ///<summary>
        ///<returns></returns>      
        List<T> GetList(Expression<Func<T, bool>> expression);//有条件的T类型

        ///<summary>
        ///获取分页列表
        ///<summary>
        ///<param name="pageIndex">页索引，从1开始</param>
        ///<param name="pageSize">页记录大小</param>
        ///<returns></returns> 
        List<T> GetPageList(int pageIndex, int pageSize);//分页list

        ///<summary>
        ///按条件获取分页列表
        ///<summary>
        ///<param name="pageIndex">页索引，从1开始</param>
        ///<param name="pageSize">页记录大小</param>
        ///<param name="pageSize">查询条件字符串</param>
        ///<returns></returns> 
        List<T> GetPageList(int pageIndex, int pageSize, string where);
        List<T> GetPageList(int pageIndex, int pageSize, Expression<Func<T, bool>> expression);

        ///<summary>
        ///增加
        ///<summary>
        ///<param name="where">查询字符串</param>
        ///<returns></returns> 
        bool Insert(T obj);//传一个对象到数据库

        ///<summary>
        ///根据主键删除
        ///<summary>
        ///<param name="id"></param>
        ///<returns></returns> 
        bool Delete(dynamic id);//根据指定的id删除
        bool Delete(Expression<Func<T, bool>> expression);//根据查询表删除

        ///<summary>
        ///根据主键批量删除
        ///<summary>
        ///<param name="ids">id之间用，分隔</param>
        ///<returns></returns> 
        bool DeleteList(List<dynamic> ids);//根据指定的id列表删除
        bool DeleteList(string ids);//根据id列表（字符串形式）删除

        ///<summary>
        ///更新
        ///<summary>
        ///<param name="id"></param>
        ///<returns></returns> 
        bool Update(T obj);//对象更新

        ///<summary>
        ///根据主键判断是否存在
        ///<summary>
        ///<param name="id"></param>
        ///<returns></returns> 
        bool Exists(dynamic id);
        #endregion
    }
}
