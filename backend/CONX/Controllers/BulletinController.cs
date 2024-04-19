using CONX.Models;
using CONX.Models.BulletinViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace CONX.Controllers
{
    [ApiController]
    [Route("api/bulletin")]
    public class BulletinController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly string _uploadPath;

        public BulletinController(UserManager<IdentityUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;

            var currentDirectory = Directory.GetCurrentDirectory();
            var goUp = Directory.GetParent(currentDirectory);
            var goUp2 = Directory.GetParent(goUp.ToString());
            var basePath = goUp2.ToString();

            // Combine it with the 'Uploads' directory
            _uploadPath = Path.Combine(basePath.ToString(), "Uploads");

            // Check if the directory exists; create it if not
            if (!Directory.Exists(_uploadPath))
            {
                Directory.CreateDirectory(_uploadPath);
            }
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddPosting([FromForm] AddBulletin addBulletin)
        {


            // Check if user is null 
            var user = await _userManager.FindByIdAsync(addBulletin.UserId);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " User not exist", Field = "failed" });
            }


            // Create new Postings
            var postings = new Models.BulletinPost
            {
                UserId = addBulletin.UserId,
                PostTitle = addBulletin.Title,
                PostBody = addBulletin.Content,
                DateCreated = DateTime.Now,
            };

            if (addBulletin.Image != null)
            {
                //process File and copy to path
                if (addBulletin.Image == null && addBulletin.Image.Length <= 0)
                {
                    return StatusCode(StatusCodes.Status404NotFound,
                     new Response { Status = "Error", Message = "Uploaded image is corrupted", Field = "failed" });

                }
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(addBulletin.Image.FileName);
                var filePath = Path.Combine(_uploadPath, fileName); // Specify your file upload path
                postings.ImgUrl = fileName;

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await addBulletin.Image.CopyToAsync(fileStream);
                }



            }

            // Que data to be inserted in Db
            _context.BulletinPost.Add(postings);

            // Save the data
            var result = await _context.SaveChangesAsync();

            // Check if there is error
            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong. Try again later", Field = "failed" });
            }

            // If there's no error occured
            return Ok(new Response { Status = "Success", Message = " Postings added succesfully", });

        }

        [HttpGet]
        [Route("view/all")]
        public async Task<IActionResult> GetAllPost()
        {
            var post = await _context.BulletinPost
                                                  .OrderByDescending(bp => bp.DateCreated)
                                                  .Select(bp => new
                                                  {
                                                      BulletinPost = new
                                                      {
                                                          BulletinId = bp.Id,
                                                          Title = bp.PostTitle,
                                                          Content = bp.PostBody,
                                                          User = bp.User.Firstname + " " + bp.User.Lastname,
                                                          CreatorId = bp.UserId,
                                                          ImageName = bp.ImgUrl,
                                                          Created = bp.DateCreated
                                                      },
                                                      Comment = _context.BulletinComments
                                                                                        .Where(bc => bc.BulletinPostId == bp.Id)
                                                                                        .OrderByDescending(bc => bc.Comment.Created)
                                                                                        .Select(tc => new
                                                                                        {
                                                                                            CommentId = tc.CommentId,
                                                                                            UserId = tc.Comment.UserId,
                                                                                            User = tc.Comment.User.Firstname + " " + tc.Comment.User.Lastname,
                                                                                            Content = tc.Comment.Content,
                                                                                            Created = tc.Comment.Created,
                                                                                        }).ToList()
                                                  }).ToListAsync();

            if (post.Count == 0)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                    new Response { Status = "Error", Message = "No Post yet", Field = "failed" });
            }

            return Ok(post);
        }
    }

}