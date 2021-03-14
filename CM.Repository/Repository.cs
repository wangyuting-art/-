using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using CM.Repository;
using SqlSugar;

namespace CM.Repository
{
    public class Repository<T> : IRepository<T> where T : class, new()
    {
        public DbContext<T> Context = DbContext<T>.Instance;
        ///<summary>
        ///根据主键删除
        ///<param name="id"></param>
        /// </summary>
        public virtual bool Delete(dynamic id)
        {
            return Context.TableClient.Delete(id);
        }

        public bool Delete(Expression<Func<T, bool>> expression)
        {
            return Context.TableClient.Delete(expression);
        }

        ///<summary>
        ///根据主键批量删除
        ///<param name="ids"></param>
        /// </summary>
        public virtual bool DeleteList(List<dynamic> ids)
        {
            return Context.TableClient.DeleteByIds(ids.ToArray());
        }
        public bool DeleteList(string ids)
        {
            var list = ids.Split('_');
            var idlist = new List<dynamic>();
            foreach(string j in list)
            {
                idlist.Add(Convert.ToInt64(j));
            }
            return DeleteList(idlist);
        }

        ///<summary>
        ///根据主键判断是否存在
        ///<param name="id"></param>
        /// </summary>
        public virtual bool Exists(dynamic id)
        {
            return Context.Db.Queryable<T>().InSingle(id)!=null;
        }

        ///<summary>
        ///取得模型对象
        ///<param name="id"></param>
        /// </summary>
        public virtual T GetModel(dynamic id)
        {
            return Context.TableClient.GetById(id);
        }

        public virtual T GetModel(Expression<Func<T, bool>> expression)
        {
            T model=null;
            List<T> list = GetList(expression);
            if (list.Count > 0) model = list[0];
            return model;
        }

        ///<summary>
        ///获取所有        
        /// </summary>
        ///<returns></returns>
        public List<T> GetList()
        {
            return Context.TableClient.GetList();
        }
        ///<summary>
        ///获取所有        
        /// </summary>
        ///<param name="where">查询字符串</param>
        ///<returns></returns>
        public virtual List<T> GetList(string where)
        {
            return Context.Db.Queryable<T>().Where(where).ToList();
        }

        public List<T> GetList(Expression<Func<T, bool>> expression)
        {
            return Context.Db.Queryable<T>().Where(expression).ToList();
        }
        ///<summary>
        ///获取分页列表        
        /// </summary>
        ///<param name="pageIndex">页索引，从1开始</param>
        ///<param name="pageSize">页记录大小</param>
        ///<returns></returns>
        public virtual List<T> GetPageList(int pageIndex, int pageSize)
        {
            return Context.Db.Queryable<T>()
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

        public virtual List<T> GetPageList(int pageIndex, int pageSize, string where)
        {
            return Context.Db.Queryable<T>().Where(where)
               .Skip((pageIndex - 1) * pageSize)
               .Take(pageSize)
               .ToList();
        }

        public virtual List<T> GetPageList(int pageIndex, int pageSize, Expression<Func<T, bool>> expression)
        {
            return Context.Db.Queryable<T>().Where(expression)
               .Skip((pageIndex - 1) * pageSize)
               .Take(pageSize)
               .ToList();
        }

        ///<summary>
        ///增加        
        /// </summary>
        ///<returns>自增列id的值</returns>
        public virtual bool Insert(T obj)
        {
            return Context.Db.Insertable(obj).ExecuteCommandIdentityIntoEntity();
        }

        ///<summary>
        ///更新        
        /// </summary>
        ///<param name="id"></param>
        ///<returns></returns>
        public virtual bool Update(T obj)
        {
            return Context.TableClient.Update(obj);
        }

       
    }
}
