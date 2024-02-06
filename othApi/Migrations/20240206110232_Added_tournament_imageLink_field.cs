using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace othApi.Migrations
{
    /// <inheritdoc />
    public partial class Added_tournament_imageLink_field : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageLink",
                table: "Tournaments",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageLink",
                table: "Tournaments");
        }
    }
}
