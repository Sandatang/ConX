using System.ComponentModel.DataAnnotations;

namespace CONX.Models.Authentication.Signup
{
    public class VerificationForUser
    {
        [Required]
        public string? IdNumber { get; set; }
    }
}
