using System.ComponentModel.DataAnnotations;

namespace CONX.Models.AuthenticationViewModels
{
    public class DeActivateUser
    {
        [Required]
        public string UserId { get; set; }
        public string DeactivatorId { get; set; }
        public string DeactivationReason { get; set; }
    }
}
