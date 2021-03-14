using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CM.Api.Utility
{
    public class ResponseJson
    {
        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("msg")]
        public string Msg { get; set; }

        [JsonProperty("count")]
        public long Count { get; set; }

        ///<summary>
        ///返回的data结构，可能是单对象，可能是数组，也可能是复杂对象
        ///由接口文档告知
        /// </summary>
        [JsonProperty("data")]
        public object Data { get; set; }

        #region LodaForm方法
        ///<summary>
        ///将对象封装为响应json格式
        /// </summary>
        /// <param name="o"></param>
        /// <returns></returns>
        public static ResponseJson LoadForm(object o)
        {
            return new ResponseJson(o);
        }
        public static ResponseJson LoadForm(object o,string code,string message)
        {
            return new ResponseJson(o, code, message);
        }

        ///<summary>
        ///将对象封装为响应json格式
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public static ResponseJson LoadForm(IEnumerable list)
        {
            return new ResponseJson(list);
        }
        public static ResponseJson LoadForm(IEnumerable list,string code,string message)
        {
            return new ResponseJson(list,code, message);
        }

        ///<summary>
        ///将列表和扩展对象封装成复杂响应json格式
        ///列表嵌套在data.data对象中
        /// </summary>
        /// <param name="list"></param>
        /// <param name="objName">扩展对象名称</param>
        /// <param name="obj">扩展对象集合</param>
        /// <returns></returns>
        public static ResponseJson LoadForm(IEnumerable list, string objName, JObject obj)
        {
            JObject jObject = new JObject();
            jObject.Add("data", new JObject(list));
            jObject.Add(objName,obj);
            return new ResponseJson(jObject);
        }
        public static ResponseJson LoadForm(IEnumerable list, string objName, JObject obj,string  code, string message)
        {
            JObject jObject = new JObject();
            jObject.Add("data", new JObject(list));
            jObject.Add(objName, obj);
            return new ResponseJson(jObject,code, message);
        }
        public static ResponseJson LoadForm(Dictionary<string,object>dict)
        {
            JObject jObject = new JObject();
            foreach(string key in dict.Keys)
            {
                jObject.Add(key, JObject.FromObject(dict[key]));
            }
            return new ResponseJson(jObject);
        }
        public static ResponseJson LoadForm(Dictionary<string, object> dict, string code, string message)
        {
            JObject jObject = new JObject();
            foreach (string key in dict.Keys)
            {
                jObject.Add(key, JObject.FromObject(dict[key]));
            }
            return new ResponseJson(jObject,code,message);
        }
        #endregion

        #region 构造函数
        public ResponseJson()
        {
            this.Code = "200";
            this.Msg = "ok";
            this.Count = 0;
        }
        public ResponseJson(object obj) : this()
        {
            if (obj != null)
            {
                this.Count = 1;
                Data = JObject.FromObject(obj);
            }
        }
        public ResponseJson(object obj,string code,string message) : this()
        {
            if (obj != null)
            {
                this.Count = 1;
                Data = JObject.FromObject(obj);
            }
            Code = code;
            Msg = message;
        }
        public ResponseJson(IEnumerable list) : this()
        {
            JArray jArray = new JArray();
            int iCount = 0;
            if (list != null)
            {
                foreach(object o in list)
                {
                    dynamic obj = JObject.FromObject(o);
                    jArray.Add(obj);
                    iCount++;
                }
            }
            if (iCount > 0)
            {
                this.Count = iCount;
                this.Data = jArray;
            }
        }
        public ResponseJson(IEnumerable list, string code, string message) : this()
        {
            JArray jArray = new JArray();
            int iCount = 0;
            if (list != null)
            {
                foreach (object o in list)
                {
                    dynamic obj = JObject.FromObject(o);
                    jArray.Add(obj);
                    iCount++;
                }
            }
            if (iCount > 0)
            {
                this.Count = iCount;
                this.Data = jArray;
            }
            this.Code = code;
            this.Msg = message; ;
        }
        #endregion

    }
}