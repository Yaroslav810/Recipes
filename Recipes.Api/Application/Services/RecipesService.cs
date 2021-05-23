using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Entities;
using Recipes.Api.Application.Repositories;

namespace Recipes.Api.Application.Services
{

    public interface IRecipesService
    {
        public List<Recipe> GetRecipes( string search, int take, int skip );
        public Recipe GetRecipe( int id );
        public int? AddLike( int recipeId );
    }

    public class RecipesService : IRecipesService
    {

        protected readonly IRecipesRepository _recipeRepository;

        public RecipesService( IRecipesRepository recipeRepository )
        {
            _recipeRepository = recipeRepository;
        }

        public List<Recipe> GetRecipes( string search, int take, int skip )
        {
            return _recipeRepository.GetRecipes( search, take, skip );
        }

        public Recipe GetRecipe( int id )
        {
            return _recipeRepository.GetRecipe( id );
        }

        public int? AddLike( int recipeId )
        {
            return _recipeRepository.AddLike( recipeId );
        }
    }
}
