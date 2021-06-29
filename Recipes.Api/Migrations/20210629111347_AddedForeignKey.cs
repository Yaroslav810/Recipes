using Microsoft.EntityFrameworkCore.Migrations;

namespace Recipes.Api.Migrations
{
    public partial class AddedForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_UserRating_RecipeId",
                table: "UserRating",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRating_UserId",
                table: "UserRating",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRating_Recipe_RecipeId",
                table: "UserRating",
                column: "RecipeId",
                principalTable: "Recipe",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRating_User_UserId",
                table: "UserRating",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRating_Recipe_RecipeId",
                table: "UserRating");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRating_User_UserId",
                table: "UserRating");

            migrationBuilder.DropIndex(
                name: "IX_UserRating_RecipeId",
                table: "UserRating");

            migrationBuilder.DropIndex(
                name: "IX_UserRating_UserId",
                table: "UserRating");
        }
    }
}
