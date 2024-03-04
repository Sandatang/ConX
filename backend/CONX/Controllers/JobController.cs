using CONX.Models;
using CONX.Models.JobViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CONX.Controllers
{

    [Route("api/job")]
    [ApiController]
    public class JobController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;

        public JobController(UserManager<IdentityUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddJob([FromBody] AddJobs addJobs)
        {

            if (!ModelState.IsValid)
            {
                // Model validation failed
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return StatusCode(StatusCodes.Status400BadRequest,
                    new Response { Status = "Error", Message = "Validation failed", Field = "failed" });
            }

            var user = await _userManager.FindByIdAsync(addJobs.UserId);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = " User not exist ", Field = "failed" });
            }

            var job = new Jobs
            {
                UserId = addJobs.UserId,
                JobTitle = addJobs.JobTitle,
                JobDescription = addJobs.JobDescription,
                ContactNumber = addJobs.ContactNumber,
                ContactPerson = addJobs.ContactPerson,
                Created = DateTime.Now,

            };

            //Que data to add in Comments table
            _context.Jobs.Add(job);
            //Save data to Database
            var jobResult = await _context.SaveChangesAsync();

            if(jobResult <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                 new Response { Status = "Error", Message = " Something went wrong, Try again later", Field = "failed" });
            }

            return Ok("Job added successfully");

        }
    }
}
