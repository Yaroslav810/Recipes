using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Entities;
using Recipes.Api.Application.Mappers;
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
        public Task CreateRecipeAsync( EditRecipe editRecipe );
        public Task UpdateRecipeWithImageAsync( int recipeId, EditRecipe editRecipe );
        public void UpdateRecipeWithOutImage( int recipeId, Recipe recipe );
    }

    public class RecipesService : IRecipesService
    {
        protected readonly IRecipesRepository _recipeRepository;
        protected readonly IFileService _fileService;

        public RecipesService( IRecipesRepository recipeRepository, IFileService fileService )
        {
            _recipeRepository = recipeRepository;
            _fileService = fileService;
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

        public async Task CreateRecipeAsync( EditRecipe editRecipe )
        {
            if ( !_fileService.IsValidImage( editRecipe.Image ) )
            {
                throw new Exception();
            };

            Image image = _fileService.CreateImage( editRecipe.Image );

            Recipe recipe = editRecipe.MapToRecipe();
            recipe.Author = "Elon Musk";
            recipe.ImagePath = $"/{image.DirectorySave}/{image.Name}";

            await _fileService.SaveImageAsync( image );
            _recipeRepository.CreateRecipe( recipe );
        }

        public async Task UpdateRecipeWithImageAsync( int recipeId, EditRecipe editRecipe )
        {
            Recipe currentRecipe = _recipeRepository.GetRecipe( recipeId, includeIngredientsAndSteps: true );
            if ( currentRecipe == null )
            {
                throw new Exception();
            }

            Image image = _fileService.CreateImage( editRecipe.Image );
            Recipe recipe = editRecipe.MapToRecipe();
            if ( currentRecipe.ImagePath != null )
            {
                _fileService.DeleteImage( currentRecipe.ImagePath );
            }

            currentRecipe.Title = recipe.Title;
            currentRecipe.Description = recipe.Description;
            currentRecipe.Tags = recipe.Tags;
            currentRecipe.ImagePath = ( image != null ) ? $"/{image.DirectorySave}/{image.Name}" : null;
            currentRecipe.TimeInMin = recipe.TimeInMin;
            currentRecipe.PersonCount = recipe.PersonCount;
            currentRecipe.Ingredients = recipe.Ingredients;
            currentRecipe.Steps = recipe.Steps;

            if ( image != null )
            {
                await _fileService.SaveImageAsync( image );
            }
        }

        public void UpdateRecipeWithOutImage( int recipeId, Recipe recipe )
        {
            Recipe currentRecipe = _recipeRepository.GetRecipe( recipeId, includeIngredientsAndSteps: true );
            if ( currentRecipe == null ) throw new Exception();

            currentRecipe.Title = recipe.Title;
            currentRecipe.Description = recipe.Description;
            currentRecipe.Tags = recipe.Tags;
            currentRecipe.TimeInMin = recipe.TimeInMin;
            currentRecipe.PersonCount = recipe.PersonCount;
            currentRecipe.Ingredients = recipe.Ingredients;
            currentRecipe.Steps = recipe.Steps;
        }
    }
}
