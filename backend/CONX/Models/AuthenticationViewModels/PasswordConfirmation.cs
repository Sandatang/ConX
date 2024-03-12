using System.ComponentModel.DataAnnotations;

namespace CONX.Models.AuthenticationViewModels
{
    public class PasswordConfirmation
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public string Password {  get; set; }
    }
}
