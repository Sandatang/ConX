namespace CONX.Models
{
    public class Jobs
    {
        public  int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public bool isActive { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNumber { get; set; }
        
        public DateTime Created { get; set; }
    }
}
