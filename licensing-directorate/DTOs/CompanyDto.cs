namespace licensing_directorate.DTOs
{
    public class CompanyDto
    {
        public Guid Id { get; set; }

        public string Code { get; set; }
        public string CompanyName { get; set; }
        //public string TypeOfActivity { get; set; }
        public string LicenceRequestStatus { get; set; }
        public string LicenceStatus { get; set; }
        //public string CommercialRegistrationNo { get; set; }
        //public string? Info { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? ImageUrl { get; set; }
        public double CompanyCapital { get; set; }
    }
}
