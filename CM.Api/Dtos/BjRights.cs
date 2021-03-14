using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CM.Api.Dtos
{
    public class BjRights
    {
        public long bjid { get; set; }
        public List<RighttItem>Rights { get; set; }
    }
    public class RighttItem
    {
        public long ResourcetId { get; set; }
        public bool Selectted { get; set; }
    }
}

