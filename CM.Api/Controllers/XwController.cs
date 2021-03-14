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
    public class XwController : ControllerBase
    {
        //服务积累
        Service<jw_xw> service = new Service<jw_xw>();
        // GET: api/xw
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
                list = list.Where(o => o.title .IndexOf(key) > -1).ToList();
            }
            json.Data = list;
            return json;
        }

        // GET: api/xw/5
        [HttpGet("{id}")]
        public ActionResult<ResponseJson> Get(long id)
        {
            ResponseJson json = new ResponseJson();
            json.Data = service.GetModel(o => o.id == id);
            return json;
        }

        // POST: api/xw
        [HttpPost]
        public ActionResult<ResponseJson> Post([FromBody] Models.jw_xw model)
        {
            ResponseJson json = new ResponseJson();
            //写不进报错
            if (!service.Insert(model))
            {
                json.Code = "500";
                json.Msg = $"增加[角色：{model.title}]失败！";
            }
            return json;
        }

        // PUT: api/xw/5
        [HttpPut("{id}")]
        public ActionResult<ResponseJson> Put(long id, [FromBody] Models.jw_xw model)
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
            bool flag = service.Delete(o => o.id == id);
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
    }
}
