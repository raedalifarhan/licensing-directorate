using licensing_directorate.Models;

namespace licensing_directorate.DTOs
{
    public class CompanyDetailsDto
    {
        public Guid Id { get; set; }
        public string Code { get; set; } = default!;
        public string CompanyName { get; set; } = default!;
        public string? OldComericalName { get; set; }
        public string? Info { get; set; }
        public string CompanyType { get; set; }
        public string? NamesOfPartners { get; set; }
        public string PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string CommercialRegistrationNo { get; set; }
        public string? ViolationsAndPenalties { get; set; }
        public string? ComplianceOfficer { get; set; }
        public string? ImageUrl { get; set; }
        public double? ApplicationFee { get; set; }
        public double CompanyCapital { get; set; }
        public double? LicenceFee { get; set; }
        public double? FinancialGuarantee { get; set; }
        public string? Notes { get; set; }
        public string LicenceRequestStatus { get; set; }
        public string LicenceStatus { get; set; }
        public string? LicenceNo { get; set; }
        public string? LicenseFileAttached { get; set; }
        public DateTime? UpdateDate { get; set; }
        public DateTime? DateOfApplication { get; set; }
        public DateTime? LicenceRequestDate { get; set; }
        public DateTime? DateOfPreliminaryApproval { get; set; }
        public DateTime CreateDate { get; set; }

        
    }
}
