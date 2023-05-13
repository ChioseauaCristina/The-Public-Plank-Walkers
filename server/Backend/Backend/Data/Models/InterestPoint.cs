namespace Backend.Data.Models
{
    public class InterestPoint
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public List<Que> QueList { get; set; }
        public int VirtualQue { get; set; }

    }
}
