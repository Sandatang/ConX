using System.ComponentModel.DataAnnotations.Schema;

namespace CONX.Models
{
    public class Thread
    {
        public int Id { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public User User { get; set; }
        public string PostTitle { get; set; }
        public string PostBody { get; set; }
        public bool isClosed { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateClosed { get; set; }

    }
}
