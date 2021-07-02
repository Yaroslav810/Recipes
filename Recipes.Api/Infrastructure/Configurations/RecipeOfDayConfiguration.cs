using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Infrastructure.Configurations
{
    public class RecipeOfDayConfiguration : IEntityTypeConfiguration<RecipeOfDay>
    {
        public void Configure( EntityTypeBuilder<RecipeOfDay> builder )
        {
            builder.ToTable( "RecipeOfDay" )
                .HasKey( item => item.Id );

            builder.Property( item => item.Id )
                .UseIdentityColumn();

            builder.HasOne<Recipe>()
                .WithMany()
                .HasForeignKey( item => item.RecipeId )
                .OnDelete( DeleteBehavior.NoAction );

            builder.Property( item => item.Day )
                .HasColumnType( "datetime2" );
        }
    }
}
