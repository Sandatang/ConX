using CONX.Models;
using CONX.Models.Authentication.Login;
using CONX.Models.Authentication.Signup;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CONX.Controllers
{
    [Route("api/authentication")]
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

        [HttpPost]
        [Route("register/women")]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser)
        {
            // Check user if email exist in DB
            var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error",  Message = " Email already exist ", Field = "email" });
            }

            //Check if username exist in DB
            var usernameExist = await _userManager.FindByNameAsync(registerUser.Username);
            if(usernameExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = "Username already exist", Field = "username"});
            }

            // Check password format
            if (registerUser.Password == null || !IsPasswordValid(registerUser.Password))
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                    new Response { Status = " Error ", Message = "Password should have a 8 min. of characaters, countain alpha numeric and non-numeric characters.", Field="password" });
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

        [HttpPost]
        [Route("register/personnel")]
        public async Task<IActionResult> RegisterPersonnel([FromBody] AddPersonnel addPersonnel)
        {
            // Check user if exist in DB
            var userExist = await _userManager.FindByEmailAsync(addPersonnel.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = " Email already exist ", Field = "email" });
            }


            //Check if username exist in DB
            var usernameExist = await _userManager.FindByNameAsync(addPersonnel.Username);
            if (usernameExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = "Username already exist", Field = "username" });
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
                        new Response { Status = "Error", Message = "Invalid Credentials", Field = "both" });
        }

        // addition method for validations
        private bool IsPasswordValid(string password)
        {
            //  check the minimum length, uppercase, lowercase, digits, etc.
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
