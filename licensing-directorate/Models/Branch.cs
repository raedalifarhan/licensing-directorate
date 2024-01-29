using System.ComponentModel.DataAnnotations;

namespace licensing_directorate.Models
{
    public class Branch : BaseEntity
    {
        
        [Required]
        public string Name { get; set; }

        [Required]
        public string Manager { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }


        // nav properties
        public Company? Company { get; set; }
        public Guid? CompanyId { get; set; }

    }
}