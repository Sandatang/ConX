using System.ComponentModel.DataAnnotations;

namespace CONX.Models.AuthenticationViewModels
{
    public class ChangePassword
    {
        [Required]
        public string UserId { get; set; }

        [Required] 
        public string OldPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
        [Required]
        [Compare("NewPassword", ErrorMessage = "Password and Confirmation Password must match.")]
        public string ConfirNewPassword { get; set; }
    }
}
