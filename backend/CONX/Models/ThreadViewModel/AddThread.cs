using System.ComponentModel.DataAnnotations;

namespace CONX.Models.ForumPostingsViewModel
{
    public class AddThread
    {
        [Required(ErrorMessage = "User Id is required")]
        public string UserId { get; set; }

        [Required(ErrorMessage = " Forum Id is required")]
        public int ForumId { get; set; }

        [Required(ErrorMessage = " Title Id is required")]
        public string Title { get; set; }

        [Required(ErrorMessage = " Content Id is required")]
        public string Content { get; set; }

        public DateTime Created { get; set; }

    }
}
