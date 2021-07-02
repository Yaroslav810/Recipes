using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Infrastructure.Configurations
{
    public class RecipeRatingConfiguration : IEntityTypeConfiguration<RecipeRating>
    {
        public void Configure( EntityTypeBuilder<RecipeRating> builder )
        {
            builder.ToTable( "RecipeRating" )
                .HasKey( item => item.Id );

            builder.Property( item => item.Id )
                .UseIdentityColumn();

            builder.HasOne<Recipe>()
                .WithMany()
                .HasForeignKey( item => item.RecipeId );

            builder.Property( item => item.Rating )
                .IsRequired();
        }
    }
}
