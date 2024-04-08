using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace othApi.Migrations
{
    /// <inheritdoc />
    public partial class Updated_hosted_tournamt_entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Format",
                table: "OtmTournaments",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsTeamTourney",
                table: "OtmTournaments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "MaxTeamSize",
                table: "OtmTournaments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "RankRange",
                table: "OtmTournaments",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Format",
                table: "OtmTournaments");

            migrationBuilder.DropColumn(
                name: "IsTeamTourney",
                table: "OtmTournaments");

            migrationBuilder.DropColumn(
                name: "MaxTeamSize",
                table: "OtmTournaments");

            migrationBuilder.DropColumn(
                name: "RankRange",
                table: "OtmTournaments");
        }
    }
}
