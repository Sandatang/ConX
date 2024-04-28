using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CONX.Migrations
{
    public partial class AddedCategoryNavigator : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Workshops");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Workshops",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Workshops_CategoryId",
                table: "Workshops",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workshops_Category_CategoryId",
                table: "Workshops",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workshops_Category_CategoryId",
                table: "Workshops");

            migrationBuilder.DropIndex(
                name: "IX_Workshops_CategoryId",
                table: "Workshops");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Workshops");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Workshops",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
