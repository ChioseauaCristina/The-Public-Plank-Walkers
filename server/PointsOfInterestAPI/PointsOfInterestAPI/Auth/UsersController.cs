

using Backend.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace PointsOfInterestAPI.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly PoIDbContext _dbContext;

        public UsersController(PoIDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        [Route("/login")]
        public async Task<ActionResult<User>> Login(LoginRequest request)
        {
            var user = await _dbContext.Users.FindAsync(request.Username);
            if (user is null)
            {
                return Unauthorized("Username not found");
            }

            if (!user.Password.Equals(request.Password))
            {
                return Unauthorized("Incorrect password");
            }

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<User>> Register(RegisterRequest request)
        {
            var fuser = await _dbContext.Users.FindAsync(request.Username);
            if (fuser is not null)
            {
                return BadRequest("Username already in use");
            }

            Random rand = new Random();
            var user = new User
            {
                Id = rand.Next(),
                Username = request.Username,
                Password = request.Password,
                Role = request.Role
            };

            var result = await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();

            return Ok(user);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return Ok(await _dbContext.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get([FromRoute] string id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user is null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete([FromRoute] string id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user is null)
            {
                return NotFound("User not found");
            }

            var result = _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();

            return Ok(user);
        } 
    }
}
