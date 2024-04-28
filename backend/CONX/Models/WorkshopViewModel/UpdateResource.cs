namespace CONX.Models.WorkshopViewModel
{
    public class UpdateResource
    {
        public int ResourceId { get; set; }
        public string VideoTitle { get; set; }
        public string VideoDescription { get; set; }
        public IFormFile? Video { get; set; }
        public string UploaderId { get; set; }
    }
}
