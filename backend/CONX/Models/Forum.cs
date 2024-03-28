using System.ComponentModel.DataAnnotations.Schema;

namespace CONX.Models
{
    public class Forum
    {
        public int Id { get; set; }
        [ForeignKey("UserId")]
        public string CreatorId{ get; set; }
        public User Creator { get; set; }
        public DateTime DateCreated { get; set; }
        public string Title { get; set; }
        public string Tags { get; set; }
        public string Description { get; set; }
        public int FollowCount { get; set; }
    }
}
