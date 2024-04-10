using System.ComponentModel.DataAnnotations;

namespace CONX.Models.ThreadViewModel
{
    public class UpdateThread
    {
        [Required(ErrorMessage = "User Id is required")]
        public int ThreadId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public IFormFile Image { get; set; }

    }
}
