using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Infrastructure.Configurations
{
    public class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
    {
        public void Configure( EntityTypeBuilder<Recipe> builder )
        {
            builder.ToTable( "Recipe" )
                .HasKey( item => item.Id );

            builder.Property( item => item.Id )
                .UseIdentityColumn();

            builder.Property( item => item.Title )
                .HasMaxLength( 256 )
                .IsRequired();

            builder.Property( item => item.Description )
                .HasMaxLength( 512 );

            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey( item => item.AuthorId );

            builder.Property( item => item.LikesCount )
                .HasColumnName( "LikeCount" )
                .IsRequired();

            builder.Property( item => item.StarsCount )
                .HasColumnName( "StarCount" )
                .IsRequired();

            builder.Property( item => item.TimeInMin )
                .HasColumnName( "CookingTime" )
                .HasColumnType( "tinyint" )
                .IsRequired();

            builder.Property( item => item.PersonCount )
                .HasColumnName( "ServingsCount" )
                .HasColumnType( "tinyint" )
                .IsRequired();

            builder.Property( item => item.CreationDateTime )
                .HasColumnType( "datetime2" );

            builder.HasMany( item => item.Tags )
                .WithOne()
                .HasForeignKey( item => item.RecipeId );

            builder.HasMany( item => item.Ingredients )
                .WithOne()
                .HasForeignKey( item => item.RecipeId );

            builder.HasMany( item => item.Steps )
                .WithOne()
                .HasForeignKey( item => item.RecipeId );
        }
    }
}
