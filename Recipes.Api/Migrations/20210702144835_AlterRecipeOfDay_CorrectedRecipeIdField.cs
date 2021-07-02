using Microsoft.EntityFrameworkCore.Migrations;

namespace Recipes.Api.Migrations
{
    public partial class AlterRecipeOfDay_CorrectedRecipeIdField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeOfDay_RecipeOfDay_RecipeId",
                table: "RecipeOfDay");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeOfDay_Recipe_RecipeId",
                table: "RecipeOfDay",
                column: "RecipeId",
                principalTable: "Recipe",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeOfDay_Recipe_RecipeId",
                table: "RecipeOfDay");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeOfDay_RecipeOfDay_RecipeId",
                table: "RecipeOfDay",
                column: "RecipeId",
                principalTable: "RecipeOfDay",
                principalColumn: "Id");
        }
    }
}
