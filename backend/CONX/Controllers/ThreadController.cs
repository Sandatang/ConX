using CONX.Models;
using CONX.Models.ForumPostingsViewModel;
using CONX.Models.ForumViewModel;
using CONX.Models.ThreadViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CONX.Controllers
{
    [Route("api/forum/thread")]
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
        public async Task<IActionResult> AddPosting([FromBody] AddThread forumPostings)
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
            if (forum == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " Forum not exist", Field = "failed" });
            }


            // Create new Postings
            var postings = new Models.Thread
            {
                UserId = forumPostings.UserId,
                PostTitle = forumPostings.Title,
                PostBody = forumPostings.Content,
                DateCreated = DateTime.Now,
            };

            // Que data to be inserted in Db
            _context.Threads.Add(postings);

            // Save the data
            var result = await _context.SaveChangesAsync();

            // Check if there is error
            if (result <= 0)
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
        [Route("view/{threadId}")]
        public async Task<IActionResult> ViewForum(string threadId)
        {
            var convertedId = Int32.Parse(threadId);
            var postings = await _context.ForumThreads
                                    .Where(x => x.ForumId == convertedId)
                                    .Select(x => new
                                    {
                                        threadId = x.ThreadId,
                                        userId = x.Thread.UserId,
                                        user = x.Thread.User.Firstname + " " + x.Thread.User.Lastname,
                                        threadTitle = x.Thread.PostTitle,
                                        threadContent = x.Thread.PostBody,
                                        isClosed = x.Thread.isClosed,
                                        dateCreated = x.Thread.DateCreated,

                                    }).ToListAsync();

            if(postings.Count > 0)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " Thread not exist", Field = "failed" });
            }

            return Ok(postings);
        }

        [HttpPut]
        [Route("close")]
        public async Task<IActionResult> CloseThread([FromBody] CloseThread closeThread)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                    new Response { Status = "Error", Message = "Validation failed", Field = "failed" });
            }
            // Find the thread
            var thread = await _context.Threads.FindAsync(closeThread.ThreadId);
            // If thread not exist
            if (thread == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = "Thread not exist", Field = "failed" });
            }
            // Update the isClosed col to True
            thread.isClosed = true;
            //Save the update
            var result = await _context.SaveChangesAsync();
            // If unsuccessful
            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong", Field = "failed" });
            }

            return Ok("Thread is closed.");
        }
    }
}
