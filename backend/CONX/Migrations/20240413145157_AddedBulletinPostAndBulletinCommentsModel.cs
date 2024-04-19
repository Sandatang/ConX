using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CONX.Migrations
{
    public partial class AddedBulletinPostAndBulletinCommentsModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BulletinPost",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PostTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostBody = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ImgUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BulletinPost", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BulletinPost_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateTable(
                name: "BulletinComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CommentId = table.Column<int>(type: "int", nullable: false),
                    BulletinPostId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BulletinComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BulletinComments_BulletinPost_BulletinPostId",
                        column: x => x.BulletinPostId,
                        principalTable: "BulletinPost",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BulletinComments_Comments_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comments",
                        principalColumn: "CommentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BulletinComments_BulletinPostId",
                table: "BulletinComments",
                column: "BulletinPostId");

            migrationBuilder.CreateIndex(
                name: "IX_BulletinComments_CommentId",
                table: "BulletinComments",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_BulletinPost_UserId",
                table: "BulletinPost",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BulletinComments");

            migrationBuilder.DropTable(
                name: "DeactivationLogs");

            migrationBuilder.DropTable(
                name: "BulletinPost");
        }
    }
}
