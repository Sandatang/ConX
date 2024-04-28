using CONX.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CONX.Models.WorkshopViewModel;
using Microsoft.EntityFrameworkCore;


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
        [Route("addCategory")]
        public async Task<IActionResult> AddCategory([FromBody] AddCategory model)
        {
            var check = !string.IsNullOrWhiteSpace(model.CategoryName) && !model.CategoryName.All(char.IsWhiteSpace);
            if (!check)
            {
                return BadRequest(new Response { Status = "Error", Message = "CategoryName is invalid or consists of only spaces" });
            }

            var category = new Category
            {
                CategoryName = model.CategoryName,
            };


            //Que data to add in Category table
            _context.Category.Add(category);
            //Save data to Database
            var catResult = await _context.SaveChangesAsync();

            if (catResult <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                 new Response { Status = "Error", Message = " Something went wrong, Try again later", Field = "failed" });
            }
            // If there's no error occured
            return Ok(new Response { Status = "Success", Message = "Category added succesfully", });

        }

        [HttpGet]
        [Route("category/viewAll")]
        public async Task<IActionResult> GetAllCategory()
        {
            var category = await _context.Category.ToListAsync();

            if(category == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                 new Response { Status = "Success", Message = "No category been made yet"});
            }

            return Ok(category);
        }

        [HttpDelete]
        [Route("category/delete/{categoryId}")]
        public async Task<IActionResult> DeleteCategory(string categoryId)
        {
            var convertedId = Int32.Parse(categoryId);
            var category = await _context.Category.FindAsync(convertedId);

            if (category == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                new Response { Status = "Error", Message = " Category not exist", Field = "failed" });
            }

            var workshop = await _context.Workshops.Where(ws => ws.CategoryId == category.Id).ToListAsync();

            if(workshop.Count() > 0)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                new Response { Status = "Error", Message = "Delete the workshops first, before deleting the category", Field = "failed" });
            }


            _context.Category.RemoveRange(category);
            var result = await _context.SaveChangesAsync();
            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                 new Response { Status = "Error", Message = " Something went wrong, Updates not push through", Field = "failed" });
            }
            return Ok(new Response { Status = "Success", Message = "Category deleted successfully" });
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
                CategoryId = model.CategoryId



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

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateWorkshop([FromBody] UpdateWorkshop model)
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
                    new Response { Status = "Error", Message = "User not found", Field = "failed" });
            }


            // Create new Postings
            workshop.WorkshopTitle = model.WorkshopTitle;
            workshop.Description = model.Description;
            workshop.CreatorId = model.CreatorId;
            workshop.Tags = model.Tags;
            workshop.CategoryId = model.CategoryId;

            // Que data to be inserted in Db
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
            return Ok(new Response { Status = "Success", Message = "Workshop updated succesfully", });

        }

        [HttpGet]
        [Route("view/{category}")]
        public async Task<IActionResult> ViewWorkshopLivelihood(string category)
        {
            var wp = await _context.Workshops.
                                              Where(w => w.CategoryId == Int32.Parse(category))
                                              .ToListAsync();

            return Ok(wp);
        }

        [HttpDelete]
        [Route("delete/{workshopId}")]
        public async Task<IActionResult> DeleteWorkshop(string workshopId)
        {
            var convertedId = Int32.Parse(workshopId);
            // Find the job
            var workshop = await _context.Workshops.FindAsync(convertedId);
            if (workshop == null)
            {
                return NotFound(new Response { Status = "Error", Message = " Workshop not exist ", Field = "failed" });

            }
            var juncWorkshopResource = await _context.WorkshopResources.Where(wp => wp.WorkShopId == workshop.WorkshopId).ToListAsync();


            _context.WorkshopResources.RemoveRange(juncWorkshopResource);
            var bullComResult = await _context.SaveChangesAsync();


            _context.Workshops.Remove(workshop);
            var result = await _context.SaveChangesAsync();
            if (result <= 0)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                 new Response { Status = "Error", Message = " Something went wrong, Updates not push through", Field = "failed" });
            }
            return Ok(new Response { Status = "Success", Message = "Workshop deleted successfully" });
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
            workshop.CategoryId = Int32.Parse(model.CategoryId);





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
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.Video.FileName);
            var filePath = Path.Combine(_uploadPath, fileName); // Specify your file upload path

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await model.Video.CopyToAsync(fileStream);
            }

            // Create new Postings
            var resource = new Resource
            {
                VideoTitle = model.VideoTitle,
                VideoDescription = model.VideoDescription,
                UploaderId = model.UploaderId,
                VideoUrl = fileName,
            };
            

            _context.EmpResources.Add(resource);
            var resourcesResult = await _context.SaveChangesAsync();

            if (resourcesResult <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong. Try again later", Field = "failed" });
            }

            //process File and copy to path
            if (model.Video == null && model.Video.Length <= 0)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                 new Response { Status = "Error", Message = "Uploaded image is corrupted", Field = "failed" });

            }
            

            // Que data to be inserted in Db
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

        [HttpGet]
        [Route("resource/{workshopId}")]
        public async Task<IActionResult> ViewThread(string workshopId)
        {
            var convertedId = Int32.Parse(workshopId);
            var postings = await _context.WorkshopResources
                                    .Where(x => x.WorkShopId == convertedId)
                                    .Select(x => new
                                    {
                                        workshopId = x.WorkShopId,
                                        userId = x.Resource.Uploader.Id,
                                        videoTtile = x.Resource.VideoTitle,
                                        videoDescription = x.Resource.VideoDescription,
                                        videoUrl = x.Resource.VideoUrl,

                                    }).ToListAsync();

            if (postings.Count == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " Workshop not exist", Field = "failed" });
            }

            return Ok(postings);
        }
    }
}