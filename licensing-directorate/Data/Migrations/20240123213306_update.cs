using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace licensing_directorate.Data.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GeographicalLocation",
                table: "Companies");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GeographicalLocation",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
