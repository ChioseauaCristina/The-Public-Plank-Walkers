using Backend.Data.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PointsOfInterestAPI.Entities;

namespace PointsOfInterestAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class QueController : ControllerBase
    {
        private readonly PoIDbContext dbContext;
        public QueController(PoIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        [EnableCors("AllowOrigin")]
        public async Task<IActionResult> GetQues()
        {
            return Ok(await dbContext.Ques.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddQUE(Que que)
        {
            Random rnd = new Random();
            que.Id = rnd.Next();
            await dbContext.Ques.AddAsync(que);
            await dbContext.SaveChangesAsync();
            return Ok(que);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateQUE(int id, Que que)
        {
            var _que = await dbContext.Ques.FindAsync(id);
            if (_que != null)
            {
                _que.DetectionObject = que.DetectionObject;
                //MapEverything else
                await dbContext.SaveChangesAsync();
                return Ok(_que);
            }
            return NotFound();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var _que = await dbContext.Ques.FindAsync(id);
            if (_que != null)
            {
                dbContext.Remove(_que);
                dbContext.SaveChanges();
                return Ok(_que);
            }
            return NotFound();
        }
    }
}
