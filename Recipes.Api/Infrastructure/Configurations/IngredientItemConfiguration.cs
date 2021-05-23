using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Infrastructure.Configurations
{
    public class IngredientItemConfiguration : IEntityTypeConfiguration<IngredientItem>
    {
        public void Configure( EntityTypeBuilder<IngredientItem> builder )
        {
            builder.ToTable( "IngredientItem" )
                .HasKey( item => item.Id );

            builder.Property( item => item.Id )
                .UseIdentityColumn( 1, 1 )
                .IsRequired();

            builder.Property( item => item.Name )
                .HasMaxLength( 256 )
                .IsRequired();

            builder.Property( item => item.IngredientId )
                .IsRequired();
        }
    }
}
