using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CONX.Migrations
{
    public partial class AddedChangeColNameThreadModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Threads_AspNetUsers_PosterId",
                table: "Threads");

            migrationBuilder.RenameColumn(
                name: "PosterId",
                table: "Threads",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Threads_PosterId",
                table: "Threads",
                newName: "IX_Threads_UserId");

            migrationBuilder.AddColumn<bool>(
                name: "isOpen",
                table: "Threads",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_AspNetUsers_UserId",
                table: "Threads",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Threads_AspNetUsers_UserId",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "isOpen",
                table: "Threads");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Threads",
                newName: "PosterId");

            migrationBuilder.RenameIndex(
                name: "IX_Threads_UserId",
                table: "Threads",
                newName: "IX_Threads_PosterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_AspNetUsers_PosterId",
                table: "Threads",
                column: "PosterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
