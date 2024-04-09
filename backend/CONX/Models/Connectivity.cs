namespace CONX.Models
{
    public class Connectivity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Hotline { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
