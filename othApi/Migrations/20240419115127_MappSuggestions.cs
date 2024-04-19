using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace othApi.Migrations
{
    /// <inheritdoc />
    public partial class MappSuggestions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "TMap",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RoundId1",
                table: "TMap",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TMap_RoundId1",
                table: "TMap",
                column: "RoundId1");

            migrationBuilder.AddForeignKey(
                name: "FK_TMap_Round_RoundId1",
                table: "TMap",
                column: "RoundId1",
                principalTable: "Round",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TMap_Round_RoundId1",
                table: "TMap");

            migrationBuilder.DropIndex(
                name: "IX_TMap_RoundId1",
                table: "TMap");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "TMap");

            migrationBuilder.DropColumn(
                name: "RoundId1",
                table: "TMap");
        }
    }
}
