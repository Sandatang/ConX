using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CONX.Migrations
{
    public partial class ChangeFKofForumThreadName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ForumThreads_Threads_PostId",
                table: "ForumThreads");

            migrationBuilder.DropIndex(
                name: "IX_ForumThreads_PostId",
                table: "ForumThreads");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "ForumThreads");

            migrationBuilder.RenameColumn(
                name: "PostingsId",
                table: "ForumThreads",
                newName: "ThreadId");

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreads_ThreadId",
                table: "ForumThreads",
                column: "ThreadId");

            migrationBuilder.AddForeignKey(
                name: "FK_ForumThreads_Threads_ThreadId",
                table: "ForumThreads",
                column: "ThreadId",
                principalTable: "Threads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ForumThreads_Threads_ThreadId",
                table: "ForumThreads");

            migrationBuilder.DropIndex(
                name: "IX_ForumThreads_ThreadId",
                table: "ForumThreads");

            migrationBuilder.RenameColumn(
                name: "ThreadId",
                table: "ForumThreads",
                newName: "PostingsId");

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "ForumThreads",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreads_PostId",
                table: "ForumThreads",
                column: "PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_ForumThreads_Threads_PostId",
                table: "ForumThreads",
                column: "PostId",
                principalTable: "Threads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
