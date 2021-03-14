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
    public class XsController : ControllerBase
    {
        // GET: api/xs
        XsService service = new XsService();
        
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
                list = list.Where(o => o.xsName.IndexOf(key) > -1).ToList();
            }
            json.Data = list;
            return json;
        }
        //GET: api/xs/5
        //[HttpGet("{id}")]
        public ActionResult<ResponseJson> Get(long id)
        {
            Service<jw_xs_bj> xbService = new Service<jw_xs_bj>();
            Service<jw_bj> bService = new Service<jw_bj>();
            ResponseJson json = new ResponseJson();
            var ids = xbService.GetList(o => o.xsid == id).Select(o => o.bjid).Distinct().ToList();
            List<dynamic> bjs = new List<dynamic>();
            foreach (var m in bService.GetList())
            {
                bjs.Add(new
                {
                    m.id,
                    m.bjname,
                    selected = ids.Contains(m.id) ? 1 : 0
                });
            }
            json.Data = new
            {
                Xs = service.GetModel(id),
                Bjs = bjs
            };
            json.Count = 1;
            return json;

        }

        //GET: api/xs/5
        [HttpGet("bj/{id}")]
        public ActionResult<ResponseJson> GetRoleUsers(long id)
        {
            ResponseJson json = new ResponseJson();
            var list = service.GettAccouts(id);
            json.Count = list.Count;
            json.Data = list;
            return json;
        }

        //POST: api/xs
        [HttpPost]
        public ActionResult<ResponseJson> Post([FromBody] Dtos.XsBj model)
        {
            Service<jw_xs_bj> xbService = new Service<jw_xs_bj>();
            ResponseJson json = new ResponseJson();
            try
            {
                service.Context.Db.BeginTran();
                model.Xs.joinTime = DateTime.Now;
                long xid = service.Context.Db.Insertable(model.Xs).ExecuteReturnIdentity();
                if (xid > 0)
                {
                    foreach (var bjid in model.Bjs)
                    {
                        xbService.Insert(new jw_xs_bj
                        {
                            xsid = xid,
                            bjid = bjid
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

        //[HttpPut("reset/{id}")]
        //public ActionResult<ResponseJson> ResetPassword(long id, [FromBody] string value)
        //{
        //    ResponseJson json = new ResponseJson();
        //    var model = service.GetModel(o => o.id == id);
        //    //model.userPwd = value;
        //    if (!service.Update(model))
        //    {
        //        json.Code = "500";
        //        json.Msg = "新建账号失败";
        //    }
        //    return json;
        //}

        // PUT: api/xs/5
        [HttpPut("{id}")]
        public ActionResult<ResponseJson> Put(int id, [FromBody] Dtos.XsBj model)
        {
            Service<jw_xs_bj> xbService = new Service<jw_xs_bj>();
            ResponseJson json = new ResponseJson();
            List<dynamic> ids = new List<dynamic>();
            try
            {
                var haved = xbService.GetList(o => o.xsid == id).ToList();
                service.Context.Db.BeginTran();
                //修改用户信息
                model.Xs.id = id;
                service.Update(model.Xs);
                //删除用户角色
                foreach (var t in haved.Where(o => !model.Bjs.Contains(o.bjid)))
                    ids.Add(t.id);
                xbService.DeleteList(ids);
                //增加用户角色
                var tids = haved.Select(w => w.bjid).Distinct().ToList();
                foreach (var t in model.Bjs.Where(o => !tids.Contains(o)))
                {
                    {
                        xbService.Insert(new jw_xs_bj
                        {
                            xsid = id,
                            bjid = t
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
        public void Delete(int id)
        {
        }
    }
}
