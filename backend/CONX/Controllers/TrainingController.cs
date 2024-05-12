using CONX.Models;
using CONX.Models.TrainingViewModels;
using ConXUser.Management.Service.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CONX.Controllers
{
    [Route("training")]
    [ApiController]
    public class TrainingController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public TrainingController(UserManager<IdentityUser> userManager, IConfiguration configuration, ApplicationDbContext context)
        {
            _userManager = userManager;
            _configuration = configuration;
            _context = context;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddTraining([FromBody] AddTraining addTraining)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var training = new Training
            {
                TrainingName = addTraining.TrainingName,
                TrainingDescription = addTraining.TrainingDescription,
                Venue = addTraining.Venue,
                DateEnd = addTraining.DateEnd,
                DateStarted = addTraining.DateStarted,
            };

            _context.Trainings.Add(training);
            var result = await _context.SaveChangesAsync();

            if(result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                     new Response { Status = "Error", Message = " Something went wrong, Try again later", Field = "failed" });
            }

            return Ok(new Response { Status = "Success", Message = "Training added successfully" });
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> EditTraining([FromBody] UpdateTraining updateTraining)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var training = await _context.Trainings.FindAsync(updateTraining.TrainingId);

            if (training == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                     new Response { Status = "Error", Message = "Training not exist", Field = "failed" });
            }

            training.TrainingDescription = updateTraining.TrainingDescription;
            training.TrainingName = updateTraining.TrainingName;
            training.DateEnd = updateTraining.DateEnd;
            training.DateStarted = updateTraining.DateStarted;
            training.Venue = updateTraining.Venue;

            _context.Trainings.Update(training);
            var result = await _context.SaveChangesAsync();

            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                     new Response { Status = "Error", Message = " Something went wrong, Try again later", Field = "failed" });
            }

            return Ok(new Response { Status = "Success", Message = "Training updated successfully" });
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<IActionResult> GetAll()
        {
            var trainings = await _context.Trainings.ToListAsync();

            return Ok(trainings);
        }
    }
}
