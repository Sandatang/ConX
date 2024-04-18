using CONX.Models;
using CONX.Models.Authentication.Login;
using CONX.Models.Authentication.Signup;
using CONX.Models.AuthenticationViewModels;
using CONX.Models.AuthenticationViewModels.Signup;
using ConXUser.Management.Service.Model;
using ConXUser.Management.Service.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CONX.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailServices _emailService;
        private readonly ApplicationDbContext _context;

        public AuthenticationController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IEmailServices emailService, ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _emailService = emailService;
            _context = context;
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

            // Token for email verification
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = user.Email }, Request.Scheme);
            var message = new Message(new string[] { user.Email! }, "Email Verificaiton", confirmationLink!);
            _emailService.SendEmail(message);

            return StatusCode(StatusCodes.Status200OK,
                   new Response { Status = "Success", Message = $" User created successfully & Email is sent {user.Email} for verification"});


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
            user.EmployeeNumber = addPersonnel.EmployeeNumber;
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


            // Token for email verification
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = user.Email }, Request.Scheme);
            var message = new Message(new string[] { user.Email! }, "Email Verification", confirmationLink!);
            _emailService.SendEmail(message);

            return StatusCode(StatusCodes.Status200OK,
                   new Response { Status = "Success", Message = $" User created successfully & Email is sent {user.Email} for verification" });


           // return StatusCode(StatusCodes.Status200OK,
             //      new Response { Status = "Success", Message = " User created successfully" });


        }

        // Add a personnel
        [HttpPost]
        [Route("register/admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] AddAdmin addAdmin)
        {
            // Check user if exist in DB
            var userExist = await _userManager.FindByEmailAsync(addAdmin.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = " Email already exist ", Field = "failed" });
            }


            //Check if username exist in DB
            var usernameExist = await _userManager.FindByNameAsync(addAdmin.Username);
            if (usernameExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = "Username already exist", Field = "failed" });
            }

            //Default password
            string defaultPassword = "Admin123@";

            var user = new User();

            // Add women user to DB
            user.Email = addAdmin.Email;
            user.UserName = addAdmin.Username;
            user.Firstname = addAdmin.Firstname;
            user.Lastname = addAdmin.Lastname;
            user.Middlename = addAdmin.Middlename;
            user.Birthdate = addAdmin.Birthdate;


            var result = await _userManager.CreateAsync(user, defaultPassword);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   new Response { Status = "Error", Message = " User not created" });
            }

            await _userManager.AddToRoleAsync(user, "admin");


            // Token for email verification
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = user.Email }, Request.Scheme);
            var message = new Message(new string[] { user.Email! }, "Email Verification", confirmationLink!);
            _emailService.SendEmail(message);

            return StatusCode(StatusCodes.Status200OK,
                   new Response { Status = "Success", Message = $" User created successfully & Email is sent {user.Email} for verification" });


            // return StatusCode(StatusCodes.Status200OK,
            //      new Response { Status = "Success", Message = " User created successfully" });


        }

        [HttpGet]
        [Route("emailConfirmation")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            { 
                var result = await _userManager.ConfirmEmailAsync(user, token);

                if (result.Succeeded)
                {
                    //return StatusCode(StatusCodes.Status200OK,
                    //    new Response { Status = "Success", Message = " Email Verified Successfully " });
                    return Redirect("http://localhost:5173/email/confirmation/Success");
                }
            }

            //return StatusCode(StatusCodes.Status500InternalServerError,
            //            new Response { Status = "Error", Message = " This User Does not Exist", Field="failed" });

            return Redirect("http://localhost:5173/email/error/Error");
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

            var users = iUsers.Select(user => new
            {
                user = new User
                {

                    Id = user.Id,
                    Firstname = ((User)user).Firstname, // Cast to your custom User class
                    Middlename = ((User)user).Middlename,
                    Birthdate = ((User)user).Birthdate,
                    Lastname = ((User)user).Lastname,
                    UserName = user.UserName,
                    IsDeleted = ((User)user).IsDeleted,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    DeActivate = ((User)user).DeActivate,
                }

            })
             .Where(v => !v.user.IsDeleted || v.user.IsDeleted == null)
             .ToList();

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

            var users = iUsers.Select(user => new
            {
                user = new User
                {

                Id = user.Id,
                EmployeeNumber = ((User)user).EmployeeNumber,
                Firstname = ((User)user).Firstname, // Cast to your custom User class
                Middlename = ((User)user).Middlename,
                Birthdate = ((User)user).Birthdate,
                Lastname = ((User)user).Lastname,
                UserName = user.UserName,
                IsDeleted = ((User)user).IsDeleted,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                DeActivate = ((User)user).DeActivate,
                }

            })
             .Where(v => !v.user.IsDeleted || v.user.IsDeleted == null)
             .ToList();

            // Return if user is not null
            return Ok(users);
        }
        // View all personnel
        [HttpGet]
        [Route("view/admin")]
        public async Task<IActionResult> ViewAdmin()
        {
            var iUsers = await _userManager.GetUsersInRoleAsync("admin");

            //Check if personnel is null
            if (iUsers == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                        new Response { Status = "Success", Message = " Users currently empty" });
            }

            var users = iUsers.Select(user => new
            {
                user = new User
                {

                    Id = user.Id,
                    Firstname = ((User)user).Firstname, // Cast to your custom User class
                    Middlename = ((User)user).Middlename,
                    Birthdate = ((User)user).Birthdate,
                    Lastname = ((User)user).Lastname,
                    UserName = user.UserName,
                    IsDeleted = ((User)user).IsDeleted,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    DeActivate = ((User)user).DeActivate,
                }

            })
             .Where(v => !v.user.IsDeleted || v.user.IsDeleted == null)
             .ToList();

            // Return if user is not null
            return Ok(users);
        }

        // View all personnel
        [HttpGet]
        [Route("view/deActivated/accounts")]
        public async Task<IActionResult> ViewDeActivatedAccounts()
        {
            var users = await _userManager.Users.ToListAsync();

            //Check if personnel is null
            if (users == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                        new Response { Status = "Success", Message = " Users currently empty" });
            }

            var deUsers = users
                .Where(us => ((User)us).IsDeleted == false)
                .Select(us => new
            {
                user = new User
                {

                    Id = us.Id,
                    EmployeeNumber = ((User)us).EmployeeNumber,
                    Firstname = ((User)us).Firstname, // Cast to your custom User class
                    Middlename = ((User)us).Middlename,
                    Birthdate = ((User)us).Birthdate,
                    Lastname = ((User)us).Lastname,
                    UserName = us.UserName,
                    IsDeleted = ((User)us).IsDeleted,
                    Email = us.Email,
                    PhoneNumber = us.PhoneNumber,
                    DeActivate = ((User)us).DeActivate,
                }
            })
             .ToList();

            // Return if user is not null
            return Ok(deUsers);
        }

        [HttpGet]
        [Route("getTotalUser")]
        public async Task<IActionResult> GetTotalUser()
        {
            var totalUser = await _userManager.Users.CountAsync();
            var totalPersonnel = await _userManager.GetUsersInRoleAsync("personnel");
            var totalWomen = await _userManager.GetUsersInRoleAsync("women");
            var totalAdmin = await _userManager.GetUsersInRoleAsync("admin");


            var data = new
            {
                users = totalUser,
                personnel = totalPersonnel.Count(),
                totalWomen = totalWomen.Count(),
                totalAdmin = totalAdmin.Count(),
            };


            return Ok(data);

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
            if (!ModelState.IsValid)
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

            if (user == null)
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

            return Ok(new Response { Status = "Success", Message = "Password change successfully" });
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
            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                        new Response { Status = "Error", Message = " User not found", Field = "failed" });
            }
            // Update the users data
            var userToUpdate = (User)user;
            if (updateUser.UserName != null)
            {
                userToUpdate.UserName = updateUser.UserName;
            }
            userToUpdate.Firstname = updateUser.Firstname;
            userToUpdate.Middlename = updateUser.Middlename;
            userToUpdate.Lastname = updateUser.Lastname;
            userToUpdate.Email = updateUser.Email;
            userToUpdate.Birthdate = updateUser.Birthdate;

            var result = await _userManager.UpdateAsync(userToUpdate);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                       new Response { Status = "Error", Message = " Something went wrong", Field = "failed" });
            }


            return Ok(new Response { Status = " Success", Message = "Update Successfully" });
        }


        // De activate user
        [HttpPut]
        [Route("user/deActivate")]
        public async Task<IActionResult> DeActivateUser([FromBody] DeActivateUser deActivateUser)
        {
            var user = await _userManager.FindByIdAsync(deActivateUser.UserId);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " User not found", Field = "failed" });
            }

            var deactUser = await _userManager.FindByIdAsync(deActivateUser.DeactivatorId);

            if (deactUser == null)
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

            var logs = new AccountDeactivationLog();

            logs.DeactivatedAccountId = deActivateUser.UserId;
            logs.DeactivatedAccountName = ((User)user).Firstname + " " + ((User)user).Lastname;
            logs.DeactReason = deActivateUser.DeactivationReason;
            logs.DeactivatorId = deActivateUser.DeactivatorId;
            logs.DeactivatorName = ((User)deactUser).Firstname + " " + ((User)deactUser).Lastname;

            // Save the data
            _context.Update(customUser);
            await _context.SaveChangesAsync();

            // Change deactivate col to 
            return Ok(new Response { Status = "Success", Message = "User deactivated " });
        }

        // Delete
        [HttpDelete]
        [Route("user/delete/{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " User not found", Field = "failed" });
            }



           
            // Cast the IdentityUser
            var customUser = (User)user;

            customUser.IsDeleted = true;
            var result = await _userManager.UpdateAsync(customUser);

            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong", Field = "failed" });
            }

            // Change deactivate col to 
            return Ok(new Response { Status = "Success", Message = "User deleted " });
        }


        // Authentication for logging in
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser loginUser)
        {
            // Check user if exist
            var user = await _userManager.FindByNameAsync(loginUser.Username);

            var extendedUserProperties = (User)user;

            if (user != null && extendedUserProperties.DeActivate == true)
            {

                return Ok(new Response { Status = "Error", Message = "User account is deactivated " });
            }

            if (user != null && extendedUserProperties.IsDeleted == true)
            {
                return Ok(new Response { Status = "Error", Message = "Account does not exist " });
            }

            if (user != null && await _userManager.CheckPasswordAsync(user, loginUser.Password))
            {
                if (!user.EmailConfirmed)
                {
                    // Token for email verification
                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = user.Email }, Request.Scheme);
                    var message = new Message(new string[] { user.Email! }, "Confirmation Email Link", confirmationLink!);
                    _emailService.SendEmail(message);

                    return StatusCode(StatusCodes.Status200OK,
                           new Response { Status = "Success", Message = $" User Email is not verified, Email is sent to {user.Email} for verification" });
                }

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
