using CONX.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CONX.Controllers
{
    [ApiController]
    [Route("api/image")]
    public class ImagesController : Controller
    {

        private readonly string _uploadPath;
        public ImagesController()
        {

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

        [HttpGet]
        [Route("name/{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            try
            {
                var filePath = Path.Combine(_uploadPath, imageName); // Specify your file upload path

                if(!System.IO.File.Exists(filePath))
                {
                    return NotFound();
                }

                var contentType = GetContentType(imageName);
                if (contentType == null)
                {
                    // If the content type cannot be determined, default to "application/octet-stream"
                    contentType = "application/octet-stream";
                }

                // Read the file and return it with the determined content type
                var imageFileStream = System.IO.File.OpenRead(filePath);
                return File(imageFileStream, contentType);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private string GetContentType(string fileName)
        {
            string extension = Path.GetExtension(fileName)?.ToLower();
            switch (extension)
            {
                case ".jpg":
                case ".jpeg":
                    return "image/jpeg";
                case ".png":
                    return "image/png";
                default:
                    return null; // Unknown content type
            }
        }
    }
}
