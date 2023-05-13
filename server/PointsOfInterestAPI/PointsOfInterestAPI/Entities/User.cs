namespace Backend.Data.Models
{
    public class User : TimestampedModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public List<InterestPoint>? PointsList { get; set; }
    }
}
