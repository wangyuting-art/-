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
    public class BjController : ControllerBase
    {
        //服务积累
        Service<jw_bj> service = new Service<jw_bj>();
        // GET: api/bj
        [HttpGet]
        public ActionResult<ResponseJson> Get()
        {       
            ResponseJson json = new ResponseJson();
            //取所有的数据
            var list = service.GetList().OrderBy(o=>o.id).ToList();
            //查询的过滤条件
            string key = this.Request.Query["bjname"].ToString();
            json.Count = list.Count;
            if (key != "")
            {
                list = list.Where(o => o.bjname.IndexOf(key) > -1).ToList();
            }
            json.Data = list;
            return json;
        } 

        // GET: api/bj/5
        [HttpGet("{id}")]
        public ActionResult<ResponseJson> Get(long id)
        {
            ResponseJson json = new ResponseJson();
            json.Data = service.GetModel(o => o.id == id);
            return json;
        }

        // POST: api/bj
        [HttpPost]
        public ActionResult<ResponseJson> Post([FromBody] Models.jw_bj model)
        {
            ResponseJson json = new ResponseJson();
            //写不进报错
            if (!service.Insert(model))
            {
                json.Code = "500";
                json.Msg = $"增加[角色：{model.bjname}]失败！";
            }
            return json;
        }

        // PUT: api/bj/5
        [HttpPut("{id}")]
        public ActionResult<ResponseJson> Put(long id, [FromBody] Models.jw_bj model)
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
        public ActionResult<ResponseJson> changeMenuRights([FromBody]Dtos.BjRights model)
        {
            ResponseJson json = new ResponseJson();
            Service<jw_xs_bj> xbService = new Service<jw_xs_bj>();
            var havedMenus = xbService.GetList(o => o.bjid == model.bjid);
            xbService.Context.Db.BeginTran();
            try
            {
                List<dynamic> ids = new List<dynamic>();
                foreach(var o in havedMenus.Where(w => 
                    model.Rights.Where(t => t.Selectted == false).Select(t => t.ResourcetId).Contains(w.bjid)))
                {
                    ids.Add(o.id);
                }
                xbService.DeleteList(ids);
                var tids = model.Rights.Where(w => w.Selectted).Select(o => o.ResourcetId).Except(havedMenus.Select(o => o.bjid)).ToList();
                foreach (var o in tids)
                {
                    xbService.Insert(new jw_xs_bj
                    {
                        xsid = o,
                        bjid = model.bjid
                    });
                }
                xbService.Context.Db.CommitTran();
            }
            catch
            {
                json.Code = "500";
                json.Msg = "授权失败!";
                xbService.Context.Db.RollbackTran();
            }
            return json;
        }
    }
}
