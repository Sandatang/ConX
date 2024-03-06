using System.ComponentModel.DataAnnotations;

namespace CONX.Models.ForumViewModel
{
    public class UpdateForum
    {
        [Required( ErrorMessage = "Id is required")]
        public int ForumId { get; set; }
        public string Title { get; set; }
    }
}
