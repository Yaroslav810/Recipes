using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Infrastructure.Configurations
{
    public class StepConfiguration : IEntityTypeConfiguration<Step>
    {
        public void Configure( EntityTypeBuilder<Step> builder )
        {
            builder.ToTable( "Step" )
                .HasKey( item => item.Id );

            builder.Property( item => item.Id )
                .UseIdentityColumn( 1, 1 )
                .IsRequired();

            builder.Property( item => item.Description )
                .HasMaxLength( 512 )
                .IsRequired();

            builder.Property( item => item.RecipeId )
                .IsRequired();
        }
    }
}
