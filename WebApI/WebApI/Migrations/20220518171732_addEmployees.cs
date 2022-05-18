using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApI.Migrations
{
    public partial class addEmployees : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "ntext", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "ntext", maxLength: 50, nullable: true),
                    Mobile = table.Column<string>(type: "ntext", maxLength: 50, nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    Department = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HireDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsPermanent = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
