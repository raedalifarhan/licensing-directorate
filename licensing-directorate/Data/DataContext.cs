using licensing_directorate.Models;
using Microsoft.EntityFrameworkCore;

namespace licensing_directorate.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Company> Companies { get; set; }
        public DbSet<Branch> Branches { get; set; }

        public DataContext(DbContextOptions options) : base(options)
        {
        }
    }
}
