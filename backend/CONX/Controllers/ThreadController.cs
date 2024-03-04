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
    public class ThreadController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;

        public ThreadController(UserManager<IdentityUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddPosting([FromBody] ThreadView forumPostings)
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
            var postings = new Models.Thread
            {
                PosterId = forumPostings.UserId,
                PostTitle = forumPostings.Title,
                PostBody = forumPostings.Content,
                DateCreated = DateTime.Now,
            };

            // Que data to be inserted in Db
            _context.Threads.Add(postings);

            // Save the data
            var result = await _context.SaveChangesAsync();

            // Check if there is error
            if(result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong. Try again later", Field = "failed" });
            }

            var forumPost = new JuncForumThread
            {
                ForumId = forumPostings.ForumId,
                ThreadId = postings.Id,
            };
            // Que data to be inserted in 
            _context.ForumThreads.Add(forumPost);

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
            var postings = await _context.Threads.ToListAsync();

            return Ok(postings);
        }
    }
}
