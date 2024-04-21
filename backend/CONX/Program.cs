using CONX.Models;
using ConXUser.Management.Service.Model;
using ConXUser.Management.Service.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.Features; // Make sure to include this namespace



var builder = WebApplication.CreateBuilder(args);


// For entity framework
builder.Services.AddDbContext<ApplicationDbContext>(options =>

{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    options.EnableSensitiveDataLogging();
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// For Identity
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Adding Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
});

//Email Verification
var emailConfig = builder.Configuration
                                    .GetSection("EmailConfiguration")
                                    .Get<EmailConfiguration>();
builder.Services.AddSingleton(emailConfig);
builder.Services.AddScoped<IEmailServices, EmailService>();


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Increase maximum request size
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 2147483648; // 2 GB in bytes
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var serviceProvider = scope.ServiceProvider;
    var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();


    var roles = new[] { "Admin", "Personnel", "Women" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }

    var defaultUser = await userManager.FindByNameAsync("admin123");
    if (defaultUser == null)
    {   
        defaultUser = new User();
        {

            // Add admin user to DB
            defaultUser.Email = "admin@gmail.com";
            defaultUser.UserName = "admin123";
            defaultUser.EmailConfirmed = true;
        };

        await userManager.CreateAsync(defaultUser, "Admin@1234");
        await userManager.AddToRoleAsync(defaultUser, "Admin");
        //await userManager.CreateAsync(defaultUser, "Admin@1234"); // Set your desired default password

        // Assigning roles to the default user
        //await userManager.AddToRoleAsync(defaultUser, "Admin");
    }


}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); 
}

// Use CORS middleware
app.UseCors("AllowOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
