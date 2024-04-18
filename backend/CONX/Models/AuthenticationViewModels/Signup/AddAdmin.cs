using System.ComponentModel.DataAnnotations;

namespace CONX.Models.AuthenticationViewModels.Signup
{
    public class AddAdmin
    {
        [Required(ErrorMessage = "Username is required")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Firstname is required")]
        public string? Firstname { get; set; }

        public string? Middlename { get; set; }

        [Required(ErrorMessage = "Middlename is required")]
        public string? Lastname { get; set; }

        [Required(ErrorMessage = " Birthday is required")]
        public DateTime Birthdate { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }
    }
}
