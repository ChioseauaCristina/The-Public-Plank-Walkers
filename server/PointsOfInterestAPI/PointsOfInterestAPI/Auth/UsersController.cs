

using Microsoft.AspNetCore.Mvc;

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
        
        
    }
}
