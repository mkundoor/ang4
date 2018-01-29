using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IdentityScoreJult28.Migrations
{
    public partial class surveyPart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reserved",
                table: "Events");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "SurveyParticipant",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "SurveyParticipant");

            migrationBuilder.AddColumn<bool>(
                name: "Reserved",
                table: "Events",
                nullable: false,
                defaultValue: false);
        }
    }
}
