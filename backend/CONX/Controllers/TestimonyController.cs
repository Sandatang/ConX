using CONX.Models;
using CONX.Models.TestimonyViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CONX.Controllers
{
    [ApiController]
    [Route("testimony")]
    public class TestimonyController : Controller
    {
        public readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;

        public TestimonyController(UserManager<IdentityUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddTestimony([FromBody] AddTestimony addTestimony)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(addTestimony.UserId);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                        new Response { Status = "Error", Message = " User not found", Field = "failed" });
            }

            var creator = (User)user;

            var testimony = new Testimony
            {
                UserId = creator.Id,
                Content = addTestimony.Content,
                Date = DateTime.Now,
            };

            _context.Testimonials.Add(testimony);
            var testimonyResult = await _context.SaveChangesAsync();

            if (testimonyResult <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                  new Response { Status = "Error", Message = " Something went wrong, Try again later", Field = "failed" });
            }

            return Ok(new Response { Status = "Success", Message = "Thank you for sharing" });
        }

        [HttpGet]
        [Route("view")]
        public async Task<IActionResult> ViewAllTestimony()
        {
            var testimonys = await _context.Testimonials
                                                        .Include(tl => tl.User)
                                                        .Select(us => new
                                                        {
                                                            FullName = us.User.Firstname + " " + us.User.Lastname,
                                                            Content = us.Content,
                                                            Created = us.Date,
                                                        }).ToListAsync();

            return Ok(testimonys);
        }
    }
}
