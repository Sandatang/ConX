using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CONX.Migrations
{
    public partial class UserIsDeleted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "AspNetUsers",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DeactivationLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeactivatedAccountId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeactivatedAccountName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeactReason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeactivatorId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeactivatorName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeactivationLogs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeactivationLogs");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "AspNetUsers");
        }
    }
}
