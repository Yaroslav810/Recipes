using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Infrastructure.Configurations
{
    public class UserRatingConfiguration : IEntityTypeConfiguration<UserRating>
    {
        public void Configure( EntityTypeBuilder<UserRating> builder )
        {
            builder.ToTable( "UserRating" )
                .HasKey( item => item.Id );

            builder.Property( item => item.Id )
                .UseIdentityColumn();

            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey( item => item.UserId )
                .OnDelete( DeleteBehavior.NoAction );

            builder.HasOne<Recipe>()
                .WithMany()
                .HasForeignKey( item => item.RecipeId )
                .OnDelete( DeleteBehavior.NoAction );
        }
    }
}
