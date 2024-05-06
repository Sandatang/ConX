using System.ComponentModel.DataAnnotations;

namespace CONX.Models.AuthenticationViewModels
{
    public class UpdateUser
    {
        [Required]
        public string UserId { get; set; }
        public string UserName {  get; set; }
        public string Firstname { get; set; }
        public string Middlename { get; set; }
        public string? Income { get; set; }
        public string CivilStatus { get; set; }
        public string Lastname { get; set; }
        public string Role {  get; set; }
        public string Email { get; set; }
        public DateTime Birthdate { get; set; }
    }
}
