using System.ComponentModel.DataAnnotations;

namespace licensing_directorate.Models
{
    public class LicenceDetails : BaseEntity
    {
        // رسوم الطلب
        public double? ApplicationFee { get; set; }

        // رأس المال
        [Required]
        public double CompanyCapital { get; set; } = 0;

        // تاريخ تقديم الطلب
        public DateTime? DateOfApplication { get; set; }

        // رسم الترخيص
        [Required]
        public double? LicenceFee { get; set; }

        // الضمانة المالية
        [Required]
        public double? FinancialGuarantee { get; set; }

        public string? Notes { get; set; }

        // حالة طلب الترخيص
        [Required]
        public string LicenceRequestStatus { get; set; } = "قيد الانجاز";

        // حالة الرخصة 
        [Required]
        public string LicenceStatus { get; set; } = "نشط";

        // تاريخ طلب التراخيص
        public DateTime? LicenceRequestDate { get; set; }

        // تاريخ الحصول على الموافقة المبدئية
        public DateTime? DateOfPreliminaryApproval { get; set; }

        // رقم الترخيص
        public string? LicenceNo { get; set; }

        // مرفق ملف الترخيص
        public string? LicenseFileAttached { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        public DateTime? UpdateDate { get; set; }


        // nav properties
        public Company Company { get; set; }
        public Guid CompanyId { get; set; }
    }
}
