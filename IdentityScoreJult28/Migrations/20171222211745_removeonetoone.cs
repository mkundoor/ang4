using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IdentityScoreJult28.Migrations
{
    public partial class removeonetoone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Participant_ParticpantRef",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_ParticpantRef",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "ParticpantRef",
                table: "Events");

            migrationBuilder.AddColumn<bool>(
                name: "Booked",
                table: "Events",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Booked",
                table: "Events");

            migrationBuilder.AddColumn<int>(
                name: "ParticpantRef",
                table: "Events",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Events_ParticpantRef",
                table: "Events",
                column: "ParticpantRef",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Participant_ParticpantRef",
                table: "Events",
                column: "ParticpantRef",
                principalTable: "Participant",
                principalColumn: "ParticpantId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
