using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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
        public async Task<ActionResult<User>> Login(LoginRequest request)
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
                new(JwtRegisteredClaimNames.Jti, )
            }
        }
    }
}
