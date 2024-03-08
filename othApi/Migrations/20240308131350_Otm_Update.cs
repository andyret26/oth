using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace othApi.Migrations
{
    /// <inheritdoc />
    public partial class Otm_Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OtmTournamentStaff_OtmTournaments_HostedTournamentsId",
                table: "OtmTournamentStaff");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OtmTournamentStaff",
                table: "OtmTournamentStaff");

            migrationBuilder.DropIndex(
                name: "IX_OtmTournamentStaff_StaffId",
                table: "OtmTournamentStaff");

            migrationBuilder.RenameColumn(
                name: "HostedTournamentsId",
                table: "OtmTournamentStaff",
                newName: "TournamentsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OtmTournamentStaff",
                table: "OtmTournamentStaff",
                columns: new[] { "StaffId", "TournamentsId" });

            migrationBuilder.CreateIndex(
                name: "IX_OtmTournamentStaff_TournamentsId",
                table: "OtmTournamentStaff",
                column: "TournamentsId");

            migrationBuilder.AddForeignKey(
                name: "FK_OtmTournamentStaff_OtmTournaments_TournamentsId",
                table: "OtmTournamentStaff",
                column: "TournamentsId",
                principalTable: "OtmTournaments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OtmTournamentStaff_OtmTournaments_TournamentsId",
                table: "OtmTournamentStaff");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OtmTournamentStaff",
                table: "OtmTournamentStaff");

            migrationBuilder.DropIndex(
                name: "IX_OtmTournamentStaff_TournamentsId",
                table: "OtmTournamentStaff");

            migrationBuilder.RenameColumn(
                name: "TournamentsId",
                table: "OtmTournamentStaff",
                newName: "HostedTournamentsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OtmTournamentStaff",
                table: "OtmTournamentStaff",
                columns: new[] { "HostedTournamentsId", "StaffId" });

            migrationBuilder.CreateIndex(
                name: "IX_OtmTournamentStaff_StaffId",
                table: "OtmTournamentStaff",
                column: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_OtmTournamentStaff_OtmTournaments_HostedTournamentsId",
                table: "OtmTournamentStaff",
                column: "HostedTournamentsId",
                principalTable: "OtmTournaments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
