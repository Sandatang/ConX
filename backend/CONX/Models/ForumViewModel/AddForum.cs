using System.ComponentModel.DataAnnotations;

namespace CONX.Models.ForumViewModel
{
    public class AddForum
    {
        [Required(ErrorMessage = " Id is required")]
        public string UserId { get; set; }

        [Required(ErrorMessage = " Title is required")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Include atleast 1 keyword")]
        public string Keywords {  get; set; }

        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }
    }
}
