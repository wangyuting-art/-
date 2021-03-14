using System;

namespace ModelsClassBuilder
{
    class Program
    {
        static void Main(string[] args)
        {
            DbContext<object> ctx = new DbContext<object>();
            ctx.Db.DbFirst.Where(SqlSugar.DbObjectType.Table).CreateClassFile("D:\\code\\", "CM.Models");
        }
    }
}
