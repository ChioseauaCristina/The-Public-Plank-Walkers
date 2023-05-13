using PointsOfInterestAPI.Entities;

namespace Backend.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public List<PoI>? PointsList { get; set; }
    }
}
