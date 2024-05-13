using CONX.Models;
using CONX.Models.TrainingViewModels;
using ConXUser.Management.Service.Model;
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
        private readonly IEmailServices _emailService;
        private readonly ApplicationDbContext _context;

        public TrainingController(UserManager<IdentityUser> userManager, IConfiguration configuration, IEmailServices emailService, ApplicationDbContext context)
        {
            _userManager = userManager;
            _configuration = configuration;
            _emailService = emailService;
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

        [HttpGet]
        [Route("getOne/{id}")]
        public async Task<IActionResult> GetOneTraining(string id)
        {
            var training = await _context.Trainings.FindAsync(Int32.Parse(id));
            if (training == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                     new Response { Status = "Error", Message = "Training not exist", Field = "failed" });
            }

            return Ok(training);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteTraining(string id)
        {
            var training = await _context.Trainings.FindAsync(Int32.Parse(id));
            if (training == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                     new Response { Status = "Error", Message = "Training not exist", Field = "failed" });
            }

            _context.Trainings.Remove(training);

            var result = await _context.SaveChangesAsync();

            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   new Response { Status = "Error", Message = "Something went wrong try again later", Field = "failed" });
            }
            return Ok(new Response { Status = "Success", Message = "Training removed successfully"});
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterTraining([FromBody] RegisterTraining registerTraining)
        {
            var training = await _context.Trainings.FindAsync(registerTraining.TrainingId);
            if(training == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                     new Response { Status = "Error", Message = "Training not exist", Field = "failed" });
            }

            var user = await _userManager.FindByIdAsync(registerTraining.UserId);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = "User not exist", Field = "failed" });
            }

            var regTraining = new TrainingRegistration
            {
                UserId = registerTraining.UserId,
                TrainingId = registerTraining.TrainingId,
                Email = registerTraining.Email,
                ContactNo  = registerTraining.ContactNo,
            };

            _context.TrainingRegistrations.Add(regTraining);
            var result = await _context.SaveChangesAsync();

            if(result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   new Response { Status = "Error", Message = "Something went wrong try again later", Field = "failed" });
            }

            var messageContent = $"Thank you for registering for {training.TrainingName}!";
            var message = new Message(new string[] { registerTraining.Email! }, "Event Registration Confirmation", messageContent);
            _emailService.SendEmail(message);

            return Ok(new Response { Status = "Success", Message = "Thank you for registering. Check your email for details" }); 
        }

        [HttpGet]
        [Route("getRegistered")]
        public async Task<IActionResult> GetAllRegistered()
        {
            var registered = await _context.TrainingRegistrations
                                                                .Include(tr => tr.User) 
                                                                .Include(tr => tr.Training) 
                                                                .Select(tr => new
                                                                {
                                                                    UserId = tr.UserId,
                                                                    UserFirstname = tr.User.Firstname,
                                                                    UserMiddlename = tr.User.Middlename,
                                                                    UserLastname = tr.User.Lastname,
                                                                    TrainingId = tr.TrainingId,
                                                                    TrainingTitle = tr.Training.TrainingName,
                                                                    TrainingDescription = tr.Training.TrainingDescription,
                                                                })
                                                                .ToListAsync();
            return Ok(registered);
        }
    }
}
