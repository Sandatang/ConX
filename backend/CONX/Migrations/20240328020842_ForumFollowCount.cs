using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CONX.Migrations
{
    public partial class ForumFollowCount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FollowCount",
                table: "Forums",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FollowCount",
                table: "Forums");
        }
    }
}
