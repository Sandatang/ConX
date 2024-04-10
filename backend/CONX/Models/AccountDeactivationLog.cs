namespace CONX.Models
{
    public class AccountDeactivationLog
    {
        public int Id { get; set; }
        public string DeactivatedAccountId {  get; set; }
        public string DeactivatedAccountName { get; set; }

        public string DeactReason { get; set; }
        public string DeactivatorId { get; set; }
        public string DeactivatorName { get; set; }
    }
}
