using CONX.Models;
using CONX.Models.ForumPostingsViewModel;
using CONX.Models.ForumViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CONX.Controllers
{
    [Route("api/forum/postings")]
    [ApiController]
    public class ForumPostingController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;

        public ForumPostingController(UserManager<IdentityUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddPosting([FromBody] ForumPostings forumPostings)
        {

            // Check if user is null 
            var user = await _userManager.FindByIdAsync(forumPostings.UserId);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " User not exist", Field = "failed" });
            }

            // Check if forum is valid or exist
            var forum = await _context.Forums.FindAsync(forumPostings.ForumId);
            if(forum == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " Forum not exist", Field = "failed" });
            }


            // Create new Postings
            var postings = new Postings
            {
                PosterId = forumPostings.UserId,
                PostTitle = forumPostings.Title,
                PostBody = forumPostings.Content,
                DateCreated = DateTime.Now,
            };

            // Que data to be inserted in Db
            _context.ForumPostings.Add(postings);

            // Save the data
            var result = await _context.SaveChangesAsync();

            // Check if there is error
            if(result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong. Try again later", Field = "failed" });
            }

            var forumPost = new ForumPost
            {
                ForumId = forumPostings.ForumId,
                PostingsId = postings.Id,
            };
            // Que data to be inserted in 
            _context.ForumPosts.Add(forumPost);

            // Save the data
            var forumPostResult = await _context.SaveChangesAsync();

            // Check if there is error
            if (forumPostResult <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong. Try again later", Field = "failed" });
            }

            // If there's no error occured
            return Ok("Postings successfully created");

        }

        [HttpGet]
        [Route("view")]
        public async Task<IActionResult> ViewForum()
        {
            var postings = await _context.ForumPostings.ToListAsync();

            return Ok(postings);
        }
    }
}
