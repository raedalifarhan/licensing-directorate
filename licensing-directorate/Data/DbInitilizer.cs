using licensing_directorate.Data;
using Microsoft.EntityFrameworkCore;

namespace ConstrucitonService.Data
{
    public class DbInitilizer
    {
        public static void InitDb(WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            
            SeedData(scope.ServiceProvider.GetService<DataContext>()!);
        }

        private static void SeedData(DataContext context)
        {
            context.Database.Migrate();
        }
    }
}