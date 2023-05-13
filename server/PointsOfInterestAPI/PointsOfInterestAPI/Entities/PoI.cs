using Backend.Data.Models;

namespace PointsOfInterestAPI.Entities
{
    public class PoI
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public List<Que> QueList { get; set; } 
        public int VirtualQue { get; set; }
    }
}