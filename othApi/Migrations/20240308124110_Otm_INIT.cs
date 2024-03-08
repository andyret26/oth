using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace othApi.Migrations
{
    /// <inheritdoc />
    public partial class Otm_INIT : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OtmHosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtmHosts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OtmStaff",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Roles = table.Column<List<string>>(type: "text[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtmStaff", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OtmTournaments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    FormuPostLink = table.Column<string>(type: "text", nullable: true),
                    HostId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtmTournaments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OtmTournaments_OtmHosts_HostId",
                        column: x => x.HostId,
                        principalTable: "OtmHosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TournamentPlayer",
                columns: table => new
                {
                    OtmTournamentsId = table.Column<int>(type: "integer", nullable: false),
                    PlayersId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TournamentPlayer", x => new { x.OtmTournamentsId, x.PlayersId });
                    table.ForeignKey(
                        name: "FK_TournamentPlayer_OtmTournaments_OtmTournamentsId",
                        column: x => x.OtmTournamentsId,
                        principalTable: "OtmTournaments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TournamentPlayer_Players_PlayersId",
                        column: x => x.PlayersId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TournamentStaff",
                columns: table => new
                {
                    HostedTournamentsId = table.Column<int>(type: "integer", nullable: false),
                    StaffId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TournamentStaff", x => new { x.HostedTournamentsId, x.StaffId });
                    table.ForeignKey(
                        name: "FK_TournamentStaff_OtmStaff_StaffId",
                        column: x => x.StaffId,
                        principalTable: "OtmStaff",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TournamentStaff_OtmTournaments_HostedTournamentsId",
                        column: x => x.HostedTournamentsId,
                        principalTable: "OtmTournaments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OtmTournaments_HostId",
                table: "OtmTournaments",
                column: "HostId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentPlayer_PlayersId",
                table: "TournamentPlayer",
                column: "PlayersId");

            migrationBuilder.CreateIndex(
                name: "IX_TournamentStaff_StaffId",
                table: "TournamentStaff",
                column: "StaffId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TournamentPlayer");

            migrationBuilder.DropTable(
                name: "TournamentStaff");

            migrationBuilder.DropTable(
                name: "OtmStaff");

            migrationBuilder.DropTable(
                name: "OtmTournaments");

            migrationBuilder.DropTable(
                name: "OtmHosts");
        }
    }
}
