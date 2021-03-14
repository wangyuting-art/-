using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CM.Api.Dtos
{
    public class UserRoles
    {
        public Models.cm_user User { get; set; }
        public List<long>Roles { get; set; }
    }

}

