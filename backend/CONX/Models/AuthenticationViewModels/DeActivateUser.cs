﻿using System.ComponentModel.DataAnnotations;

namespace CONX.Models.AuthenticationViewModels
{
    public class DeActivateUser
    {
        [Required]
        public string UserId { get; set; }
    }
}
