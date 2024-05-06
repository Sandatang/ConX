using System.ComponentModel.DataAnnotations;

namespace CONX.Models.ConnectivityViewModel
{
    public class UpdateConnectivity
    {

        public string UserId { get; set; }

        public int HotlineId { get; set; }

        public string Name { get; set; }

        public string Hotline { get; set; }
    }
}
