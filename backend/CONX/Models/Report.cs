namespace CONX.Models
{
    public class Report
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string ImageUrl {  get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
