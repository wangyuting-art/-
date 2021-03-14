using System;
using SqlSugar;
namespace CM.Repository
{
    public class DbContext<T> where T : class, new()
    {
        public DbContext()
        {
            var cnn = "server=127.0.0.1;uid=root;pwd=root;database=kxcms;sslmode=None";
            Db = new SqlSugarClient(new ConnectionConfig()
            {
                ConnectionString = cnn,
                DbType = DbType.MySql,
                InitKeyType = InitKeyType.Attribute,//从特性读取主键和自增列信息
                IsAutoCloseConnection = true,//开启自动释放模式和EF原理一样我就不多解释了

            });
            TableClient = new SimpleClient<T>(Db);

        }
        //注意：不能写成静态的
        public SqlSugarClient Db { get; private set; }//用来处理事务多表查询和复杂的操作
        //用来处理表的常规操作
        public SimpleClient<T> TableClient { get; private set; }
        public static DbContext<T> Instance = new DbContext<T>();
    }
}
