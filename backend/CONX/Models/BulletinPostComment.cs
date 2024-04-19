namespace CONX.Models
{
    public class BulletinPostComment
    {
        public int Id { get; set; }
        public int CommentId { get; set; }
        public Comment Comment { get; set; }
        public int BulletinPostId { get; set; }
        public BulletinPost BulletinPost { get; set; }
    }
}
