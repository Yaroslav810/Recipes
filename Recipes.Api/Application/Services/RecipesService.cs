#nullable enable
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Recipes.Api.Application.Entities;
using Recipes.Api.Application.Mappers;
using Recipes.Api.Application.Repositories;

namespace Recipes.Api.Application.Services
{
    public interface IRecipesService
    {
        public List<Recipe> GetRecipes( string searchString, int take, int skip );
        public Recipe? GetRecipe( int recipeId );
        public void AddLike( int recipeId );
        public void RemoveLike( int recipeId );
        public void AddFavourite( int recipeId );
        public void RemoveFavourite( int recipeId );
        public Task CreateRecipeAsync( EditRecipe editRecipe, int userId );
        public Task UpdateRecipeWithImageAsync( int recipeId, EditRecipe editRecipe, int userId );
        public void UpdateRecipeWithOutImage( int recipeId, Recipe recipe, int userId );
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

        public Recipe? GetRecipe( int recipeId )
        {
            return _recipeRepository.GetRecipe( recipeId ) ?? null;
        }

        public void AddLike( int recipeId )
        {
            Recipe recipe = _recipeRepository.GetRecipe( recipeId, false );
            if ( recipe == null ) return;
            // TODO: Получение строки UserRating WHERE RecipeId = recipeId
            if ( true ) // TODO: CanPutLike = (): bool => (UserRating != null) || (isLikeSet != 1) 
            {
                // TODO: Обновить сущность UserRating

                // TODO: Получить обновлённый Recipe
                recipe.LikesCount++;
            }
        }

        public void RemoveLike( int recipeId )
        {
            Recipe recipe = _recipeRepository.GetRecipe( recipeId, false );
            if ( recipe == null ) return;
            // TODO: Получение строки UserRating WHERE RecipeId = recipeId
            if ( true ) // TODO: CanRemoveLike = (): bool => (UserRating != null) || (isLikeSet != 0) 
            {
                // TODO: Обновить сущность UserRating

                // TODO: Получить обновлённый Recipe
                recipe.LikesCount--;
            }
        }

        public void AddFavourite( int recipeId )
        {
            Recipe recipe = _recipeRepository.GetRecipe( recipeId, false );
            if ( recipe == null ) return;
            // TODO: Получение строки UserRating WHERE RecipeId = recipeId
            if ( true ) // TODO: CanAddToFav = (): bool => (UserRating != null) || (inFavourite != 1) 
            {
                // TODO: Обновить сущность UserRating

                // TODO: Получить обновлённый Recipe
                recipe.StarsCount++;
            }
        }

        public void RemoveFavourite( int recipeId )
        {
            Recipe recipe = _recipeRepository.GetRecipe( recipeId, false );
            if ( recipe == null ) return;
            // TODO: Получение строки UserRating WHERE RecipeId = recipeId
            if ( true ) // TODO: CanRemoveFromFav = (): bool => (UserRating != null) || (inFavourite != 0) 
            {
                // TODO: Обновить сущность UserRating

                // TODO: Получить обновлённый Recipe
                recipe.StarsCount--;
            }
        }

        public async Task CreateRecipeAsync( EditRecipe editRecipe, int userId )
        {
            string? imagePath = null;
            if ( editRecipe.Image != null )
            {
                if ( !_fileService.IsValidImage( editRecipe.Image ) )
                    throw new Exception( "Ошибка валидации файла" );

                Image image = _fileService.CreateImage( editRecipe.Image );
                imagePath = $"/{image.DirectoryName}/{image.Name}";
                await _fileService.SaveImageAsync( image );
            }

            DateTime creationDateTime = DateTime.Now;
            Recipe recipe = editRecipe.MapToRecipe( userId, imagePath, creationDateTime );

            _recipeRepository.CreateRecipe( recipe );
        }

        public async Task UpdateRecipeWithImageAsync( int recipeId, EditRecipe editRecipe, int userId )
        {
            Recipe currentRecipe = _recipeRepository.GetRecipe( recipeId, includeIngredientsAndSteps: true );
            if ( currentRecipe == null )
                throw new Exception( "Нет рецепта с таким идентификатором" );

            if ( currentRecipe.AuthorId != userId )
                throw new Exception( "Нет доступа к ресурсу" );

            if ( currentRecipe.ImagePath != null )
                _fileService.DeleteImage( currentRecipe.ImagePath );

            string? imagePath = null;
            if ( editRecipe.Image != null )
            {
                Image image = _fileService.CreateImage( editRecipe.Image );
                await _fileService.SaveImageAsync( image );
                imagePath = $"/{image.DirectoryName}/{image.Name}";
            }

            currentRecipe.Title = editRecipe.Title;
            currentRecipe.Description = editRecipe.Description;
            currentRecipe.Tags = editRecipe.Tags;
            currentRecipe.ImagePath = imagePath;
            currentRecipe.TimeInMin = editRecipe.TimeInMinutes;
            currentRecipe.PersonCount = editRecipe.PersonsCount;
            currentRecipe.Ingredients = editRecipe.Ingredients;
            currentRecipe.Steps = editRecipe.Steps;
        }


        public void UpdateRecipeWithOutImage( int recipeId, Recipe recipe, int userId )
        {
            Recipe currentRecipe = _recipeRepository.GetRecipe( recipeId, includeIngredientsAndSteps: true );
            if ( currentRecipe == null )
                throw new Exception( "Нет рецепта с таким идентификатором" );

            if ( currentRecipe.AuthorId != userId )
                throw new Exception( "Нет доступа к ресурсу" );

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
