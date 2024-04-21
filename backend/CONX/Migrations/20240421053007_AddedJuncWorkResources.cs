using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CONX.Migrations
{
    public partial class AddedJuncWorkResources : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WorkshopResources",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkShopId = table.Column<int>(type: "int", nullable: false),
                    ResourceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkshopResources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkshopResources_EmpResources_ResourceId",
                        column: x => x.ResourceId,
                        principalTable: "EmpResources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkshopResources_Workshops_WorkShopId",
                        column: x => x.WorkShopId,
                        principalTable: "Workshops",
                        principalColumn: "WorkshopId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkshopResources_ResourceId",
                table: "WorkshopResources",
                column: "ResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkshopResources_WorkShopId",
                table: "WorkshopResources",
                column: "WorkShopId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkshopResources");
        }
    }
}
