namespace CONX.Models.ReportViewModel
{
    public class AddReport
    {
        public string UserId { get; set; }
        public string Content {  get; set; }
        public IFormFile Image { get; set; }
    }
}
