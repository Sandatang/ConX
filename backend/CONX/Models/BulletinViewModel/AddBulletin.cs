using System.ComponentModel.DataAnnotations;

namespace CONX.Models.BulletinViewModel
{
    public class AddBulletin
    {
        [Required(ErrorMessage = "User Id is required")]
        public string UserId { get; set; }

        [Required(ErrorMessage = " Title is required")]
        public string Title { get; set; }

        [Required(ErrorMessage = " Content is required")]
        public string Content { get; set; }

        public DateTime Created { get; set; }

        public IFormFile Image { get; set; }
    }
}
