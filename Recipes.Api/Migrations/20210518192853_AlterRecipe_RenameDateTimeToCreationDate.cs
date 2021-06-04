using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Recipes.Api.Migrations
{
    public partial class AlterRecipe_RenameDateTimeToCreationDate : Migration
    {
        protected override void Up( MigrationBuilder migrationBuilder )
        {
            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Recipe" );

            migrationBuilder.AlterColumn<int>(
                name: "StarCount",
                table: "Recipe",
                type: "int",
                nullable: false,
                oldClrType: typeof( byte ),
                oldType: "tinyint",
                oldDefaultValue: ( byte )0 );

            migrationBuilder.AlterColumn<byte>(
                name: "ServingsCount",
                table: "Recipe",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof( int ),
                oldType: "int" );

            migrationBuilder.AlterColumn<int>(
                name: "LikeCount",
                table: "Recipe",
                type: "int",
                nullable: false,
                oldClrType: typeof( byte ),
                oldType: "tinyint",
                oldDefaultValue: ( byte )0 );

            migrationBuilder.AlterColumn<byte>(
                name: "CookingTime",
                table: "Recipe",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof( int ),
                oldType: "int" );

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDateTime",
                table: "Recipe",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime( 1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified ) );
        }

        protected override void Down( MigrationBuilder migrationBuilder )
        {
            migrationBuilder.DropColumn(
                name: "CreationDateTime",
                table: "Recipe" );

            migrationBuilder.AlterColumn<byte>(
                name: "StarCount",
                table: "Recipe",
                type: "tinyint",
                nullable: false,
                defaultValue: ( byte )0,
                oldClrType: typeof( int ),
                oldType: "int" );

            migrationBuilder.AlterColumn<int>(
                name: "ServingsCount",
                table: "Recipe",
                type: "int",
                nullable: false,
                oldClrType: typeof( byte ),
                oldType: "tinyint" );

            migrationBuilder.AlterColumn<byte>(
                name: "LikeCount",
                table: "Recipe",
                type: "tinyint",
                nullable: false,
                defaultValue: ( byte )0,
                oldClrType: typeof( int ),
                oldType: "int" );

            migrationBuilder.AlterColumn<int>(
                name: "CookingTime",
                table: "Recipe",
                type: "int",
                nullable: false,
                oldClrType: typeof( byte ),
                oldType: "tinyint" );

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Recipe",
                type: "datetime2",
                nullable: true );
        }
    }
}
