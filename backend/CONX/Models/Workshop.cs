using System.ComponentModel.DataAnnotations.Schema;

namespace CONX.Models
{
    public class Workshop
    {
        public int  WorkshopId { get; set; }
        public string WorkshopTitle { get; set; }
        [ForeignKey("UserId")]
        public string CreatorId { get; set; }
        public User Creator { get; set; }
        public string Tags {  get; set; } //separated by comma
        public string Description { get; set; }
        public int LikesCount { get; set; } 
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
