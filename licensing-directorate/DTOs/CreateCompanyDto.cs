﻿
namespace licensing_directorate.DTOs
{
    public class CreateCompanyDto
    {
        public string Code { get; set; }
        public string CompanyName { get; set; }
        public string? OldComericalName { get; set; }
        public string PhoneNumber { get; set; }
        public string? Address { get; set; }
        public double ApplicationFee { get; set; }
        public double CompanyCapital { get; set; }
        public double LicenceFee { get; set; }
        public double FinancialGuarantee { get; set; }
        public string? Notes { get; set; }
        public string CommercialRegistrationNo { get; set; }
        public string? LicenceNo { get; set; }
        public DateTime DateOfApplication { get; set; }
        public DateTime? LicenceRequestDate { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? DateOfPreliminaryApproval { get; set; }
        public string? ViolationsAndPenalties { get; set; }
        public string? ComplianceOfficer { get; set; }
    }
}
