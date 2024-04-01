using CONX.Models;
using CONX.Models.ForumViewModel;
using CONX.Models.ThreadViewModel;
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
                Tags = addForum.Keywords,
                Description = addForum.Description,
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
            return Ok(new Response { Status = "Success", Message = "Forum created successfully" });

        }

        [HttpGet]
        [Route("view")]
        public async Task<IActionResult> ViewForum()
        {
            var forums = await _context.Forums.ToListAsync();

            if(forums == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                    new Response { Status = "Error", Message = " No forums created ", Field = "failed" });
            }

            return Ok(forums);
        }

        [HttpPost]
        [Route("view/{forumId}")]
        public async Task<IActionResult> ViewForum(string forumId)
        {
            var forum = await _context.Forums.FindAsync(forumId);

            if (forum == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                    new Response { Status = "Error", Message = " No forums created ", Field = "failed" });
            }

            return Ok(forum);
        }

        [HttpGet]
        [Route("popular")]
        public async Task<IActionResult> ViewPopularForum()
        {
            var forums = await _context.Forums.Include(f => f.Creator)
                                              .OrderByDescending(f => f.FollowCount)
                                              .Take(5)
                                              .ToListAsync();

            if (forums == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                    new Response { Status = "Error", Message = " No forums created ", Field = "failed" });
            }

            return Ok(forums);
        }

        [HttpPost]
        [Route("follow")]
        public async Task<IActionResult> FollowForum([FromBody]FollowForum model)
        {
            var forum = await _context.Forums.FindAsync(model.ForumId);
            

            if (forum == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                    new Response { Status = "Error", Message = " No forums created ", Field = "failed" });
            }

            _context.ForumFollows.Add(new JuncForumFollows
            {
                ForumId = model.ForumId,
                UserId = model.UserId,
            });

            forum.FollowCount += 1;


            _context.Update(forum);
            _context.SaveChanges();

            return Ok(forum);
        }

        [HttpPost]
        [Route("view/following/{userId}")]
        public async Task<IActionResult> ViewFollowing(string userId)
        {
            var followedForums = await _context.ForumFollows
                                        .Include(x => x.Forum)
                                        .Where(x => x.UserId == userId)
                                        .ToListAsync();


            if (followedForums == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                    new Response { Status = "Error", Message = " No forums created ", Field = "failed" });
            }


            return Ok(followedForums);
        }

        [HttpPost]
        [Route("view/myforums/{userId}")]
        public async Task<IActionResult> ViewMyForums(string userId)
        {
            var myForums = await _context.ForumFollows
                                        .Include(x => x.Forum)
                                        .Where(x => x.UserId == userId)
                                        .ToListAsync();


            if (myForums == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                    new Response { Status = "Error", Message = " No forums created ", Field = "failed" });
            }


            return Ok(myForums);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateThread([FromBody] UpdateForum updateForum)
        {
            if (!ModelState.IsValid)
            {    // Model validation failed
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return StatusCode(StatusCodes.Status400BadRequest,
                    new Response { Status = "Error", Message = "Validation failed", Field = "failed" });
            }

            var forum = await _context.Forums.FindAsync(updateForum.ForumId);
            if (forum == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                   new Response { Status = "Error", Message = "Forum not found", Field = "failed" });
            }
            // Update the thread data
            forum.Title = updateForum.Title;
            // Save the data
            var result = await _context.SaveChangesAsync();

            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   new Response { Status = "Error", Message = "Something went wrong", Field = "failed" });
            }

            return Ok("Update success");
        }
    }
}
