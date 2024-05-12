namespace CONX.Models
{
    public class Training
    {
        public int Id { get; set; }
        public string TrainingName { get; set; }
        public string TrainingDescription { get; set; }
        public string Venue { get; set; }
        public DateTime DateStarted { get; set; }
        public DateTime DateEnd { get; set; }

    }
}
