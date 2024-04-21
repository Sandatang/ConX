namespace CONX.Models
{
    public class JuncResourceWatched
    {
        public int Id { get; set; }
        public string WatcherId { get; set; }
        public User Watcher { get; set; }
        public int ResourceId { get; set; }
        public Resource Resource { get; set; }
        public int WorkshopId { get; set; }
        public Workshop Workshop { get; set; }
    }
}
