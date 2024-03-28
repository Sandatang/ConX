namespace CONX.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string Content { get; set; }
        public DateTime Created {  get; set; }
    }
}
