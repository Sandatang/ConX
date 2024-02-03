using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CONX.Models
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            SeedRoles(builder);
        }

        private void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData(
                    new IdentityRole() { Name = "Personnel", ConcurrencyStamp = "1", NormalizedName = "Personnel" },
                    new IdentityRole() { Name = "Women", ConcurrencyStamp = "2", NormalizedName = "Women" },
                    new IdentityRole() { Name = "Admin", ConcurrencyStamp = "0", NormalizedName = "Admin" }
                );
        }
    }
}
