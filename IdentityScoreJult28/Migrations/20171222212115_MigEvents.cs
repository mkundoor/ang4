using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IdentityScoreJult28.Migrations
{
    public partial class MigEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Booked",
                table: "Events",
                newName: "Reserved");

            migrationBuilder.AddColumn<int>(
                name: "ParticipantID",
                table: "Events",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ParticipantID",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "Reserved",
                table: "Events",
                newName: "Booked");
        }
    }
}
