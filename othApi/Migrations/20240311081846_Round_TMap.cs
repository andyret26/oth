using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace othApi.Migrations
{
    /// <inheritdoc />
    public partial class Round_TMap : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Round",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    HostedTournamentId = table.Column<int>(type: "integer", nullable: true)
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
                name: "TMap",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderNumber = table.Column<int>(type: "integer", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: true),
                    Mod = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Sr = table.Column<decimal>(type: "numeric", nullable: false),
                    Bpm = table.Column<int>(type: "integer", nullable: false),
                    Length = table.Column<decimal>(type: "numeric", nullable: false),
                    Cs = table.Column<decimal>(type: "numeric", nullable: false),
                    Ar = table.Column<decimal>(type: "numeric", nullable: false),
                    Od = table.Column<decimal>(type: "numeric", nullable: false),
                    Mapper = table.Column<string>(type: "text", nullable: false),
                    Link = table.Column<string>(type: "text", nullable: true),
                    RoundId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TMap", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TMap_Round_RoundId",
                        column: x => x.RoundId,
                        principalTable: "Round",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Round_HostedTournamentId",
                table: "Round",
                column: "HostedTournamentId");

            migrationBuilder.CreateIndex(
                name: "IX_TMap_RoundId",
                table: "TMap",
                column: "RoundId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TMap");

            migrationBuilder.DropTable(
                name: "Round");
        }
    }
}
