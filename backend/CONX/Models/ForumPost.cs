namespace CONX.Models
{
    public class ForumPost
    {
        public int Id { get; set; }
        public int ForumId { get; set; }
        public Forum Forum { get; set; }
        public int PostingsId { get; set; }
        public Postings Post {  get; set; }

    }
}
