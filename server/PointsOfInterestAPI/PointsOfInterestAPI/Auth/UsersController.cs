using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace PointsOfInterestAPI.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration _configuration;

        public UsersController(UserManager<User> userManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
        {
            var user = await userManager.FindByNameAsync(request.Username);
            if (user == null)
            {
                return Unauthorized("Username not found");
            }

            var wrongPass = !await userManager.CheckPasswordAsync(user, request.Password);
            if (wrongPass)
            {
                return Unauthorized("Incorrect Password");
            }

            var userRoles = await userManager.GetRolesAsync(user);

            if (userRoles == null)
            {
                await userManager.AddToRoleAsync(user, Utils.Roles.Client);
            }

            var authClaims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new("id", user.Id)
            };

            authClaims.AddRange(userRoles.Select(role => new Claim("role", role)));

            var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddDays(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey,SecurityAlgorithms.HmacSha256)
            );

            return Ok(new LoginResponse { 
                
            });
    }
}
