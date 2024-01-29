using System.ComponentModel.DataAnnotations;

namespace licensing_directorate.DTOs
{
    public class UploadFileDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public IFormFile File { get; set; }
    }
}
