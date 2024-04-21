namespace CONX.Models.WorkshopViewModel
{
    public class CreateWorkshop
    {
        public string WorkshopTitle { get; set; }
        public string CreatorId { get; set; }
        public string Tags { get; set; } //separated by comma
        public string Description { get; set; }
        public string Category { get; set; }
    }
}
