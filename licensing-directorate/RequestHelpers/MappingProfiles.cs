using AutoMapper;
using licensing_directorate.DTOs;
using licensing_directorate.Models;

namespace licensing_directorate.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Company, CompanyDto>()
                .IncludeMembers(x => x.LicenceDetails);
            CreateMap<LicenceDetails, CompanyDto>();

            CreateMap<Company, CompanyDetailsDto>()
                .IncludeMembers(x => x.LicenceDetails);
            CreateMap<LicenceDetails, CompanyDetailsDto>();

            CreateMap<CreateCompanyDto, Company>()
                .ForMember(d => d.LicenceDetails, o => o.MapFrom(s => s));
            CreateMap<CreateCompanyDto, LicenceDetails>();

            CreateMap<UpdateCompanyDto, Company>()
                .ForMember(d => d.LicenceDetails, o => o.MapFrom(s => s));
            CreateMap<UpdateCompanyDto, LicenceDetails>();
        }
    }
}
