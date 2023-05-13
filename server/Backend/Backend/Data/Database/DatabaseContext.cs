using Backend.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Xml.Linq;

namespace Backend.Data.Database
{
    public class DatabaseContext : DbContext
    {

        public virtual DbSet<Claims> CLaims { get; set; }
        public virtual DbSet<Destination> Destinations { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<DetectionObject> DetectionObjects { get; set; }
        public virtual DbSet<Que> Ques { get; set; }
        public virtual DbSet<InterestPoint> InterestPoints { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new ClaimsConfiguration());
            modelBuilder.ApplyConfiguration(new DestinationConfiguration());
            modelBuilder.ApplyConfiguration(new InterestPointConfiguration());
            modelBuilder.ApplyConfiguration(new QueConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new DetectionObjectConfiguration());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Database=company;Username=postgres;Password=postgres");
    }
}
