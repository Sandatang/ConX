using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CONX.Models
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Forum> Forums { get; set; }
        public DbSet<Postings> ForumPostings { get; set; }
        public DbSet<ForumPost> ForumPosts { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //SeedRoles(builder);
        }

        //private void SeedRoles(ModelBuilder builder)
        //{
        //    builder.Entity<IdentityRole>().HasData(
        //            new IdentityRole() { Name = "Personnel", ConcurrencyStamp = "1", NormalizedName = "personnel" },
        //            new IdentityRole() { Name = "Women", ConcurrencyStamp = "2", NormalizedName = "women" },
        //            new IdentityRole() { Name = "Admin", ConcurrencyStamp = "0", NormalizedName = "admin" }
        //        );
        //}
    }
}
