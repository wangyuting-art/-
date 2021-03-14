using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CM.Api.Utility;
using CM.Models;
using CM.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CM.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        // GET: api/User
        UserService service = new UserService();
    
        [HttpGet]
        public ActionResult<ResponseJson> Get()
        {
            ResponseJson json = new ResponseJson();
            //取所有的数据
            var list = service.GetList().OrderBy(o => o.id).ToList();
            //查询的过滤条件
            string key = this.Request.Query["name"].ToString();
            json.Count = list.Count;
            if (key != "")
            {
                list = list.Where(o => o.userName.IndexOf(key) > -1).ToList();
            }
            json.Data = list;
            return json;
        }
        //GET: api/User/5
        [HttpGet("{id}")]
        public ActionResult<ResponseJson> Get(long id)
        {
            Service<cm_user_role> urService = new Service<cm_user_role>();
            Service<cm_role> rService = new Service<cm_role>();
            ResponseJson json = new ResponseJson();
            var ids = urService.GetList(o => o.userId == id).Select(o => o.roleId).Distinct().ToList();
            List<dynamic> roles = new List<dynamic>();
            foreach (var m in rService.GetList())
            {
                roles.Add(new
                {
                    m.id,
                    m.name,
                    selected = ids.Contains(m.id) ? 1 : 0
                });
            }
            json.Data = new
            {
                User = service.GetModel(id),
                Roles = roles
            };
            json.Count=1;
            return json;
        }
        
        // GET: api/User/5
        [HttpGet("role/{id}")]
        public ActionResult<ResponseJson> GetRoleUsers(long id)
        {
            ResponseJson json = new ResponseJson();
            var list = service.GetAccouts(id);
            json.Count = list.Count;
            json.Data = list;
            return json;
        }

        //POST: api/User
       [HttpPost]
        public ActionResult<ResponseJson> Post([FromBody] Dtos.UserRoles model)
        {
            Service<cm_user_role> urService = new Service<cm_user_role>();
            ResponseJson json = new ResponseJson();
            try
            {
                service.Context.Db.BeginTran();
                model.User.joinTime = DateTime.Now;
                long uid = service.Context.Db.Insertable(model.User).ExecuteReturnIdentity();
                if (uid > 0)
                {
                    foreach(var roleId in model.Roles)
                    {
                        urService.Insert(new cm_user_role
                        {
                            userId = uid,
                            roleId = roleId
                        });
                    }
                }
                service.Context.Db.CommitTran();
            }
            catch
            {
                json.Code = "500";
                json.Msg = "新建账号失败！";
                service.Context.Db.RollbackTran();
            }
            return json;
        }

        [HttpPut("reset/{id}")]
        public ActionResult<ResponseJson> ResetPassword(long id, [FromBody] string value)
        {
            ResponseJson json = new ResponseJson();
            var model = service.GetModel(o => o.id == id);
            model.userPwd = value;
            if (!service.Update(model))
            {
                json.Code = "500";
                json.Msg = "新建账号失败";
            }
            return json;
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public ActionResult<ResponseJson> Put(int id, [FromBody] Dtos.UserRoles model)
        {
            Service<cm_user_role> urService = new Service<cm_user_role>();
            ResponseJson json = new ResponseJson();
            List<dynamic> ids = new List<dynamic>();
            try
            {
                var haved = urService.GetList(o => o.userId == id).ToList();
                service.Context.Db.BeginTran();
                //修改用户信息
                model.User.id = id;
                service.Update(model.User);
                //删除用户角色
                foreach (var t in haved.Where(o => !model.Roles.Contains(o.roleId)))
                    ids.Add(t.id);
                urService.DeleteList(ids);
                //增加用户角色
                var tids = haved.Select(w => w.roleId).Distinct().ToList();
                foreach (var t in model.Roles.Where(o => !tids.Contains(o)))
                {
                    {
                        urService.Insert(new cm_user_role
                        {
                            userId = id,
                            roleId = t
                        });
                    }

                    service.Context.Db.CommitTran();
                }
            }
            catch
            {
                json.Code = "500";
                json.Msg = "新建账号失败！";
            }
            return json;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult<ResponseJson> Delete(long id)
        {
            ResponseJson json = new ResponseJson();
            bool flag = service.Delete(o => o.id == id);
            if (!flag)
            {
                json.Code = "500";
                json.Msg = "行删失败！";
            }
            return json;
        }
    }
}
