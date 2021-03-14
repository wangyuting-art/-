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
    public class ColumnController : ControllerBase
    {
        
        Service<cm_column> service = new Service<cm_column>();
        // GET: api/Column
        [HttpGet]//搜索
        public ActionResult<ResponseJson> Get()//取得所有数据
        {
            ResponseJson json = new ResponseJson();
            var list = service.GetList().OrderBy(o=>o.id).ToList();
            string key = this.Request.Query["name"].ToString();
            if (key != "")
            {
                list = list.Where(o => o.name.IndexOf(key) > -1).ToList();
            }
            json.Count = list.Count;
            json.Data = list;
            return json;
        }

        // GET: api/Column/5
        [HttpGet("{id}")]
        public ActionResult<ResponseJson> Get(long id)//取得单条数据
        {
            ResponseJson json = new ResponseJson();
            json.Data = service.GetModel(o => o.id == id);
            return json;
        }

        // POST: api/Column
        [HttpPost]//新增
        public ActionResult<ResponseJson> Post([FromBody] Models.cm_column model)//新建保存
        {
            ResponseJson json = new ResponseJson();
            if (!service.Insert(model))
            {
                json.Code = "500";
                json.Msg = $"增加[角色：{model.name}]失败！";
            }
            return json;
        }

        // PUT: api/Column/5
        [HttpPut("{id}")]//修改//编辑方法
        public ActionResult<ResponseJson> Put(long id, [FromBody] Models.cm_column model)
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
        [HttpDelete("{id}")]//删除
        public ActionResult<ResponseJson> Delete(long id)
        {
            ResponseJson json = new ResponseJson();
            bool hasChild = service.GetList(o => o.parentId == id).Count > 0;//判断有无子类
            if (!hasChild)
            {
                bool flag = false;
                flag = service.Delete(o => o.id == id);
                if (!flag)
                {
                    json.Code = "500";
                    json.Msg = "删除失败";
                }
            }
            else
            {
                json.Code = "500";
                json.Msg = "删除失败,请先删除子项";
            }
            return json;
        }




        #region 权限 
        // GET: api/Menu/5
        [HttpGet("User/{id}")]
        public ActionResult<ResponseJson> GetUserMenu(long id)
        {
            UserService service = new UserService();
            ResponseJson json = new ResponseJson();
            var list = service.GetUserMenus(id);
            json.Data = list;
            json.Count = list.Count;
            return json;
        }

        // GET: api/Menu/5
        [HttpGet("Rights/{roleid}")]
        public ActionResult<ResponseJson> GetMenuRights(int roleid)
        {
            UserService service = new UserService();
            ResponseJson json = new ResponseJson();
            var list = service.GetMenuRights(0, roleid);
            json.Data = list;
            json.Count = list.Count;
            return json;
        }
        #endregion
    }
}
