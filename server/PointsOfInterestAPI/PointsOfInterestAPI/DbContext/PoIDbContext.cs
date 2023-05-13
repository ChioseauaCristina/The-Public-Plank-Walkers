using Microsoft.EntityFrameworkCore;
using Backend.Data.Models;
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
        public DbSet<User> Users { get; set; }
        public DbSet<PoI> PoIs { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Que> Ques { get; set; }
        public DbSet<DetectionObject> DetectionObjects { get; set; }
        public DbSet<Claims> Claims { get; set; }

    }
}
