using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CM.Api.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CM.Services;
using CM.Models;
using Microsoft.AspNetCore.Authorization;

namespace CM.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RoleController : ControllerBase
    {
        //服务积累
        Service<cm_role> service = new Service<cm_role>();
        // GET: api/Role
        [HttpGet]
        public ActionResult<ResponseJson> Get()
        {       
            ResponseJson json = new ResponseJson();
            //取所有的数据
            var list = service.GetList().OrderBy(o=>o.id).ToList();
            //查询的过滤条件
            string key = this.Request.Query["name"].ToString();
            json.Count = list.Count;
            if (key != "")
            {
                list = list.Where(o => o.name.IndexOf(key) > -1).ToList();
            }
            json.Data = list;
            return json;
        } 

        // GET: api/Role/5
        [HttpGet("{id}")]
        public ActionResult<ResponseJson> Get(long id)
        {
            ResponseJson json = new ResponseJson();
            json.Data = service.GetModel(o => o.id == id);
            return json;
        }

        // POST: api/Role
        [HttpPost]
        public ActionResult<ResponseJson> Post([FromBody] Models.cm_role model)
        {
            ResponseJson json = new ResponseJson();
            //写不进报错
            if (!service.Insert(model))
            {
                json.Code = "500";
                json.Msg = $"增加[角色：{model.name}]失败！";
            }
            return json;
        }

        // PUT: api/Role/5
        [HttpPut("{id}")]
        public ActionResult<ResponseJson> Put(long id, [FromBody] Models.cm_role model)
        {
            ResponseJson json = new ResponseJson();
            bool flag = false;
            if (service.Exists(id))
            {
                model.id = id;
                flag = service.Update(model);
            }
            if (!flag)
            {
                json.Code = "500";
                json.Msg = "修改失败！";
            }
            return json;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult<ResponseJson> Delete(long id)
        {
            ResponseJson json = new ResponseJson();
            bool flag = service.Delete(o=>o.id==id);
            if (!flag)
            {
                json.Code = "500";
                json.Msg = "行删失败！";
            }
            return json;
        }
        [HttpPost("deleteList")]
        public ActionResult<ResponseJson> Post([FromBody] List<dynamic> ids)
        {
            ResponseJson json = new ResponseJson();
            bool flag = service.DeleteList(ids);
            if (!flag)
            {
                json.Code = "500";
                json.Msg = "批删失败！";
            }
            return json;
        }
        [HttpPost("changeMenuRights")]
        public ActionResult<ResponseJson> changeMenuRights([FromBody]Dtos.RoleRights model)
        {
            ResponseJson json = new ResponseJson();
            Service<cm_role_menu> rmService = new Service<cm_role_menu>();
            var havedMenus = rmService.GetList(o => o.roleId == model.RoleId);
            rmService.Context.Db.BeginTran();
            try
            {
                List<dynamic> ids = new List<dynamic>();
                foreach(var o in havedMenus.Where(w => 
                    model.Rights.Where(t => t.Selected == false).Select(t => t.ResourceId).Contains(w.menuId)))
                {
                    ids.Add(o.id);
                }
                rmService.DeleteList(ids);
                var tids = model.Rights.Where(w => w.Selected).Select(o => o.ResourceId).Except(havedMenus.Select(o => o.menuId)).ToList();
                foreach (var o in tids)
                {
                    rmService.Insert(new cm_role_menu
                    {
                        menuId = o,
                        roleId = model.RoleId
                    });
                }
                rmService.Context.Db.CommitTran();
            }
            catch
            {
                json.Code = "500";
                json.Msg = "授权失败!";
                rmService.Context.Db.RollbackTran();
            }
            return json;
        }
    }
}
