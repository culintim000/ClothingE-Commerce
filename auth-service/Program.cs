using Microsoft.EntityFrameworkCore;
using Steeltoe.Discovery.Client;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<UserDb>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("docker_db")));
builder.Services.AddDiscoveryClient(builder.Configuration); // for eureka

var app = builder.Build();
app.MapControllers();


app.Run();
