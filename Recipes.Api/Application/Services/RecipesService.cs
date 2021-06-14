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
        public List<Recipe> GetRecipes( string searchString, int take, int skip );
        public Recipe GetRecipe( int recipeId );
        public void AddLike( int recipeId );
        public void RemoveLike( int recipeId );
        public void AddFavourite( int recipeId );
        public void RemoveFavourite( int recipeId );
        public void CreateRecipe( Recipe recipe );
        public void UpdateRecipe( int recipeId, Recipe recipe );
    }

    public class RecipesService : IRecipesService
    {
        protected readonly IRecipesRepository _recipeRepository;

        public RecipesService( IRecipesRepository recipeRepository )
        {
            _recipeRepository = recipeRepository;
        }

        public List<Recipe> GetRecipes( string searchString, int take, int skip )
        {
            return _recipeRepository.GetRecipes( searchString, take, skip );
        }

        public Recipe GetRecipe( int recipeId )
        {
            return _recipeRepository.GetRecipe( recipeId );
        }

        public void AddLike( int recipeId )
        {
            Recipe recipe = _recipeRepository.GetRecipe( recipeId, false );
            if ( recipe != null )
            {
                // TODO: Получение строки UserRating WHERE RecipeId = recipeId
                if ( true ) // TODO: CanPutLike = (): bool => (UserRating != null) || (isLikeSet != 1) 
                {
                    // TODO: Обновить сущность UserRating

                    // TODO: Получить обновлённый Recipe
                    recipe.LikesCount++;
                }
            }
        }

        public void RemoveLike( int recipeId )
        {
            Recipe recipe = _recipeRepository.GetRecipe( recipeId, false );
            if ( recipe != null )
            {
                // TODO: Получение строки UserRating WHERE RecipeId = recipeId
                if ( true ) // TODO: CanRemoveLike = (): bool => (UserRating != null) || (isLikeSet != 0) 
                {
                    // TODO: Обновить сущность UserRating

                    // TODO: Получить обновлённый Recipe
                    recipe.LikesCount--;
                }
            }
        }

        public void AddFavourite( int recipeId )
        {
            Recipe recipe = _recipeRepository.GetRecipe( recipeId, false );
            if ( recipe != null )
            {
                // TODO: Получение строки UserRating WHERE RecipeId = recipeId
                if ( true ) // TODO: CanAddToFav = (): bool => (UserRating != null) || (inFavourite != 1) 
                {
                    // TODO: Обновить сущность UserRating

                    // TODO: Получить обновлённый Recipe
                    recipe.StarsCount++;
                }
            }
        }

        public void RemoveFavourite( int recipeId )
        {
            Recipe recipe = _recipeRepository.GetRecipe( recipeId, false );
            if ( recipe != null )
            {
                // TODO: Получение строки UserRating WHERE RecipeId = recipeId
                if ( true ) // TODO: CanRemoveFromFav = (): bool => (UserRating != null) || (inFavourite != 0) 
                {
                    // TODO: Обновить сущность UserRating

                    // TODO: Получить обновлённый Recipe
                    recipe.StarsCount--;
                }
            }
        }

        public void CreateRecipe( Recipe recipe )
        {
            recipe = PrepareRecipeForInsert( recipe );
            _recipeRepository.CreateRecipe( recipe );
        }

        public void UpdateRecipe( int recipeId, Recipe recipe )
        {
            UpdateСurrentRecipe( recipeId, recipe );
        }

        private Recipe PrepareRecipeForInsert( Recipe recipe )
        {
            return new Recipe
            {
                Title = recipe.Title,
                Description = recipe.Description,
                Tags = recipe.Tags,
                ImagePath = recipe.ImagePath,
                TimeInMin = recipe.TimeInMin,
                PersonCount = recipe.PersonCount,
                Ingredients = recipe.Ingredients,
                Steps = recipe.Steps,
                Author = "Elon Musk",
                CreationDateTime = DateTime.Now,
                LikesCount = 0,
                StarsCount = 0,
            };
        }

        private void UpdateСurrentRecipe( int recipeId, Recipe recipe )
        {
            Recipe recipeCurrent = _recipeRepository.GetRecipe( recipeId, true );

            recipeCurrent.Title = recipe.Title;
            recipeCurrent.Description = recipe.Description;
            recipeCurrent.Tags = recipe.Tags;
            recipeCurrent.ImagePath = recipe.ImagePath;
            recipeCurrent.TimeInMin = recipe.TimeInMin;
            recipeCurrent.PersonCount = recipe.PersonCount;
            recipeCurrent.Ingredients = recipe.Ingredients;
            recipeCurrent.Steps = recipe.Steps;
        }
    }
}
