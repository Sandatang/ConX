using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CONX.Models
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Forum> Forums { get; set; }
        public DbSet<Thread> Threads { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Jobs> Jobs { get; set; }
        public DbSet<BulletinPost> BulletinPost {  get; set; }
        public DbSet<Connectivity> Connectivitys { get; set; }
        public DbSet<Testimony> Testimonials { get; set; }
        public DbSet<Resource> EmpResources {  get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<LoginLog> LoginLogs { get; set; }
        public DbSet<Workshop> Workshops { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<TrainingRegistration> TrainingRegistrations { get; set; }
        public DbSet<JuncWorkshopResource> WorkshopResources { get; set; }
        public DbSet<JuncForumThread> ForumThreads { get; set; }
        public DbSet<JuncThreadComment> ThreadComments { get; set; }
        public DbSet<JuncForumFollows> ForumFollows { get; set; }
        public DbSet<BulletinPostComment> BulletinComments { get; set; }
        public DbSet<AccountDeactivationLog> DeactivationLogs { get; set; }

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
