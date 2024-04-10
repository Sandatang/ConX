using System.ComponentModel.DataAnnotations;

namespace CONX.Models.JobViewModel
{
    public class UpdateJob
    {
        public int JobId { get; set; }
        public string JobTitle { get; set; }
        public string JobWage { get; set; }
        public string Location { get; set; }
        public string ExperienceReq { get; set; }

        public string JobDescription { get; set; }

        [Required(ErrorMessage = "Contact Person / Company is required")]
        public string ContactPerson { get; set; }

        public string ContactNumber { get; set; }

    }
}
