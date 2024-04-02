using CONX.Models;
using CONX.Models.CommentViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var thread = await _context.Threads.FindAsync(addComment.ThreadId);
            if (thread != null)
            {
                if (thread.isClosed)
                {
                    return StatusCode(StatusCodes.Status200OK,
                       new Response { Status = "Success", Message = " Thread is closed ", Field = "failed" });
                }
                var user = await _userManager.FindByIdAsync(addComment.UserId);

                if (user == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound,
                       new Response { Status = "Error", Message = " User not exist", Field = "failed" });
                }

                var forum = await _context.ForumThreads.FindAsync(addComment.ThreadId);

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
                    ThreadId = addComment.ThreadId,
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

            return StatusCode(StatusCodes.Status404NotFound,
              new Response { Status = "Error", Message = " Thread not found ", Field = "failed" });

        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateComment([FromBody] EditComment editComment)
        {

            if (!ModelState.IsValid)
            {
                // Model validation failed
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return StatusCode(StatusCodes.Status400BadRequest,
                    new Response { Status = "Error", Message = "Validation failed", Field = "failed" });
            }

            var comment = await _context.Comments.FindAsync(editComment.CommentId);

            if (comment == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                   new Response { Status = "Error", Message = " Comment not exist", Field = "failed" });
            }

            // Update the content
            comment.Content = editComment.Content;

            // Savet the data
            var result = await _context.SaveChangesAsync();

            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Somethign went wrong ", Field = "failed" });
            }

            return Ok();
        }

        [HttpPost]
        [Route("view/{threadId}")]
        public async Task<IActionResult> ViewComments(string threadId)
        {
            // Parse string to Int
            var convertedID = Int32.Parse(threadId);
            var comments = await _context.ThreadComments
                                            .Include(x => x.Comment)
                                            .Where(x => x.ThreadId == convertedID)
                                            .Select(x => new
                                            {
                                                threadId = x.ThreadId,
                                                commentID = x.CommentId,
                                                commentContent = x.Comment.Content,

                                            })
                                            .ToListAsync();

            return Ok(comments);
        }

        [HttpDelete]
        [Route("delete/{commentId}")]
        public async Task<IActionResult> DeleteComment(string commentId)
        {
            // Parse string to Int
            var convertedId = Int32.Parse(commentId);
            // Delete data from junction table 
            var juncTable = await _context.ThreadComments.Where(x => x.CommentId == convertedId).ToListAsync();

            if (!juncTable.Any())
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " Cannot find this comment. ", Field = "failed" });
            }

            // Que query for deleting the data
            _context.ThreadComments.RemoveRange(juncTable);
            // Remove the data
            var result = await _context.SaveChangesAsync();

            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong. ", Field = "failed" });
            }

            // Find comment data
            var commentTableDeletion = await _context.Comments.FindAsync(convertedId);
            if (commentTableDeletion == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " Cannot Find Comment. ", Field = "failed" });
            }

            // Que query for deleting the data
            _context.Comments.Remove(commentTableDeletion);
            // Remove the data
            var commentResultDeletion = await _context.SaveChangesAsync();

            if (commentResultDeletion <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong. ", Field = "failed" });
            }

            // If no errors

            return Ok("Comment deleted successfully");

        }
    }

}

