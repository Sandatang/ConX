using System.ComponentModel.DataAnnotations;

namespace CONX.Models.Authentication.Login
{
    public class LoginUser
    {
        [Required(ErrorMessage = "Please enter your username")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Please enter your password")]
        public string? Password { get; set; }
    }
}
