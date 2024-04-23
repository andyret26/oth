using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace othApi.Migrations
{
    /// <inheritdoc />
    public partial class Removed_Otm : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OtmTeamPlayer");

            migrationBuilder.DropTable(
                name: "OtmTournamentPlayer");

            migrationBuilder.DropTable(
                name: "OtmTournamentStaff");

            migrationBuilder.DropTable(
                name: "Stats");

            migrationBuilder.DropTable(
                name: "TMapSuggestion");

            migrationBuilder.DropTable(
                name: "Team");

            migrationBuilder.DropTable(
                name: "OtmStaff");

            migrationBuilder.DropTable(
                name: "TMap");

            migrationBuilder.DropTable(
                name: "Round");

            migrationBuilder.DropTable(
                name: "OtmTournaments");

            migrationBuilder.DropTable(
                name: "OtmHosts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    Roles = table.Column<List<string>>(type: "text[]", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false)
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
                    HostId = table.Column<int>(type: "integer", nullable: false),
                    Format = table.Column<string>(type: "text", nullable: false),
                    FormuPostLink = table.Column<string>(type: "text", nullable: true),
                    IsTeamTourney = table.Column<bool>(type: "boolean", nullable: false),
                    MaxTeamSize = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    RankRange = table.Column<string>(type: "text", nullable: false)
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
                name: "OtmTournamentPlayer",
                columns: table => new
                {
                    OtmTournamentsId = table.Column<int>(type: "integer", nullable: false),
                    PlayersId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtmTournamentPlayer", x => new { x.OtmTournamentsId, x.PlayersId });
                    table.ForeignKey(
                        name: "FK_OtmTournamentPlayer_OtmTournaments_OtmTournamentsId",
                        column: x => x.OtmTournamentsId,
                        principalTable: "OtmTournaments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OtmTournamentPlayer_Players_PlayersId",
                        column: x => x.PlayersId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OtmTournamentStaff",
                columns: table => new
                {
                    StaffId = table.Column<int>(type: "integer", nullable: false),
                    TournamentsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtmTournamentStaff", x => new { x.StaffId, x.TournamentsId });
                    table.ForeignKey(
                        name: "FK_OtmTournamentStaff_OtmStaff_StaffId",
                        column: x => x.StaffId,
                        principalTable: "OtmStaff",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OtmTournamentStaff_OtmTournaments_TournamentsId",
                        column: x => x.TournamentsId,
                        principalTable: "OtmTournaments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Round",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HostedTournamentId = table.Column<int>(type: "integer", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Round", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Round_OtmTournaments_HostedTournamentId",
                        column: x => x.HostedTournamentId,
                        principalTable: "OtmTournaments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Team",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HostedTournamentId = table.Column<int>(type: "integer", nullable: true),
                    TeamName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Team", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Team_OtmTournaments_HostedTournamentId",
                        column: x => x.HostedTournamentId,
                        principalTable: "OtmTournaments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TMap",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoundId = table.Column<int>(type: "integer", nullable: false),
                    Ar = table.Column<decimal>(type: "numeric", nullable: false),
                    Bpm = table.Column<int>(type: "integer", nullable: false),
                    Cs = table.Column<decimal>(type: "numeric", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: true),
                    Length = table.Column<decimal>(type: "numeric", nullable: false),
                    Link = table.Column<string>(type: "text", nullable: true),
                    Mapper = table.Column<string>(type: "text", nullable: false),
                    Mod = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    Od = table.Column<decimal>(type: "numeric", nullable: false),
                    OrderNumber = table.Column<int>(type: "integer", nullable: false),
                    Sr = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TMap", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TMap_Round_RoundId",
                        column: x => x.RoundId,
                        principalTable: "Round",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TMapSuggestion",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoundId = table.Column<int>(type: "integer", nullable: false),
                    Ar = table.Column<decimal>(type: "numeric", nullable: false),
                    Bpm = table.Column<int>(type: "integer", nullable: false),
                    Cs = table.Column<decimal>(type: "numeric", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: true),
                    Length = table.Column<decimal>(type: "numeric", nullable: false),
                    Link = table.Column<string>(type: "text", nullable: true),
                    Mapper = table.Column<string>(type: "text", nullable: false),
                    Mod = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    Od = table.Column<decimal>(type: "numeric", nullable: false),
                    OrderNumber = table.Column<int>(type: "integer", nullable: false),
                    Sr = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TMapSuggestion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TMapSuggestion_Round_RoundId",
                        column: x => x.RoundId,
                        principalTable: "Round",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OtmTeamPlayer",
                columns: table => new
                {
                    PlayersId = table.Column<int>(type: "integer", nullable: false),
                    TeamsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtmTeamPlayer", x => new { x.PlayersId, x.TeamsId });
                    table.ForeignKey(
                        name: "FK_OtmTeamPlayer_Players_PlayersId",
                        column: x => x.PlayersId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OtmTeamPlayer_Team_TeamsId",
                        column: x => x.TeamsId,
                        principalTable: "Team",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stats",
                columns: table => new
                {
                    MapId = table.Column<int>(type: "integer", nullable: false),
                    PlayerId = table.Column<int>(type: "integer", nullable: false),
                    RoundId = table.Column<int>(type: "integer", nullable: false),
                    Acc = table.Column<decimal>(type: "numeric", nullable: false),
                    Mods = table.Column<List<string>>(type: "text[]", nullable: true),
                    Score = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stats", x => new { x.MapId, x.PlayerId, x.RoundId });
                    table.ForeignKey(
                        name: "FK_Stats_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Stats_Round_RoundId",
                        column: x => x.RoundId,
                        principalTable: "Round",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Stats_TMap_MapId",
                        column: x => x.MapId,
                        principalTable: "TMap",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OtmTeamPlayer_TeamsId",
                table: "OtmTeamPlayer",
                column: "TeamsId");

            migrationBuilder.CreateIndex(
                name: "IX_OtmTournamentPlayer_PlayersId",
                table: "OtmTournamentPlayer",
                column: "PlayersId");

            migrationBuilder.CreateIndex(
                name: "IX_OtmTournaments_HostId",
                table: "OtmTournaments",
                column: "HostId");

            migrationBuilder.CreateIndex(
                name: "IX_OtmTournamentStaff_TournamentsId",
                table: "OtmTournamentStaff",
                column: "TournamentsId");

            migrationBuilder.CreateIndex(
                name: "IX_Round_HostedTournamentId",
                table: "Round",
                column: "HostedTournamentId");

            migrationBuilder.CreateIndex(
                name: "IX_Stats_PlayerId",
                table: "Stats",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_Stats_RoundId",
                table: "Stats",
                column: "RoundId");

            migrationBuilder.CreateIndex(
                name: "IX_Team_HostedTournamentId",
                table: "Team",
                column: "HostedTournamentId");

            migrationBuilder.CreateIndex(
                name: "IX_TMap_RoundId",
                table: "TMap",
                column: "RoundId");

            migrationBuilder.CreateIndex(
                name: "IX_TMapSuggestion_RoundId",
                table: "TMapSuggestion",
                column: "RoundId");
        }
    }
}
