using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Infrastructure.Configurations
{
    public class IngredientConfiguration : IEntityTypeConfiguration<Ingredient>
    {
        public void Configure( EntityTypeBuilder<Ingredient> builder )
        {
            builder.ToTable( "Ingredient" )
                .HasKey( item => item.Id );

            builder.Property( item => item.Id )
                .UseIdentityColumn();

            builder.Property( item => item.Name )
                .HasMaxLength( 256 )
                .IsRequired();

            builder.HasMany( item => item.IngredientItems )
                .WithOne()
                .HasForeignKey( item => item.IngredientId );
        }
    }
}
