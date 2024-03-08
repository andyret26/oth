using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace othApi.Migrations
{
    /// <inheritdoc />
    public partial class Otm_table_rename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TournamentPlayer_OtmTournaments_OtmTournamentsId",
                table: "TournamentPlayer");

            migrationBuilder.DropForeignKey(
                name: "FK_TournamentPlayer_Players_PlayersId",
                table: "TournamentPlayer");

            migrationBuilder.DropForeignKey(
                name: "FK_TournamentStaff_OtmStaff_StaffId",
                table: "TournamentStaff");

            migrationBuilder.DropForeignKey(
                name: "FK_TournamentStaff_OtmTournaments_HostedTournamentsId",
                table: "TournamentStaff");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TournamentStaff",
                table: "TournamentStaff");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TournamentPlayer",
                table: "TournamentPlayer");

            migrationBuilder.RenameTable(
                name: "TournamentStaff",
                newName: "OtmTournamentStaff");

            migrationBuilder.RenameTable(
                name: "TournamentPlayer",
                newName: "OtmTournamentPlayer");

            migrationBuilder.RenameIndex(
                name: "IX_TournamentStaff_StaffId",
                table: "OtmTournamentStaff",
                newName: "IX_OtmTournamentStaff_StaffId");

            migrationBuilder.RenameIndex(
                name: "IX_TournamentPlayer_PlayersId",
                table: "OtmTournamentPlayer",
                newName: "IX_OtmTournamentPlayer_PlayersId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OtmTournamentStaff",
                table: "OtmTournamentStaff",
                columns: new[] { "HostedTournamentsId", "StaffId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_OtmTournamentPlayer",
                table: "OtmTournamentPlayer",
                columns: new[] { "OtmTournamentsId", "PlayersId" });

            migrationBuilder.AddForeignKey(
                name: "FK_OtmTournamentPlayer_OtmTournaments_OtmTournamentsId",
                table: "OtmTournamentPlayer",
                column: "OtmTournamentsId",
                principalTable: "OtmTournaments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OtmTournamentPlayer_Players_PlayersId",
                table: "OtmTournamentPlayer",
                column: "PlayersId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OtmTournamentStaff_OtmStaff_StaffId",
                table: "OtmTournamentStaff",
                column: "StaffId",
                principalTable: "OtmStaff",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OtmTournamentStaff_OtmTournaments_HostedTournamentsId",
                table: "OtmTournamentStaff",
                column: "HostedTournamentsId",
                principalTable: "OtmTournaments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OtmTournamentPlayer_OtmTournaments_OtmTournamentsId",
                table: "OtmTournamentPlayer");

            migrationBuilder.DropForeignKey(
                name: "FK_OtmTournamentPlayer_Players_PlayersId",
                table: "OtmTournamentPlayer");

            migrationBuilder.DropForeignKey(
                name: "FK_OtmTournamentStaff_OtmStaff_StaffId",
                table: "OtmTournamentStaff");

            migrationBuilder.DropForeignKey(
                name: "FK_OtmTournamentStaff_OtmTournaments_HostedTournamentsId",
                table: "OtmTournamentStaff");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OtmTournamentStaff",
                table: "OtmTournamentStaff");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OtmTournamentPlayer",
                table: "OtmTournamentPlayer");

            migrationBuilder.RenameTable(
                name: "OtmTournamentStaff",
                newName: "TournamentStaff");

            migrationBuilder.RenameTable(
                name: "OtmTournamentPlayer",
                newName: "TournamentPlayer");

            migrationBuilder.RenameIndex(
                name: "IX_OtmTournamentStaff_StaffId",
                table: "TournamentStaff",
                newName: "IX_TournamentStaff_StaffId");

            migrationBuilder.RenameIndex(
                name: "IX_OtmTournamentPlayer_PlayersId",
                table: "TournamentPlayer",
                newName: "IX_TournamentPlayer_PlayersId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TournamentStaff",
                table: "TournamentStaff",
                columns: new[] { "HostedTournamentsId", "StaffId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_TournamentPlayer",
                table: "TournamentPlayer",
                columns: new[] { "OtmTournamentsId", "PlayersId" });

            migrationBuilder.AddForeignKey(
                name: "FK_TournamentPlayer_OtmTournaments_OtmTournamentsId",
                table: "TournamentPlayer",
                column: "OtmTournamentsId",
                principalTable: "OtmTournaments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TournamentPlayer_Players_PlayersId",
                table: "TournamentPlayer",
                column: "PlayersId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TournamentStaff_OtmStaff_StaffId",
                table: "TournamentStaff",
                column: "StaffId",
                principalTable: "OtmStaff",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TournamentStaff_OtmTournaments_HostedTournamentsId",
                table: "TournamentStaff",
                column: "HostedTournamentsId",
                principalTable: "OtmTournaments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
