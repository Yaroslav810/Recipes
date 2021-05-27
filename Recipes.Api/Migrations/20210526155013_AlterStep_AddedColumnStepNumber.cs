using Microsoft.EntityFrameworkCore.Migrations;

namespace Recipes.Api.Migrations
{
    public partial class AlterStep_AddedColumnStepNumber : Migration
    {
        protected override void Up( MigrationBuilder migrationBuilder )
        {
            migrationBuilder.AddColumn<int>(
                name: "StepNumber",
                table: "Step",
                type: "int",
                nullable: false,
                defaultValue: 0 );
        }

        protected override void Down( MigrationBuilder migrationBuilder )
        {
            migrationBuilder.DropColumn(
                name: "StepNumber",
                table: "Step" );
        }
    }
}
