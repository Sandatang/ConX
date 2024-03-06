using System.ComponentModel.DataAnnotations;

namespace CONX.Models.ForumViewModel
{
    public class AddForum
    {
        [Required(ErrorMessage = " Id is required")]
        public string UserId { get; set; }

        [Required(ErrorMessage = " Title is required")]
        public string Title { get; set; }
    }
}
