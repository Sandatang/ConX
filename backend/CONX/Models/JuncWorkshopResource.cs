namespace CONX.Models
{
    public class JuncWorkshopResource
    {
        public int Id { get; set; }
        public int WorkShopId { get; set; }
        public Workshop Workshop { get; set; }
        public int ResourceId { get; set; }
        public Resource Resource { get; set; }

        
        
    }
}
