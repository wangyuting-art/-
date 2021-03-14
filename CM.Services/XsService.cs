using CM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CM.Repository;

namespace CM.Services
{
    public class XsService : Service<jw_xs>
    {
        //Service<jw_xs_bj> xbService = new Service<jw_xs_bj>();


        public List<dynamic> GettAccouts(long bjid)
        {
            Service<jw_xs_bj> xbService = new Service<jw_xs_bj>();
            //按角色取用户，0为所有
            List<jw_xs_bj> bx = bjid <= 0 ? xbService.GetList() : xbService.GetList(o => o.bjid == bjid);
            //取角色对应的userids
            List<long> bXsIds = bx.Select(o => o.xsid).Distinct().ToList();

            //根据userids，取cm_user_role集合，用于生成userid-userRoleIds的键值对集合
            List<jw_xs_bj> xb = xbService.GetList(o => bXsIds.Contains(o.xsid));
            //拼 用户的多角色ids字符串
            Dictionary<long, string> dict = new Dictionary<long, string>();
            foreach(var o in xb)
            {
                if (dict.ContainsKey(o.xsid))
                {
                    dict[o.xsid] += "," + o.bjid.ToString();
                }
                else
                {
                    dict.Add(o.xsid, o.bjid.ToString());
                }
            }
            //拼账号信息
            List<dynamic> list = new List<dynamic>();
            var accounts = GetList(o => bx.Select(t => t.xsid).Contains(o.id));
            foreach(var o in accounts)
            {
                list.Add(new
                {
                    o.id,
                    //o.xsbj,
                    o.xsName,
                    o.phone,
                    bjs=dict[o.id],
                    o.disabled,
                    o.lastLoginedTime
                });
            }
            return list;
        }


    }

}
