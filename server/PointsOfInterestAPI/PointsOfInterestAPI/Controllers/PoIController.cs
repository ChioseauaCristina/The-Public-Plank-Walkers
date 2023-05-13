using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PointsOfInterestAPI.Entities;

namespace PointsOfInterestAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class PoIController : ControllerBase
    {
        private PoIDbContext dbContext;
        public PoIController(PoIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetPois()
        {
            return Ok(await dbContext.PoIs.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddPOI(PoI poi)
        {
            
            await dbContext.PoIs.AddAsync(poi);
            await dbContext.SaveChangesAsync();
            return Ok(poi);
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePOI(int id, PoI poi)
        {
            var _poi = await dbContext.PoIs.FindAsync(id);
            if (_poi != null)
            {
                _poi.QueList = poi.QueList;
                _poi.VirtualQue = poi.VirtualQue;
               //MapEverything else
                await dbContext.SaveChangesAsync();
                return Ok(_poi);
            }
            return NotFound();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var _poi = await dbContext.PoIs.FindAsync(id);
            if (_poi != null)
            {
                dbContext.Remove(_poi);
                dbContext.SaveChanges();
                return Ok(_poi);
            }
            return NotFound();
        }
    }
}
