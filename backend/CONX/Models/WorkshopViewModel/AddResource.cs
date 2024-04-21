using System.ComponentModel.DataAnnotations.Schema;

namespace CONX.Models.WorkshopViewModel
{
    public class AddResource
    {
       
        public string VideoTitle { get; set; }
        public string VideoDescription { get; set; }
        public IFormFile Video { get; set; }
        public string UploaderId { get; set; }
        public int WorkshopId { get; set; }
    }
}
