using System.ComponentModel.DataAnnotations.Schema;

namespace CONX.Models
{
    public class Thread
    {
        public int Id { get; set; }

        [ForeignKey("UserId")]
        public string PosterId { get; set; }
        public User Poster { get; set; }
        public string PostTitle { get; set; }
        public string PostBody { get; set; }
        public DateTime DateCreated { get; set; }

    }
}
