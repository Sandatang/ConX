using CONX.Models;
using CONX.Models.CommentViewModel;
using CONX.Models.ConnectivityViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CONX.Controllers
{

    [Route("/api/connectivity")]
    [ApiController]
    public class ConnectivityController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;

        public ConnectivityController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddConnectivity([FromBody] AddConnectivity addConnectivity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(addConnectivity.UserId);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                       new Response { Status = "Error", Message = " User not exist ", Field = "failed" });
            }

            var connectivity = new Connectivity();

            connectivity.UserId = addConnectivity.UserId;
            connectivity.Name = addConnectivity.Name;
            connectivity.Hotline = addConnectivity.Hotline;

            _context.Connectivitys.Add(connectivity);
            var result = await _context.SaveChangesAsync();

            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                       new Response { Status = "Error", Message = " Something went wrong, try again later ", Field = "failed" });
            }

            var newConnecivity = await _context.Connectivitys
                                                            .Where(cv => cv.Id == connectivity.Id)
                                                            .ToListAsync();
            return Ok(newConnecivity);
        }



        [HttpGet]
        [Route("view")]
        public async Task<IActionResult> GetAllCon()
        {
            var con = await _context.Connectivitys
                                                .Select(cv => new
                                                {
                                                    hotlineId = cv.Id,
                                                    userId = cv.UserId,
                                                    name = cv.Name,
                                                    hotline = cv.Hotline,
                                                })
                                                .ToListAsync();

            return Ok(con);
        }
    }
}
