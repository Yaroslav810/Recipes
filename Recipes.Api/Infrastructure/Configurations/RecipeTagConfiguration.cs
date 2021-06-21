using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Infrastructure.Configurations
{
    public class RecipeTagConfiguration : IEntityTypeConfiguration<RecipeTag>
    {
        public void Configure( EntityTypeBuilder<RecipeTag> builder )
        {
            builder.ToTable( "RecipeTag" )
                .HasKey( item => item.Id );

            builder.Property( item => item.Id )
                .UseIdentityColumn();

            builder.Property( item => item.Name )
                .HasMaxLength( 256 )
                .IsRequired();
        }
    }
}
