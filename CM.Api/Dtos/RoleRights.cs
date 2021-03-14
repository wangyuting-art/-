using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CM.Api.Dtos
{
    public class RoleRights
    {
        public long RoleId { get; set; }
        public List<RightItem>Rights { get; set; }
    }
    public class RightItem
    {
        public long ResourceId { get; set; }
        public bool Selected { get; set; }
    }
}

