using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CONX.Migrations
{
    public partial class ChangeNavigatorToThread : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ThreadComments_ForumThreads_ForumThreadId",
                table: "ThreadComments");

            migrationBuilder.DropIndex(
                name: "IX_ThreadComments_ForumThreadId",
                table: "ThreadComments");

            migrationBuilder.DropColumn(
                name: "ForumThreadId",
                table: "ThreadComments");

            migrationBuilder.CreateIndex(
                name: "IX_ThreadComments_ThreadId",
                table: "ThreadComments",
                column: "ThreadId");

            migrationBuilder.AddForeignKey(
                name: "FK_ThreadComments_Threads_ThreadId",
                table: "ThreadComments",
                column: "ThreadId",
                principalTable: "Threads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ThreadComments_Threads_ThreadId",
                table: "ThreadComments");

            migrationBuilder.DropIndex(
                name: "IX_ThreadComments_ThreadId",
                table: "ThreadComments");

            migrationBuilder.AddColumn<int>(
                name: "ForumThreadId",
                table: "ThreadComments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ThreadComments_ForumThreadId",
                table: "ThreadComments",
                column: "ForumThreadId");

            migrationBuilder.AddForeignKey(
                name: "FK_ThreadComments_ForumThreads_ForumThreadId",
                table: "ThreadComments",
                column: "ForumThreadId",
                principalTable: "ForumThreads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
