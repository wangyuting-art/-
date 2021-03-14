using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CM.Models;
using CM.Services;
using CM.Api.Utility;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace CM.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class TokenController : ControllerBase
    {
        Service<cm_user> service = new Service<cm_user>();
        // GET: api/Token
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Token/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Token
        [HttpPost]
        public ActionResult<ResponseJson> Login([FromBody]Dtos.UserLogin model)
        {
            ResponseJson json = new ResponseJson();
            var userModel = service.GetModel(o => o.userAcc == model.UserAcc && o.userPwd == model.UserPwd);
            if (userModel == null)
            {
                return Unauthorized();
            }
            else if (userModel.disabled == 1)
            {
                json.Code = "401";
                json.Msg = "用户被禁用，请与管理员联系";
            }
            else if (userModel.disabled == 0)
            {
                userModel.lastLoginedTime = DateTime.Now;
                service.Update(userModel);
                //创建claim
                var authClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub,model.UserAcc),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                };
                //前面密钥 可以放到json文件中
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SecureKeySecureKeySecureKeySecureKeySecureKeySecureKey"));
                var token = new JwtSecurityToken(
                    issuer: "http://www.cnblogs.com/chengtian",
                    audience: "http://www.cnblogs.com/chengtian",
                    expires: DateTime.Now.AddHours(1),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );
                json.Code = "200";
                //返回token和过期时间
                json.Data = new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    username = userModel.userName,
                    userid = userModel.id
                };
            }
            else
            {
                return Unauthorized();
            }
            return json;
        }
        
        // PUT: api/Token/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
