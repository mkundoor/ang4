using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IdentityScoreJult28.Migrations
{
    public partial class migredirecturl1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RedirecingtUrl",
                table: "Survey",
                newName: "RedirectingUrl");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RedirectingUrl",
                table: "Survey",
                newName: "RedirecingtUrl");
        }
    }
}
