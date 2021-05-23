using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Application.Repositories
{
    public interface IRecipesRepository
    {
        public List<Recipe> GetRecipes( string search, int take, int skip );

        public Recipe GetRecipe( int recipeId );

        public int? AddLike( int recipeId );
    }
}
