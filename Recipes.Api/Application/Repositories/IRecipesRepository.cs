using System.Collections.Generic;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Application.Repositories
{
    public interface IRecipesRepository
    {
        public List<Recipe> GetRecipes( string searchString, int take, int skip );
        public Recipe GetRecipe( int recipeId, bool includeIngredientsAndSteps = true );
        public void CreateRecipe( Recipe recipe );
    }
}
