using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Backend.Data.Models;

namespace Backend.Data
{
    public class DetectionObjectConfiguration : IEntityTypeConfiguration<DetectionObject>
    {
        public void Configure(EntityTypeBuilder<DetectionObject> builder)
        {
            throw new NotImplementedException();
        }
    }
}
