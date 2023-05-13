using Backend.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace PointsOfInterestAPI.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly PoIDbContext _poIDbContext;

        public UsersController(PoIDbContext poIDbContext)
        {
            _poIDbContext = poIDbContext;
        }

        [HttpPost]
        [Route("/login")]
        public async Task<ActionResult<User>> Login(LoginRequest request)
        {
            var user = await _poIDbContext.Users.FindAsync(request.Username);
            if (user == null)
            {
                return Unauthorized("Username is wrong");
            }

            if (!request.Password.Equals(user.Password)) {
                return Unauthorized("Incorrect password");
            }

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<User>> Register(RegisterRequest request)
        {
            Random rand = new Random();
            var user = new User
            {
                Id = rand.Next(),
                Username = request.Username,
                Password = request.Password,
                Role = request.Role
            };

            var result = await _poIDbContext.Users.AddAsync(user);

            await _poIDbContext.SaveChangesAsync();

            return Ok(result.Entity);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return Ok(await _poIDbContext.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get([FromRoute] string id)
        {
            var user = await _poIDbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete([FromRoute] string id)
        {
            var user = await _poIDbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var result = _poIDbContext.Users.Remove(user);
            await _poIDbContext.SaveChangesAsync();

            return Ok(result.Entity);
        }
    }
}
