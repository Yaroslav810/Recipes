using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure( EntityTypeBuilder<User> builder )
        {
            builder.ToTable( "User" )
                .HasKey( item => item.Id );

            builder.Property( item => item.Id )
                .UseIdentityColumn();

            builder.Property( item => item.FirstName )
                .HasMaxLength( 256 )
                .IsRequired();

            builder.Property( item => item.LastName )
                .HasMaxLength( 256 );

            builder.Property( item => item.Login )
                .HasMaxLength( 256 )
                .IsRequired();

            builder.Property( item => item.About )
                .HasMaxLength( 512 );

            builder.Property( item => item.Password )
                .IsRequired();
        }
    }
}
