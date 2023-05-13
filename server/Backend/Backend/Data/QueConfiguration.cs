using Backend.Data.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class QueConfiguration : IEntityTypeConfiguration<Que>
    {
        public void Configure(EntityTypeBuilder<Que> builder)
        {
            throw new NotImplementedException();
        }
    }
}
