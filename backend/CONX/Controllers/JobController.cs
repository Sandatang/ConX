﻿using CONX.Models;
using CONX.Models.JobViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet]
        [Route("view-all")]
        public async Task<IActionResult> ViewAllJobs()
        {
            var job = await _context.Jobs
                    .Include(x => x.User)
                    .Select(x => new
                    {
                        Id = x.Id,
                        UserId = x.UserId,
                        User = $"{x.User.Firstname} {x.User.Firstname}",
                        JobTitle = x.JobTitle,
                        JobDescription = x.JobDescription,
                        ContactPerson = x.ContactPerson,
                        ContactNumber = x.ContactNumber,
                        DateCreated = x.Created,
                        isClose = x.isActive,
                    })
                    .ToListAsync();

            if(job == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,
                 new Response { Status = "Error", Message = " No Jobs yet", Field = "failed" });
            }

            return Ok(job);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateJob([FromBody] UpdateJob updateJob)
        {
            var job = await _context.Jobs.FindAsync(updateJob.JobId);
            
            if(job == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                 new Response { Status = "Error", Message = " Job not exist", Field = "failed" });
            }

            job.JobTitle = updateJob.JobTitle;
            job.JobDescription = updateJob.JobDescription;
            job.ContactPerson = updateJob.ContactPerson;
            job.ContactNumber = updateJob.ContactNumber;

            // Save the data
            var result = await _context.SaveChangesAsync();

            if(result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                 new Response { Status = "Error", Message = " Something went wrong, Updates not push through", Field = "failed" });
            }

            return Ok("Job updated");
        }

        [HttpDelete]
        [Route("delete/{jobId}")]
        public async Task<IActionResult> DeleteJob(string jobId)
        {
            var convertedId = Int32.Parse(jobId);
            // Find the job
            var job = await _context.Jobs.FindAsync(convertedId);

            if(job == null)
            {
                return NotFound( new Response { Status = "Error", Message = " Job not exist ", Field = "failed"  });
            }

            // Que the query for removing
            _context.Jobs.Remove(job);
            // Save the data
            var result = await _context.SaveChangesAsync();

            if( result <= 0 )
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                 new Response { Status = "Error", Message = " Something went wrong, Updates not push through", Field = "failed" });
            }

            return Ok("Deleted successfully");
        }
    }
}
