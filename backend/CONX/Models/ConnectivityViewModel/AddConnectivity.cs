using System.ComponentModel.DataAnnotations;

namespace CONX.Models.ConnectivityViewModel
{
    public class AddConnectivity
    {
        [Required(ErrorMessage = "User Id is required")]
        public string UserId { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Hotline is required")]
        public string Hotline { get; set; }
    }
}
