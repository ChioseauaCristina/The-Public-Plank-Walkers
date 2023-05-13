namespace Backend.Data.Models
{
    public class Que
    {
        public int Id { get; set; }
        public string Source { get; set; }
        public DetectionObject DetectionObject { get; set; }
        public int Real { get; set; }
        public int Digital { get; set; }
        public string Type { get; set; }
        public int Quantity { get; set; }
        public DateTime RunOut { get; set; }
        public string Algorithm { get; set; }
    }
}
