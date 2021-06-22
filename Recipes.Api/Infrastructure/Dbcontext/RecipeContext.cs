using Microsoft.EntityFrameworkCore;
using Recipes.Api.Infrastructure.Configurations;

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
