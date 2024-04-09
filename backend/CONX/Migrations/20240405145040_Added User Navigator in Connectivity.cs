using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CONX.Migrations
{
    public partial class AddedUserNavigatorinConnectivity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Connectivitys",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Connectivitys_UserId",
                table: "Connectivitys",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Connectivitys_AspNetUsers_UserId",
                table: "Connectivitys",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Connectivitys_AspNetUsers_UserId",
                table: "Connectivitys");

            migrationBuilder.DropIndex(
                name: "IX_Connectivitys_UserId",
                table: "Connectivitys");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Connectivitys");
        }
    }
}
