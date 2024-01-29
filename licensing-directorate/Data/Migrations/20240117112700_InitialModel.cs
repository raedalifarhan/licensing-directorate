using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace licensing_directorate.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OldComericalName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Info = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompanyType = table.Column<int>(type: "int", nullable: false),
                    NamesOfPartners = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeOfActivity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CommercialRegistrationNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ViolationsAndPenalties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GeographicalLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ComplianceOfficer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Branches",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Manager = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Branches_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LicenceDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApplicationFee = table.Column<double>(type: "float", nullable: true),
                    CompanyCapital = table.Column<double>(type: "float", nullable: false),
                    DateOfApplication = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LicenceFee = table.Column<double>(type: "float", nullable: false),
                    FinancialGuarantee = table.Column<double>(type: "float", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LicenceRequestStatus = table.Column<int>(type: "int", nullable: false),
                    LicenceStatus = table.Column<int>(type: "int", nullable: false),
                    LicenceRequestDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateOfPreliminaryApproval = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LicenceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LicenseFileAttached = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LicenceDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LicenceDetails_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Branches_CompanyId",
                table: "Branches",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_LicenceDetails_CompanyId",
                table: "LicenceDetails",
                column: "CompanyId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Branches");

            migrationBuilder.DropTable(
                name: "LicenceDetails");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
