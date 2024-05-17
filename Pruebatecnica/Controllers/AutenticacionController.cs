using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pruebatecnica.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Pruebatecnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacionController : ControllerBase
    {
        //obtener la secret key
        private readonly string secretkey;
        public AutenticacionController(IConfiguration config)
        {
            secretkey = config.GetSection("settings").GetSection("secretkey").ToString();
        }
        [HttpPost]
        [Route("Validar")]
        public IActionResult Validar([FromBody] Usuario request)
        {
        if(request.correo == "juan@gmail.com" && request.clave == "root") {
            var keyBytes = Encoding.ASCII.GetBytes(secretkey);
                var claims = new ClaimsIdentity();
                // le pasamos el correo para agergarlo y darle permisos
                claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, request.correo));
                //creamos el token

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    //expiracion del token
                    //expira en 5 mins
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature)


                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);
                string tokenCreated = tokenHandler.WriteToken(tokenConfig);
                return StatusCode(StatusCodes.Status200OK, new {token = tokenCreated});
            }
            else
            {
                //si no nada
                return StatusCode(StatusCodes.Status401Unauthorized, new { token = "" });

            }
        }
    }
}
