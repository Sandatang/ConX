﻿using CONX.Models;
using CONX.Models.Authentication.Login;
using CONX.Models.Authentication.Signup;
using CONX.Models.AuthenticationViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Xml.Linq;

namespace CONX.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }
        // Add a user women
        [HttpPost]
        [Route("register/women")]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser)
        {
            // Check user if email exist in DB
            var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = " Email already exist ", Field = "failed" });
            }

            //Check if username exist in DB
            var usernameExist = await _userManager.FindByNameAsync(registerUser.Username);
            if (usernameExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = "Username already exist", Field = "failed" });
            }

            // Check password format
            if (registerUser.Password == null || !IsPasswordValid(registerUser.Password))
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                    new Response { Status = " Error ", Message = "Password should have a 8 min. of characaters, countain alpha numeric and non-numeric characters.", Field = "failed" });
            }

            var user = new User();

            // Add women user to DB
            user.Email = registerUser.Email;
            user.UserName = registerUser.Username;
            user.Firstname = registerUser.Firstname;
            user.Lastname = registerUser.Lastname;
            user.Middlename = registerUser.Middlename;
            user.Birthdate = registerUser.Birthdate;


            var result = await _userManager.CreateAsync(user, registerUser.Password);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   new Response { Status = "Error", Message = " User not created" });
            }

            await _userManager.AddToRoleAsync(user, "women");
            return StatusCode(StatusCodes.Status200OK,
                   new Response { Status = "Success", Message = " User created successfully" });


        }

        // Add a personnel
        [HttpPost]
        [Route("register/personnel")]
        public async Task<IActionResult> RegisterPersonnel([FromBody] AddPersonnel addPersonnel)
        {
            // Check user if exist in DB
            var userExist = await _userManager.FindByEmailAsync(addPersonnel.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = " Email already exist ", Field = "failed" });
            }


            //Check if username exist in DB
            var usernameExist = await _userManager.FindByNameAsync(addPersonnel.Username);
            if (usernameExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = "Username already exist", Field = "failed" });
            }

            //Default password
            string defaultPassword = "Barangay123@";

            var user = new User();

            // Add women user to DB
            user.Email = addPersonnel.Email;
            user.UserName = addPersonnel.Username;
            user.Firstname = addPersonnel.Firstname;
            user.Lastname = addPersonnel.Lastname;
            user.Middlename = addPersonnel.Middlename;
            user.Birthdate = addPersonnel.Birthdate;


            var result = await _userManager.CreateAsync(user, defaultPassword);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   new Response { Status = "Error", Message = " User not created" });
            }

            await _userManager.AddToRoleAsync(user, "personnel");
            return StatusCode(StatusCodes.Status200OK,
                   new Response { Status = "Success", Message = " User created successfully" });


        }

        // View all women
        [HttpGet]
        [Route("view/women")]
        public async Task<IActionResult> ViewWomen()
        {
            var iUsers = await _userManager.GetUsersInRoleAsync("women");

            //Check if women user is null
            if (iUsers == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                        new Response { Status = "Success", Message = " Users currently empty" });
            }

            var users = iUsers.Select(user => new User
            {
                Id = user.Id,
                Firstname = ((User)user).Firstname, // Cast to your custom User class
                Middlename = ((User)user).Middlename,
                Birthdate = ((User)user).Birthdate,
                Lastname = ((User)user).Lastname,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                DeActivate = ((User)user).DeActivate,
            }).ToList();

            // return if user is not null
            return Ok(users);
        }

        // View all personnel
        [HttpGet]
        [Route("view/personnel")]
        public async Task<IActionResult> ViewPersonnel()
        {
            var iUsers = await _userManager.GetUsersInRoleAsync("personnel");

            //Check if personnel is null
            if (iUsers == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                        new Response { Status = "Success", Message = " Users currently empty" });
            }

            var users = iUsers.Select(user => new User
            {
                Id = user.Id,
                Firstname = ((User)user).Firstname, // Cast to your custom User class
                Middlename = ((User)user).Middlename,
                Birthdate = ((User)user).Birthdate,
                Lastname = ((User)user).Lastname,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                DeActivate = ((User)user).DeActivate,
            }).ToList();

            // Return if user is not null
            return Ok(users);
        }

        [HttpGet]
        [Route("get/user/{id}")]
        public async Task<IActionResult> GetOneUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                        new Response { Status = "Error", Message = " User not found", Field = "failed" });
            }
            var selectedUser = (User)user;
            // Returned only specific data
            var data = new
            {
                firstname = selectedUser.Firstname,
                middlename = selectedUser.Middlename,
                lastname = selectedUser.Lastname,
                birthdate = selectedUser.Birthdate,
                username = selectedUser.UserName,
                employeNum = selectedUser.EmployeeNumber,
                email = selectedUser.Email,

            };

            return Ok(data);
        }
        [HttpPost]
        [Route("password-confirmation")]
        public async Task<IActionResult> PasswordConfirmation([FromBody] PasswordConfirmation passwordConfirmation)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the user
            var user = await _userManager.FindByIdAsync(passwordConfirmation.UserId);

            if (user != null && await _userManager.CheckPasswordAsync(user, passwordConfirmation.Password))
            {
                return Ok(new Response { Status = "Success" });

            }

            return StatusCode(StatusCodes.Status404NotFound,
                        new Response { Status = "Error", Message = " Password not match", Field = "failed" });
        }

        [HttpPut]
        [Route("changepass")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePassword changePassword)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(changePassword.UserId);

            if(user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                     new Response { Status = " Error ", Message = " User not found", Field = "failed" });

            }

            // Check password format
            if (changePassword.NewPassword == null || !IsPasswordValid(changePassword.NewPassword))
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                    new Response { Status = " Error ", Message = "Password should have a 8 min. of characaters, countain alpha numeric and non-numeric characters.", Field = "failed" });
            }

            var result = await _userManager.ChangePasswordAsync(user, changePassword.OldPassword, changePassword.NewPassword);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                     new Response { Status = " Error ", Message = " Something went wrong", Field = "failed" });
            }

            return Ok(new Response { Status = "Success", Message="Password change successfully"});
        }

        // User Update
        [HttpPut]
        [Route("update/user/")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUser updateUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(updateUser.UserId);
            if(user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                        new Response { Status = "Error", Message = " User not found", Field = "failed" });
            }
            // Update the users data
            var userToUpdate = (User)user;
            if(updateUser.UserName != null)
            {
                userToUpdate.UserName = updateUser.UserName;
            }
            userToUpdate.Firstname = updateUser.Firstname;
            userToUpdate.Middlename = updateUser.Middlename;
            userToUpdate.Lastname= updateUser.Lastname;
            userToUpdate.Email= updateUser.Email;
            userToUpdate.Birthdate = updateUser.Birthdate;

            var result = await _userManager.UpdateAsync(userToUpdate);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                       new Response { Status = "Error", Message = " Something went wrong", Field = "failed" });
            }


            return Ok(new Response { Status = " Success", Message = "Update Successfully"});
        }

        // Delete user single deletion only
        [HttpDelete]
        [Route("delete/user/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            // Check if user exist
            if(user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = "User not found", Field = "failed" });
            }

            var result = await _userManager.DeleteAsync(user);

            // Check if deletion not succeded
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong try again later.", Field = "failed" });
            }

            // If success
            return Ok($"User {id} deleted successfully");
        }

        // De activate user
        [HttpPut]
        [Route("user/deActivate")]
        public async Task<IActionResult> DeActivateUser([FromBody] DeActivateUser deActivateUser)
        {
            var user = await _userManager.FindByIdAsync(deActivateUser.UserId);

            if(user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " User not found", Field = "failed" });
            }

            // Cast the IdentityUser
            var customUser = (User)user;

            // Update the DeActivate property
            customUser.DeActivate = !customUser.DeActivate;

            // Save the data
            var result = await _userManager.UpdateAsync(customUser);

            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong", Field = "failed" });
            }

            // Change deactivate col to 
            return Ok(new Response { Status = "Success", Message = "User deactivated " });
        }


        // Authentication for logging in
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser loginUser)
        {
            // Check user if exist
            var user = await _userManager.FindByNameAsync(loginUser.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, loginUser.Password))
            {
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("id", user.Id),
                };


                // Add Roles to the list
                var userRoles = await _userManager.GetRolesAsync(user);
                foreach (var role in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role));
                }

                // Generate token
                var jwtToken = GetToken(authClaims);

                return Ok(new
                {
                    StatusCode = 200,
                    token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                    expiration = jwtToken.ValidTo
                });

            }


            //return Unauthorized();
            return StatusCode(StatusCodes.Status401Unauthorized,
                        new Response { Status = "Error", Message = "Invalid Credentials", Field = "failed" });
        }


        // Additional method for validations
        private bool IsPasswordValid(string password)
        {
            //  Check the minimum length, uppercase, lowercase, digits, etc.
            if (string.IsNullOrEmpty(password) || password.Length < 8 || !password.Any(char.IsUpper) || !password.Any(char.IsDigit))
            {
                return false;
            }

            return true;
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
