namespace CONX.Models.WorkshopViewModel
{
    public class UpdateWorkshop
    {
        public int WorkshopId { get; set; }
        public string WorkshopTitle { get; set; }
        public string CreatorId { get; set; }
        public string Tags { get; set; } //separated by comma
        public string Description { get; set; }
        public int CategoryId { get; set; }
    }
}
