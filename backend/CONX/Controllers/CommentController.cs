using CONX.Models;
using CONX.Models.CommentViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CONX.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;

        public CommentController(UserManager<IdentityUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddComment([FromBody] AddComment addComment)
        {
            var user = await _userManager.FindByIdAsync(addComment.UserId);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                   new Response { Status = "Error", Message = " User not exist", Field = "failed" });
            }

            var forum = await _context.ForumThreads.FindAsync(addComment.ForumThreadId);

            if (forum == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                   new Response { Status = "Error", Message = " Postings or thread not exist", Field = "failed" });
            }

            var comment = new Comment
            {
                UserId = addComment.UserId,
                Content = addComment.Content,
                Created = DateTime.Now,
            };

            //Que data to add in Comments table
            _context.Comments.Add(comment);
            //Save data to Database
            var commentResult = await _context.SaveChangesAsync();

            if (commentResult <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                  new Response { Status = "Error", Message = " Something went wrong, Try again later", Field = "failed" });
            }

            var threadComment = new JuncThreadComment
            {
                CommentId = comment.CommentId,
                ThreadId = addComment.ForumThreadId,
            };

            //Que data to add in PostComments table
            _context.ThreadComments.Add(threadComment);
            //Save data to Database
            var juncPostCommentResult = await _context.SaveChangesAsync();

            if (juncPostCommentResult <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                  new Response { Status = "Error", Message = " Something went wrong, Try again later", Field = "failed" });
            }

            return Ok();
        }
    }

}

