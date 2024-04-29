namespace CONX.Models
{
    public class LoginLog
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public DateTime LoginTime { get; set; }
        public int LoginMonth { get; set; }
        public int LoginYear { get; set; }
    }
}
