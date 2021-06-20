using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Recipes.Api.Infrastructure.Configurations;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Infrastructure.Dbcontext
{
    public class RecipeContext : DbContext
    {
        public RecipeContext( DbContextOptions<RecipeContext> options ) : base( options ) { }

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            modelBuilder.ApplyConfiguration( new RecipeConfiguration() );
            modelBuilder.ApplyConfiguration( new RecipeTagConfiguration() );
            modelBuilder.ApplyConfiguration( new IngredientConfiguration() );
            modelBuilder.ApplyConfiguration( new IngredientItemConfiguration() );
            modelBuilder.ApplyConfiguration( new StepConfiguration() );
        }
    }
}
