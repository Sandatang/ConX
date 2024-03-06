using System.ComponentModel.DataAnnotations;

namespace CONX.Models.ThreadViewModel
{
    public class CloseThread
    {
        [Required(ErrorMessage = "Id is required for closing the thread")]
        public int ThreadId { get; set; }
        [Required( ErrorMessage = "Status is required for closing the thread")]
        public bool Status { get; set; }
    }
}
