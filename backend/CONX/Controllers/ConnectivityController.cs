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

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateConnectivity([FromBody] UpdateConnectivity updateConnectivity)
        {

            var user = await _userManager.FindByIdAsync(updateConnectivity.UserId);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                       new Response { Status = "Error", Message = " User not exist ", Field = "failed" });
            }

            var connectivity = await _context.Connectivitys.FindAsync(updateConnectivity.HotlineId);
            if (connectivity == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                       new Response { Status = "Error", Message = " Contact not exist ", Field = "failed" });
            }
            connectivity.UserId = updateConnectivity.UserId;
            connectivity.Name = updateConnectivity.Name;
            connectivity.Hotline = updateConnectivity.Hotline;

            var result = await _context.SaveChangesAsync();

            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                       new Response { Status = "Error", Message = " Something went wrong, try again later ", Field = "failed" });
            }

            return Ok(new Response { Status = "Success", Message = "Contact Updated successfully"});
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

        [HttpDelete]
        [Route("delete/{hotlineId}")]
        public async Task<IActionResult> DeleteJob(string hotlineId)
        {
            var convertedId = Int32.Parse(hotlineId);
            // Find the job
            var con = await _context.Connectivitys.FindAsync(convertedId);
            if (con == null)
            {
                return NotFound(new Response { Status = "Error", Message = " Hotline not exist ", Field = "failed" });

            }

            _context.Connectivitys.Remove(con);
            var result = await _context.SaveChangesAsync();
            if (result <= 0)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                 new Response { Status = "Error", Message = " Something went wrong, Updates not push through", Field = "failed" });
            }
            return Ok(new Response { Status = "Success", Message = "Deleted successfully" });
        }

    }
}
