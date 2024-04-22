using Microsoft.AspNetCore.Identity;

namespace CONX.Models
{
    public class User : IdentityUser
    {
        public string? EmployeeNumber { get; set; }

        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Middlename { get; set; }
        public string Income { get; set; }
        public string CivilStatus { get; set; }
        public DateTime Birthdate { get; set; }
        public bool DeActivate { get; set; }
        public bool IsDeleted { get; set; } = false;
    }

    
}
