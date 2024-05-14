namespace CONX.Models
{
    public class TrainingRegistration
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public int TrainingId { get; set; }
        public Training Training { get; set; }
        public string Email { get; set; }
        public string ContactNo { get; set; }
        public bool isCompleter { get; set; } = false;
    }
}
