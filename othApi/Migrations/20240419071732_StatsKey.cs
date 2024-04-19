using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace othApi.Migrations
{
    /// <inheritdoc />
    public partial class StatsKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Stats",
                table: "Stats");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Stats",
                table: "Stats",
                columns: new[] { "MapId", "PlayerId", "RoundId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Stats",
                table: "Stats");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Stats",
                table: "Stats",
                columns: new[] { "MapId", "PlayerId" });
        }
    }
}
