using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Backend.Data.Models;

namespace Backend.Data
{
    public class InterestPointConfiguration : IEntityTypeConfiguration<InterestPoint>
    {
        public void Configure(EntityTypeBuilder<InterestPoint> builder)
        {
            throw new NotImplementedException();
        }
    }
}
