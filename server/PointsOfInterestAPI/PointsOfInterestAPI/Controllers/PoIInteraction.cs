using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PointsOfInterestAPI.Entities;

namespace PointsOfInterestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PoIInteraction : ControllerBase
    {
        private PoIDbContext dbContext;
        public PoIInteraction(PoIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        [EnableCors("AllowOrigin")]
        public async Task<IActionResult> UpdateInteraction(int id)
        {
            var _poi = await dbContext.PoIs.FindAsync(id);
            if (_poi != null)
            {
                _poi.VirtualQue += 1;
                //MapEverything else
                //
                await dbContext.SaveChangesAsync();
                return Ok(_poi);
            }
            return NotFound();
        }

    }
}
