using System.Collections.Generic;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Application.Repositories
{
    public interface IRecipesRepository
    {
        public List<Recipe> GetRecipes( string searchString, int take, int skip );
        public List<Recipe> GetRecipesByAuthorId( int userId );
        public Recipe GetRecipe( int recipeId, bool includeIngredientsAndSteps = true );
        public void CreateRecipe( Recipe recipe );
        public void CreateUserRating( UserRating userRating );
        public UserRating GetUserRating( int recipeId, int userId );
        public List<UserRating> GetUserRatings( int recipeId );
        public void DeleteRecipe( Recipe recipe );
        public void DeleteUserRating( List<UserRating> userRatings );
        public List<UserRating> GetFavouriteUserRatings( int userId );
    }
}
