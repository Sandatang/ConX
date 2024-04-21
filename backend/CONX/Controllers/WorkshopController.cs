using CONX.Models.BulletinViewModel;
using CONX.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CONX.Models.WorkshopViewModel;

namespace CONX.Controllers
{
    [ApiController]
    [Route("api/workshop")]
    public class WorkshopController : Controller
    {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly string _uploadPath;

        public WorkshopController(UserManager<IdentityUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;

            var currentDirectory = Directory.GetCurrentDirectory();
            var goUp = Directory.GetParent(currentDirectory);
            var goUp2 = Directory.GetParent(goUp.ToString());
            var basePath = goUp2.ToString();

            // Combine it with the 'Uploads' directory
            _uploadPath = Path.Combine(basePath.ToString(), "Workshop Resources");

            // Check if the directory exists; create it if not
            if (!Directory.Exists(_uploadPath))
            {
                Directory.CreateDirectory(_uploadPath);
            }
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateWorkshop([FromBody] CreateWorkshop model)
        {


            // Check if user is null 
            var user = await _userManager.FindByIdAsync(model.CreatorId);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = "User not found", Field = "failed" });
            }


            // Create new Postings
            var workshop = new Workshop
            {
                WorkshopTitle = model.WorkshopTitle,
                Description = model.Description,
                CreatorId = model.CreatorId,
                Tags = model.Tags,
                Category = model.Category



            };



            // Que data to be inserted in Db
            _context.Workshops.Add(workshop);

            // Save the data
            var result = await _context.SaveChangesAsync();

            // Check if there is error
            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong. Try again later", Field = "failed" });
            }

            // If there's no error occured
            return Ok(new Response { Status = "Success", Message = "Workshop created succesfully", });

        }

        [HttpPost]
        [Route("edit")]
        public async Task<IActionResult> EditWorkshop([FromBody] EditWorkshop model)
        {


            // Check if user is null 
            var user = await _userManager.FindByIdAsync(model.CreatorId);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = "User not found", Field = "failed" });
            }

            var workshop = await _context.Workshops.FindAsync(model.WorkshopId);

            if (workshop == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = "Workshop not found", Field = "failed" });
            }


            workshop.WorkshopTitle = model.WorkshopTitle;
            workshop.Description = model.Description;
            workshop.CreatorId = model.CreatorId;
            workshop.Tags = model.Tags;
            workshop.Category = model.Category;





            // Que data to be updated in Db
            _context.Workshops.Update(workshop);

            // Save the data
            var result = await _context.SaveChangesAsync();

            // Check if there is error
            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong. Try again later", Field = "failed" });
            }

            // If there's no error occured
            return Ok(new Response { Status = "Success", Message = "Workshop created succesfully", });

        }

        [HttpPost]
        [Route("resource/add")]
        public async Task<IActionResult> AddResource([FromForm] AddResource model)
        {


            // Check if user is null 
            var user = await _userManager.FindByIdAsync(model.UploaderId);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = "User not found", Field = "failed" });
            }



            // Create new Postings
            var resource = new Resource
            {
                VideoTitle = model.VideoTitle,
                VideoDescription = model.VideoDescription,
                UploaderId = model.UploaderId,
            };

            //process File and copy to path
            if (model.Video == null && model.Video.Length <= 0)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                 new Response { Status = "Error", Message = "Uploaded image is corrupted", Field = "failed" });

            }
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.Video.FileName);
            var filePath = Path.Combine(_uploadPath, fileName); // Specify your file upload path
            resource.VideoUrl = fileName;

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await model.Video.CopyToAsync(fileStream);
            }

            // Que data to be inserted in Db
            _context.EmpResources.Add(resource);
            _context.WorkshopResources.Add(new JuncWorkshopResource
            {
                WorkShopId = model.WorkshopId,
                ResourceId = resource.Id,
            });

            // Save the data
            var result = await _context.SaveChangesAsync();

            // Check if there is error
            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong. Try again later", Field = "failed" });
            }

            // If there's no error occured
            return Ok(new Response { Status = "Success", Message = "Resource added to workshop succesfully", });

        }

    }
}