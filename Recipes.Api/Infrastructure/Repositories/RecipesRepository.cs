using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Recipes.Api.Application.Repositories;
using Recipes.Api.Infrastructure.Dbcontext;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Infrastructure.Repositories
{
    public class RecipesRepository : IRecipesRepository
    {
        protected readonly RecipeContext _recipeContext;
        public RecipesRepository( RecipeContext recipeContext )
        {
            _recipeContext = recipeContext;
        }

        public List<Recipe> GetRecipes( string searchString, int take, int skip )
        {
            var recipeQuery = _recipeContext
                .Set<Recipe>()
                .Include( x => x.Tags )
                .AsQueryable();
            if ( !string.IsNullOrWhiteSpace( searchString ) )
            {
                string trimmedSearchString = searchString.Trim();
                recipeQuery = recipeQuery.Where( x =>
                    x.Title.Contains( trimmedSearchString )
                    || x.Tags.Any( y => y.Name.Contains( trimmedSearchString ) )
                );
            }
            return recipeQuery
                .OrderByDescending( item => item.CreationDateTime )
                .Skip( skip )
                .Take( take )
                .ToList();
        }

        public Recipe GetRecipe( int recipeId )
        {
            return _recipeContext
                .Set<Recipe>()
                .Include( x => x.Tags )
                .Include( x => x.Ingredients )
                    .ThenInclude( y => y.IngredientItems )
                .Include( x => x.Steps )
                .FirstOrDefault( x => x.Id == recipeId );
        }

        public int? AddLike( int recipeId )
        {
            return null;
        }
    }
}
