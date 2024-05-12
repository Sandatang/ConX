namespace CONX.Models.TrainingViewModels
{
    public class UpdateTraining
    {
        public int TrainingId { get; set; }
        public string TrainingName { get; set; }
        public string TrainingDescription { get; set; }
        public string Venue { get; set; }
        public DateTime DateStarted { get; set; }
        public DateTime DateEnd { get; set; }
    }
}
