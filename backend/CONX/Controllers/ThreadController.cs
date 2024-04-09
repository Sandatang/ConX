using CONX.Models;
using CONX.Models.ForumPostingsViewModel;
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

            if(forumPostings.ImageUrl != null)
            {
                postings.ImgUrl = forumPostings.ImageUrl;
            }

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
            return Ok(new Response { Status = "Success", Message = " Postings added succesfully", });

        }

        [HttpGet]
        [Route("view/{threadId}")]
        public async Task<IActionResult> ViewThread(string threadId)
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

            if (postings.Count > 0)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " Thread not exist", Field = "failed" });
            }

            return Ok(postings);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateThread([FromBody] UpdateThread updateThread)
        {
            if (!ModelState.IsValid)
            {
                // Model validation failed
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return StatusCode(StatusCodes.Status400BadRequest,
                    new Response { Status = "Error", Message = "Validation failed", Field = "failed" });
            }

            var thread = await _context.Threads.FindAsync(updateThread.ThreadId);
            if (thread == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                   new Response { Status = "Error", Message = "Thread not found", Field = "failed" });
            }
            // Update the thread data
            thread.PostTitle = updateThread.Title;
            thread.PostBody = updateThread.Content;
            // Save the data
            var result = await _context.SaveChangesAsync();

            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   new Response { Status = "Error", Message = "Something went wrong", Field = "failed" });
            }

            return Ok(new Response { Status = "Success", Message = "Updated successfully" });
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

        [HttpGet]
        [Route("getAll/{forumId}")]
        public async Task<IActionResult> ViewThreads(string forumId)
        {
            var convertedId = Int32.Parse(forumId);
            var threads = await _context.ForumThreads
                                                    .Where(x => x.ForumId == convertedId)
                                                    .Select(x => new
                                                    {
                                                        Thread = new
                                                        {
                                                            ThreadId = x.ThreadId,
                                                            UserId = x.Thread.UserId,
                                                            User = x.Thread.User.Firstname + " " + x.Thread.User.Lastname,
                                                            Title = x.Thread.PostTitle,
                                                            Content = x.Thread.PostBody,
                                                            Created = x.Thread.DateCreated,
                                                        },
                                                        Comment = _context.ThreadComments
                                                                                        .Where(tc => tc.ThreadId == x.ThreadId)
                                                                                        .Select(tc => new
                                                                                        {
                                                                                            CommentId = tc.CommentId,
                                                                                            UserId = tc.Comment.UserId,
                                                                                            User = tc.Comment.User.Firstname + " " + tc.Comment.User.Lastname,
                                                                                            Content = tc.Comment.Content,
                                                                                            Created = tc.Comment.Created,
                                                                                        }).ToList()
                                                    }).ToListAsync();

            if (threads.Count == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = "No threads found for the specified forum", Field = "forumId" });
            }

            return Ok(threads);
        }

    }
}
