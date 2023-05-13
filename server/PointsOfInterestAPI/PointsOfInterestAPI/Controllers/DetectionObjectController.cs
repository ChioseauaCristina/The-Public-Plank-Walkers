using Backend.Data.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace PointsOfInterestAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class DetectionObjectController : ControllerBase
    {
        private readonly PoIDbContext dbContext;
        public DetectionObjectController(PoIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        [EnableCors("AllowOrigin")]
        public async Task<IActionResult> GetDetectionObjects()
        {
            return Ok(await dbContext.DetectionObjects.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddDETECTIONOBJECT(DetectionObject detectionObject)
        {
            Random rnd = new Random();
            detectionObject.Id = rnd.Next();
            await dbContext.DetectionObjects.AddAsync(detectionObject);
            await dbContext.SaveChangesAsync();
            return Ok(detectionObject);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateDETECTIONOBJECT(int id, DetectionObject detectionObject)
        {
            var _detectionObject = await dbContext.DetectionObjects.FindAsync(id);
            if (_detectionObject != null)
            {
                _detectionObject.ImagePath = detectionObject.ImagePath;
                //MapEverything else
                await dbContext.SaveChangesAsync();
                return Ok(_detectionObject);
            }
            return NotFound();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var _detectionObject = await dbContext.DetectionObjects.FindAsync(id);
            if (_detectionObject != null)
            {
                dbContext.Remove(_detectionObject);
                dbContext.SaveChanges();
                return Ok(_detectionObject);
            }
            return NotFound();
        }
    }
}
