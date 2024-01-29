using System.ComponentModel.DataAnnotations;

namespace licensing_directorate.Models
{
    public class Company : BaseEntity
    {
        [Required]
        public string Code { get; set; } = default!;

        // أسم الشركة
        [Required]
        public string CompanyName { get; set; } = default!;

        // اسم الشركة التجاري القديم
        public string? OldComericalName { get; set; }

        public string? Info { get; set; }

        // شركة/مكتب
        [Required]
        public CompanyType CompanyType { get; set; }

        // أسماء الشركاء والمؤسسين
        public string? NamesOfPartners { get; set; }

        // رقم الهاتف
        public string PhoneNumber { get; set; }

        public string? Address { get; set; }

        //// نوع النشاط
        //[Required]
        //public string TypeOfActivity { get; set; }

        // رقم التسجيل بالسجل التجاري
        [Required]
        public string CommercialRegistrationNo { get; set; }

        // المخالفات و العقوبات 
        public string? ViolationsAndPenalties { get; set; }

        // الموقع الجغرافي
        // public string? GeographicalLocation { get; set; }

        // مسؤول الامتثال
        public string? ComplianceOfficer { get; set; }

        // صور شخصية  
        public string? ImageUrl { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        public DateTime? UpdateDate { get; set; }

        // nav properties
        public LicenceDetails LicenceDetails { get; set; }
        public IList<Branch>? Branches { get; set; }
    }
}
