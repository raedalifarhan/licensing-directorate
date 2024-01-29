using ConstrucitonService.Data;
using licensing_directorate.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(opt => {
    opt.UseSqlServer(builder.Configuration.GetConnectionString("def_conn"));
});

builder.Services.AddCors(opt =>
    opt.AddPolicy("CorsPolicy", policy => 
        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000"))
);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.MapControllers();

try
{
    DbInitilizer.InitDb(app);
}
catch (Exception e)
{
    Console.WriteLine(e);
}

app.Run();
