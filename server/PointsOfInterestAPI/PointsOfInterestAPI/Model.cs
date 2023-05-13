using Microsoft.EntityFrameworkCore;
using PointsOfInterestAPI.Entities;

namespace PointsOfInterestAPI
{
    public class PoIDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public PoIDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase"));
        }
        public DbSet<PoI> PoIs { get; set; }

    }
}
