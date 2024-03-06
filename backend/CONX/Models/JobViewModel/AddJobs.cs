using System.ComponentModel.DataAnnotations;

namespace CONX.Models.JobViewModel
{
    public class AddJobs
    {
        [Required(ErrorMessage = "User Id is required")]
        public string UserId { get; set; }

        [Required(ErrorMessage = "Job Title is required")]
        public string JobTitle { get; set; }

        public string JobDescription { get; set; }

        [Required(ErrorMessage = "Contact Person / Company is required")]
        public string ContactPerson { get; set; }

        public string ContactNumber { get; set; }

    }
}
