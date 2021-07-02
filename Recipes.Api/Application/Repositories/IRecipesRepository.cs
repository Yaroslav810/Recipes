using System.Collections.Generic;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Application.Repositories
{
    public interface IRecipesRepository
    {
        public List<Recipe> GetRecipes( string searchString, int take, int skip );
        public List<Recipe> GetRecipesByAuthorId( int userId );
        public void CreateRecipe( Recipe recipe );
        public void DeleteRecipe( Recipe recipe );
        public Recipe GetRecipe( int recipeId, bool includeIngredientsAndSteps = true );
        public Recipe GetFirstRecipeWithSkip( int skip );
        public void CreateUserRating( UserRating userRating );
        public void DeleteUserRating( List<UserRating> userRatings );
        public UserRating GetUserRating( int recipeId, int userId );
        public List<UserRating> GetUserRatings( int recipeId );
        public void CreateRecipeOfDay( RecipeOfDay recipeOfDay );
        public RecipeOfDay GetRecipeOfDayForYesterday();
        public RecipeOfDay GetRecipeOfDayForToday();
        public List<UserRating> GetFavouriteUserRatings( int userId );
        public void CreateRecipeRating( RecipeRating recipeRating );
        public void DeleteRecipeRating();
        public RecipeRating GetRecipeRatingById( int recipeId );
        public RecipeRating GetRecipeWithMaxRating( int skip );
    }
}
