namespace CONX.Models
{
    public class JuncThreadComment
    {
        public int Id { get; set; }
        public int CommentId { get; set; }
        public Comment Comment { get; set; }
        public int ThreadId { get; set; }
        public Thread Thread { get; set; }
    }
}
