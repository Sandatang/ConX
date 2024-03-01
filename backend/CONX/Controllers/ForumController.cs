using CONX.Models;
using CONX.Models.ForumViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CONX.Controllers
{
    [Route("api/forum")]
    [ApiController]
    public class ForumController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;

        public ForumController(UserManager<IdentityUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateForum([FromBody] AddForum addForum)
        {
            var user = await _userManager.FindByIdAsync(addForum.UserId);

            // Check if user is null 
            if( user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " User not exist ", Field = "failed" });
            }

            // Create new forum
            var forum = new Forum
            {
                CreatorId = addForum.UserId,
                Title = addForum.Title,
                DateCreated = DateTime.Now,
            };
            
            // Que data to be inserted in DB
            _context.Forums.Add(forum);

            // Save the data
            var result = await _context.SaveChangesAsync();

            // If something went wrong 
            if(result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    new Response { Status = "Error", Message = " Something went wrong. Try again later ", Field = "failed" });
            }

            // if no error occured
            return Ok("Forum created successfully");

        }

        [HttpGet]
        [Route("view")]
        public async Task<IActionResult> ViewForum()
        {
            var forums = await _context.Forums.ToListAsync();

            return Ok(forums);
        }
    }
}
