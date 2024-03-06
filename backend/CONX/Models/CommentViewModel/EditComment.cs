using System.ComponentModel.DataAnnotations;

namespace CONX.Models.CommentViewModel
{
    public class EditComment
    {
        public int CommentId { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
