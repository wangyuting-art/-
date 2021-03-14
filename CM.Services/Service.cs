using System;
using System.Collections.Generic;
using System.Text;
using CM.Repository;

namespace CM.Services
{
    public class Service<T> : Repository<T> where T : class, new()
    {
    }
}
