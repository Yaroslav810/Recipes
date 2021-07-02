using System;
using System.Collections.Generic;
using System.Linq;
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

        public List<Recipe> GetRecipesByAuthorId( int userId )
        {
            return _recipeContext
                .Set<Recipe>()
                .Include( x => x.Tags )
                .Where( x => x.AuthorId == userId )
                .OrderByDescending( x => x.CreationDateTime )
                .ToList();
        }

        public Recipe GetRecipe( int recipeId, bool includeIngredientsAndSteps )
        {
            var recipeQuery = _recipeContext
                .Set<Recipe>()
                .Include( x => x.Tags )
                .AsQueryable();
            if ( includeIngredientsAndSteps )
            {
                recipeQuery = recipeQuery
                    .Include( x => x.Ingredients )
                        .ThenInclude( y => y.IngredientItems )
                    .Include( x => x.Steps.OrderBy( y => y.StepNumber ) );
            }
            return recipeQuery.FirstOrDefault( x => x.Id == recipeId );
        }

        public RecipeOfDay GetRecipeOfDayForToday()
        {
            return _recipeContext
                .Set<RecipeOfDay>()
                .FirstOrDefault( x => x.Day == DateTime.Today );
        }

        public RecipeOfDay GetRecipeOfDayForYesterday()
        {
            return _recipeContext
                .Set<RecipeOfDay>()
                .FirstOrDefault( x => x.Day == ( DateTime.Today.AddDays( -1 ) ) );
        }

        public void CreateRecipeOfDay( RecipeOfDay recipeOfDay )
        {
            _recipeContext
                .Set<RecipeOfDay>()
                .Add( recipeOfDay );
        }

        public void CreateRecipe( Recipe recipe )
        {
            _recipeContext
                .Set<Recipe>()
                .Add( recipe );
        }

        public void CreateUserRating( UserRating userRating )
        {
            _recipeContext
                .Set<UserRating>()
                .Add( userRating );
        }

        public UserRating GetUserRating( int recipeId, int userId )
        {
            return _recipeContext
                .Set<UserRating>()
                .FirstOrDefault( x => ( x.RecipeId == recipeId && x.UserId == userId ) );
        }

        public List<UserRating> GetUserRatings( int recipeId )
        {
            return _recipeContext
                .Set<UserRating>()
                .Where( x => x.RecipeId == recipeId )
                .ToList();
        }

        public void DeleteRecipe( Recipe recipe )
        {
            _recipeContext
                .Set<Recipe>()
                .Remove( recipe );
        }

        public void DeleteUserRating( List<UserRating> userRatings )
        {
            foreach ( var userRating in userRatings )
            {
                _recipeContext
                    .Set<UserRating>()
                    .Remove( userRating );
            }
        }

        public List<UserRating> GetFavouriteUserRatings( int userId )
        {
            return _recipeContext
                .Set<UserRating>()
                .Where( x => ( x.UserId == userId && x.IsFavoritesSet == true ) )
                .ToList();
        }

        public void CreateRecipeRating( RecipeRating recipeRating )
        {
            _recipeContext
                .Set<RecipeRating>()
                .Add( recipeRating );
        }

        public RecipeRating GetRecipeWithMaxRating( int skip )
        {
            return _recipeContext
                .Set<RecipeRating>()
                .OrderByDescending( x => x.Rating )
                .Skip( skip )
                .FirstOrDefault();
        }

        public RecipeRating GetRecipeRatingById( int recipeId )
        {
            return _recipeContext
                .Set<RecipeRating>()
                .FirstOrDefault( x => x.RecipeId == recipeId );
        }

        public void DeleteRecipeRating()
        {
            _recipeContext
                .Set<RecipeRating>()
                .RemoveRange( _recipeContext.Set<RecipeRating>().ToList() );
        }
    }
}
