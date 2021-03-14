using CM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CM.Services
{
    public class ArticleService : Service<cm_article>
    {
        public List<dynamic> GetArticles()
        {
            List<dynamic> list = new List<dynamic>();
            var articles = GetList();
            Service<cm_column> colService = new Service<cm_column>();
            var columns = colService.GetList();
            foreach(var a in articles)
            {
                list.Add(new
                {
                    a.id,
                    a.title,
                    a.columnId,
                    column = columns.FirstOrDefault(o => o.id == a.columnId).name,
                    a.state,
                    a.editor,
                    a.creator,
                    a.checker
                });
            }
            return list;
        }
    }

  }
