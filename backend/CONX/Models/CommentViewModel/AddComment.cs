using System.ComponentModel.DataAnnotations;

namespace CONX.Models.CommentViewModel
{
    public class AddComment
    {
        public string UserId { get; set; }
        [Required]
        public string Content { get; set; }
        public int ForumThreadId { get; set; }
    }
}
