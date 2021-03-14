using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using CM.Services;
using CM.Repository;
using CM.Api.Utility;
using Microsoft.AspNetCore.Authorization;

namespace CM.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MenuController : ControllerBase
    {
        private Service<Models.cm_menu> service = new Service<Models.cm_menu>();
        //GET:api/Menu
        [HttpGet]//搜索
        public ActionResult<ResponseJson> Get()
        {
            ResponseJson json = new ResponseJson();
            var list = service.GetList().OrderBy(o => o.id).ToList();
            string key = this.Request.Query["name"].ToString();
            if (key != "")
            {
                list = list.Where(o => o.name.IndexOf(key) > -1).ToList();
            }
            json.Data = list;
            json.Count = list.Count;
            return json;
        }
        
        //GET:api/Menu/5
        [HttpGet("{id}")]
        public ActionResult<ResponseJson> Get(long id)//取得单条数据
        {
            ResponseJson json = new ResponseJson();
            json.Data = service.GetModel(o => o.id == id);
            return json;
        }

        // POST: api/Menu
        [HttpPost]//新增
        public ActionResult<ResponseJson> Post([FromBody] Models.cm_menu model)//新建保存
        {
            ResponseJson json = new ResponseJson();
            if (!service.Insert(model))
            {
                json.Code = "500";
                json.Msg = $"增加[角色：{model.name}]失败！";
            }
            return json;
        }

        // PUT: api/Menu/5
        [HttpPut("{id}")]//修改
        public ActionResult<ResponseJson> Put(long id, [FromBody] Models.cm_menu model)//编辑方法
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
        public ActionResult<ResponseJson> GetUserMenu(long id) {
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
