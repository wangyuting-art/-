using CM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CM.Repository;

namespace CM.Services
{
    public class UserService : Service<cm_user>
    {
        Service<cm_user_role> urService = new Service<cm_user_role>();
        Service<cm_role_menu> rmService = new Service<cm_role_menu>();
        Service<cm_menu> menuService = new Service<cm_menu>();
        Service<cm_role_column> rcService = new Service<cm_role_column>();
        Service<cm_column> columnService = new Service<cm_column>();


        ///<summary>
        ///获取用户菜单项
        /// </summary>
        ///<param name="id">用户id</param>
        ///<returns></returns>
        public List<cm_menu> GetMenus(long id)
        {
            Service<cm_user_role> urService = new Service<cm_user_role>();
            Service<cm_role_menu> rmService = new Service<cm_role_menu>();
            Service<cm_menu> menuService = new Service<cm_menu>();

            //取用户角色id
            List<long> roleIds = urService.GetList(o => o.userId == id).Select(o => o.userId).ToList();
            //取用户角色ids，合并菜单，去重
            List<long> menuIds = rmService.GetList().Where(o => roleIds.Contains(o.roleId)).Select(o => o.menuId).Distinct().ToList();
            //返回菜单信息
            List<cm_menu> list = menuService.GetList().Where(o => menuIds.Contains(o.id)).ToList();

            return list;
        }

        public List<cm_menu> GetUserMenus(long id)
        {
            //取用户角色id
            List<long> roleIds = urService.GetList(o => o.userId == id).Select(o => o.roleId).ToList();
            //取角色菜单ids，合并菜单，去重
            List<long> menuIds = rmService.GetList().Where(o => roleIds.Contains(o.roleId))
                .Select(o => o.menuId).Distinct().ToList();

            //返回菜单信息
            List<cm_menu> list = menuService.GetList().Where(o => menuIds.Contains(o.id)).ToList();

            //补充父级菜单：每循环一次补充一次漏掉的parentId，直到所有parentId在id中出现
            List<long> pIds = null;
            List<cm_menu> exceptList= menuService.GetList(o=>!menuIds.Contains(o.id)).ToList();
            while (true)
            {
                pIds = list.Select(o => o.parentId).Distinct().Where(o => !menuIds.Contains(o)).ToList();
                if (pIds.Count > 0)
                {
                    list.AddRange(exceptList.Where(o => pIds.Contains(o.id)));
                    menuIds.AddRange(pIds);
                }
                else
                    break;
            }
            return list.OrderBy(o => o.parentId).OrderBy(o => o.orderNo).OrderBy(o => o.id).ToList();
        }
        ///<summary>
        ///获取菜单权限
        /// </summary>
        ///<param name="id">用户id，当值为0，则表示所有用户</param>
        ///<param name="id"></param>
        ///<returns></returns>
        public List<dynamic> GetMenuRights(long userId,long roleId)
        {
            List<cm_menu> list = null;
            if (userId == 0)
                list = menuService.GetList().OrderBy(o => o.parentId).OrderBy(o => o.orderNo).OrderBy(o => o.id).ToList();
            else
                list = GetUserMenus(userId);
            List<long> ids = rmService.GetList(o => o.roleId == roleId).Select(o => o.menuId).Distinct().ToList();
            List<dynamic> rList = new List<dynamic>();
            foreach (var o in list)
            {
                bool selected = false;
                if (ids.Contains(o.id)) selected = true;
                rList.Add(new
                {
                    o.id,
                    o.name,
                    o.url,
                    o.icon,
                    o.parentId,
                    o.orderNo,
                    selected
                 });
            }
            return rList;
        }
        public List<dynamic> GetAccouts(long roleId)
        {
            Service<cm_user_role> urService = new Service<cm_user_role>();
            //按角色取用户，0为所有
            List<cm_user_role> ru = roleId <= 0 ? urService.GetList() : urService.GetList(o => o.roleId == roleId);
            //取角色对应的userids
            List<long> rUserIds = ru.Select(o => o.userId).Distinct().ToList();

            //根据userids，取cm_user_role集合，用于生成userid-userRoleIds的键值对集合
            List<cm_user_role> ur = urService.GetList(o => rUserIds.Contains(o.userId));
            //拼 用户的多角色ids字符串
            Dictionary<long, string> dict = new Dictionary<long, string>();
            foreach(var o in ur)
            {
                if (dict.ContainsKey(o.userId))
                {
                    dict[o.userId] += "," + o.roleId.ToString();
                }
                else
                {
                    dict.Add(o.userId, o.roleId.ToString());
                }
            }
            //拼账号信息
            List<dynamic> list = new List<dynamic>();
            var accounts = GetList(o => ru.Select(t => t.userId).Contains(o.id));
            foreach(var o in accounts)
            {
                list.Add(new
                {
                    o.id,
                    o.userAcc,
                    o.userName,
                    o.phone,
                    roles=dict[o.id],
                    o.disabled,
                    o.lastLoginedTime
                });
            }
            return list;
        }

        //public List<dynamic> GettAccouts(long bjid)
        //{
        //    Service<jw_xs_bj> xbService = new Service<jw_xs_bj>();
        //    //按角色取用户，0为所有
        //    List<jw_xs_bj> bx = bjid <= 0 ? xbService.GetList() : xbService.GetList(o => o.bjid == bjid);
        //    //取角色对应的userids
        //    List<long> bXsIds = bx.Select(o => o.bjid).Distinct().ToList();

        //    //根据userids，取cm_user_role集合，用于生成userid-userRoleIds的键值对集合
        //    List<jw_xs_bj> xb = xbService.GetList(o => bXsIds.Contains(o.id));
        //    //拼 用户的多角色ids字符串
        //    Dictionary<long, string> dict = new Dictionary<long, string>();
        //    foreach (var o in xb)
        //    {
        //        if (dict.ContainsKey(o.bjid))
        //        {
        //            dict[o.id] += "," + o.bjid.ToString();
        //        }
        //        else
        //        {
        //            dict.Add(o.bjid, o.bjid.ToString());
        //        }
        //    }
        //    //拼账号信息
        //    List<dynamic> list = new List<dynamic>();
        //    var accounts = GetList(o => bx.Select(t => t.bjid).Contains(o.id));
        //    foreach (var o in accounts)
        //    {
        //        list.Add(new
        //        {
        //            o.id,
        //            o.xsbj,
        //            o.xsName,
        //            o.phone,
        //            bjs = dict[o.id],
        //            o.disabled,
        //            o.lastLoginedTime
        //        });
        //    }
        //    return list;
        //}
    }

}
