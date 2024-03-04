namespace CONX.Models
{
    public class JuncForumThread
    {
        public int Id { get; set; }
        public int ForumId { get; set; }
        public Forum Forum { get; set; }
        public int ThreadId { get; set; }
        public Thread Thread {  get; set; }

    }
}
