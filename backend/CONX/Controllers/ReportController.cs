using CONX.Models.ReportViewModel;
using CONX.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CONX.Models.BulletinViewModel;

namespace CONX.Controllers
{
    [ApiController]
    [Route("bugReport")]
    public class ReportController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly string _uploadPath;

        public ReportController(UserManager<IdentityUser> userManager, ApplicationDbContext context)
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
        //REPORT CONTROLLER

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddReport([FromForm] AddReport addReport)
        {


            // Check if user is null 
            var user = await _userManager.FindByIdAsync(addReport.UserId);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new Response { Status = "Error", Message = " User not exist", Field = "failed" });
            }


            // Create new Postings
            var report = new Models.Report
            {
                UserId = addReport.UserId,
                Content = addReport.Content,
            };

            if (addReport.Image != null)
            {
                //process File and copy to path
                if (addReport.Image == null && addReport.Image.Length <= 0)
                {
                    return StatusCode(StatusCodes.Status404NotFound,
                     new Response { Status = "Error", Message = "Uploaded image is corrupted", Field = "failed" });

                }
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(addReport.Image.FileName);
                var filePath = Path.Combine(_uploadPath, fileName); // Specify your file upload path
                report.ImageUrl = fileName;

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await addReport.Image.CopyToAsync(fileStream);
                }



            }

            // Que data to be inserted in Db
            _context.Reports.Add(report);

            // Save the data
            var result = await _context.SaveChangesAsync();

            // Check if there is error
            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = " Something went wrong. Try again later", Field = "failed" });
            }

            // If there's no error occured
            return Ok(new Response { Status = "Success", Message = "Thank you for reporting. We will look into it", });

        }

        [HttpDelete]
        [Route("delete/{reportId}")]
        public async Task<IActionResult> DeleteReport(string reportId)
        {
            var convertedId = Int32.Parse(reportId);

            var report = await _context.Reports.FindAsync(convertedId);
            if(report == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                   new Response { Status = "Error", Message = " Bug Report not exist", Field = "failed" });
            }

            _context.Reports.Remove(report);
            var result = await _context.SaveChangesAsync();

            if(result <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                                new Response { Status = "Error", Message = " Something went wrong, Updates not push through", Field = "failed" });
            }
            return Ok(new Response { Status = "Success", Message = "Bug Report was removed" });
        }

        [HttpGet]
        [Route("view")]
        public async Task<IActionResult> ViewAllReport()
        {
            var reports = await _context.Reports
                                                .Include(rp => rp.User)
                                                .Select(us => new
                                                {
                                                    id = us.Id,
                                                    FullName = us.User.Firstname + " " + us.User.Lastname,
                                                    Content = us.Content,
                                                    ImgUrl = us.ImageUrl,
                                                }).ToListAsync();

            return Ok(reports);
        }
    }
}
