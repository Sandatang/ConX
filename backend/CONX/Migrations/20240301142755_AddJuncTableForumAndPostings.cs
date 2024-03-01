using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CONX.Migrations
{
    public partial class AddJuncTableForumAndPostings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PosterId",
                table: "ForumPostings",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_ForumPostings_PosterId",
                table: "ForumPostings",
                column: "PosterId");

            migrationBuilder.AddForeignKey(
                name: "FK_ForumPostings_AspNetUsers_PosterId",
                table: "ForumPostings",
                column: "PosterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ForumPostings_AspNetUsers_PosterId",
                table: "ForumPostings");

            migrationBuilder.DropIndex(
                name: "IX_ForumPostings_PosterId",
                table: "ForumPostings");

            migrationBuilder.AlterColumn<string>(
                name: "PosterId",
                table: "ForumPostings",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
