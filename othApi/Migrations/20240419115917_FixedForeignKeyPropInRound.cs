using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace othApi.Migrations
{
    /// <inheritdoc />
    public partial class FixedForeignKeyPropInRound : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TMap_Round_RoundId",
                table: "TMap");

            migrationBuilder.DropForeignKey(
                name: "FK_TMap_Round_RoundId1",
                table: "TMap");

            migrationBuilder.DropIndex(
                name: "IX_TMap_RoundId1",
                table: "TMap");

            migrationBuilder.DropColumn(
                name: "RoundId1",
                table: "TMap");

            migrationBuilder.AlterColumn<int>(
                name: "RoundId",
                table: "TMap",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "TMapSuggestion",
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
                    Notes = table.Column<string>(type: "text", nullable: true),
                    Link = table.Column<string>(type: "text", nullable: true),
                    RoundId = table.Column<int>(type: "integer", nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "IX_TMapSuggestion_RoundId",
                table: "TMapSuggestion",
                column: "RoundId");

            migrationBuilder.AddForeignKey(
                name: "FK_TMap_Round_RoundId",
                table: "TMap",
                column: "RoundId",
                principalTable: "Round",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TMap_Round_RoundId",
                table: "TMap");

            migrationBuilder.DropTable(
                name: "TMapSuggestion");

            migrationBuilder.AlterColumn<int>(
                name: "RoundId",
                table: "TMap",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

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
                name: "FK_TMap_Round_RoundId",
                table: "TMap",
                column: "RoundId",
                principalTable: "Round",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TMap_Round_RoundId1",
                table: "TMap",
                column: "RoundId1",
                principalTable: "Round",
                principalColumn: "Id");
        }
    }
}
