using AutoMapper;
using AutoMapper.QueryableExtensions;
using licensing_directorate.Data;
using licensing_directorate.DTOs;
using licensing_directorate.Models;
using licensing_directorate.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace licensing_directorate.Controllers
{
    [ApiController]
    [Route("api/companies")]
    public class CompaniesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CompaniesController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCompanies([FromQuery] CompanyParams? param)
        {
            var query = _context.Companies
                .Include(x => x.LicenceDetails)
                .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            if (!string.IsNullOrEmpty(param?.searchTerm))
            {
                query = query.Where(x => x.Code.Contains(param.searchTerm) || x.CompanyName.Contains(param.searchTerm));
            }

            return Ok(await PagedList<CompanyDto>.CreateAsync(query, param!.PageNumber , param.PageSize));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyDetailsDto>> GetCompanyById(Guid id)
        {
            var comp = await _context.Companies
                .Include(x => x.LicenceDetails)
                .ProjectTo<CompanyDetailsDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (comp == null) return NotFound();

            return Ok(comp);
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateCompany([FromBody] CreateCompanyDto createCompanyDto)
        {

            var company = _mapper.Map<Company>(createCompanyDto); 

            _context.Companies.Add(company);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Could not save changes to the DB.");

            return Ok(company.Id);
        }

        [HttpPost("upload")]
        public async Task<ActionResult<string>> UploadFile(UploadFileDto model)
        {
            

            if (model.File == null || model.File.Length == 0) return BadRequest("Invalid file");

            try
            {
                // Get the file extension
                var fileExtension = Path.GetExtension(model.File.FileName);

                var imageExtensions = new string[] { ".jpeg", ".gif", ".png", ".jpg" };

                var attachmentExtensions = new string[] { ".pdf" };

                // Generate a unique file name using the current timestamp and the original file extension
                var sourceFile = DateTime.Now.ToString("yyyyMMddhhmmss") + model.File.FileName;

                var uploadFolder = imageExtensions.Contains(fileExtension)
                    ? "images"
                    : attachmentExtensions.Contains(fileExtension)
                    ? "files" : null;

                if (string.IsNullOrEmpty(uploadFolder)) return BadRequest("File extension not valid");

                // Save the file to the server
                var folderPath = Path.Combine("wwwroot", uploadFolder);
                var filePath = Path.Combine(folderPath, sourceFile);

                // Ensure the directory exists before saving the file
                Directory.CreateDirectory(folderPath);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.File.CopyToAsync(stream);
                }

                var comp = await _context.Companies
                    .Include(x => x.LicenceDetails)
                    .FirstOrDefaultAsync(x => x.Id == model.Id);

                if (comp != null)
                {
                    if (imageExtensions.Contains(fileExtension))
                    {
                        comp.ImageUrl = sourceFile;
                    }
                    else if (attachmentExtensions.Contains(fileExtension))
                    {
                        comp.LicenceDetails.LicenseFileAttached = sourceFile;
                    }

                    await _context.SaveChangesAsync(); // Save changes to the database
                }

                return Ok(sourceFile);

            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to save file to the server: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<string>> UpdateCompany(Guid id, [FromBody] UpdateCompanyDto updateCompanyDto)
        {
            var company = await _context.Companies
                .Include(x => x.LicenceDetails)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (company == null) return NotFound();

            _mapper.Map<UpdateCompanyDto, Company>(updateCompanyDto, company);

            var result = await _context.SaveChangesAsync() > 0;
            
            if (result) return Ok(company.Id);

            return BadRequest("Problem saving changes.");
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(Guid id)
        {
            var company = await _context.Companies.FindAsync(id);

            if (company == null) return NotFound();

            // TODO: check contractor == username.

            _context.Companies.Remove(company);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Could not update DB.");

            return Ok();
        }
    }
}
