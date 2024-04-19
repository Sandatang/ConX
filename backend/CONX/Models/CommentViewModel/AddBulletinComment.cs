using System.ComponentModel.DataAnnotations;

namespace CONX.Models.CommentViewModel
{
    public class AddBulletinComment
    {
        public string UserId { get; set; }
        [Required]
        public string Content { get; set; }
        public int BulletinPostId { get; set; }
    }
}
