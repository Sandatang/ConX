using System.ComponentModel.DataAnnotations;

namespace CONX.Models.Authentication.Signup
{
    public class RegisterUser
    {

        [Required(ErrorMessage = "Username is required")]
        
        public string? Username { get; set; }

        [Required(ErrorMessage = "Firstname is required")]
        public  string? Firstname{ get; set; }
        
        public string? Middlename { get; set; }

        [Required(ErrorMessage = "Lastname is required")]
        public string? Lastname { get; set; } 

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = " Birthday is required")]
        public DateTime Birthdate { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "ConfirmPassword is required")]
        [Compare("Password", ErrorMessage = "Password and Confirmation Password must match.")]
        public string? ConfirmPassword { get; set; }
    }
}
