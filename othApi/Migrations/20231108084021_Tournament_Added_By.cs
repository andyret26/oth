using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace othApi.Migrations
{
    /// <inheritdoc />
    public partial class Tournament_Added_By : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Tournaments_AddedById",
                table: "Tournaments",
                column: "AddedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_Players_AddedById",
                table: "Tournaments",
                column: "AddedById",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_Players_AddedById",
                table: "Tournaments");

            migrationBuilder.DropIndex(
                name: "IX_Tournaments_AddedById",
                table: "Tournaments");
        }
    }
}
