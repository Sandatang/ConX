using System.ComponentModel.DataAnnotations.Schema;

namespace CONX.Models
{
    public class Resource
    {
        public int Id { get; set; }
        public string VideoTitle { get; set; }
        public string VideoDescription { get; set; }
        public string VideoUrl { get; set; }

        [ForeignKey("UserId")]
        public string UploaderId { get; set; }
        public User Uploader { get; set; }
    }
}
