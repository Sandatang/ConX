using Microsoft.AspNetCore.Mvc;

namespace CONX.Controllers
{
    [ApiController]
    [Route("api/video")]
    public class VideoController : Controller
    {
        private readonly string _uploadPath;
        public VideoController()
        {

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

        [HttpGet]
        [Route("name/{videoName}")]
        public IActionResult GetVideo(string videoName)
        {
            try
            {
                var filePath = Path.Combine(_uploadPath, videoName); // Specify your file upload path

                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound();
                }

                var contentType = GetContentType(videoName);
                if (contentType == null)
                {
                    // If the content type cannot be determined, default to "application/octet-stream"
                    contentType = "application/octet-stream";
                }

                // Read the file and return it with the determined content type
                var videoFileStream = System.IO.File.OpenRead(filePath);
                return File(videoFileStream, contentType);

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
                case ".mp4":
                    return "video/mp4";
                case ".webm":
                    return "video/webm";
                case ".ogg":
                    return "video/ogg";
                default:
                    return null; // Unknown content type
            }
        }
    }
}
