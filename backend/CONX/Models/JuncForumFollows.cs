namespace CONX.Models
{
    public class JuncForumFollows
    {
        public int Id { get; set; }
        public int ForumId { get; set; }
        public Forum Forum { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
