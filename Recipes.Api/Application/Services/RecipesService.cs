﻿#nullable enable
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
        public UserRating? GetUserRating( int recipeId, int userId );
        public bool AddLike( int recipeId, int userId );
        public bool RemoveLike( int recipeId, int userId );
        public bool AddFavourite( int recipeId, int userId );
        public bool RemoveFavourite( int recipeId, int userId );
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

        public UserRating? GetUserRating( int recipeId, int userId )
        {
            return _recipeRepository.GetUserRating( recipeId, userId ) ?? null;
        }

        public bool AddLike( int recipeId, int userId )
        {
            Recipe recipe = _recipeRepository.GetRecipe( recipeId, false );
            if ( recipe == null )
                throw new Exception( "Нет такого рецепта" );

            UserRating userRating = _recipeRepository.GetUserRating( recipeId, userId );
            if ( userRating == null )
            {
                userRating = new UserRating()
                {
                    UserId = userId,
                    RecipeId = recipeId,
                    IsLikeSet = false,
                    IsFavoritesSet = false,
                };
                _recipeRepository.CreateUserRating( userRating );
            }
            else
            {
                if ( userRating.IsLikeSet == true )
                    return false;
            }

            userRating.IsLikeSet = true;
            recipe.LikesCount++;

            return true;
        }

        public bool RemoveLike( int recipeId, int userId )
        {
            Recipe recipe = _recipeRepository.GetRecipe( recipeId, false );
            if ( recipe == null )
                throw new Exception( "Нет такого рецепта" );

            UserRating userRating = _recipeRepository.GetUserRating( recipeId, userId );
            if ( userRating == null )
                throw new Exception( "Нет данных" );

            if ( userRating.IsLikeSet == false )
                return false;

            userRating.IsLikeSet = false;
            recipe.LikesCount--;

            return true;
        }

        public bool AddFavourite( int recipeId, int userId )
        {
            Recipe recipe = _recipeRepository.GetRecipe( recipeId, false );
            if ( recipe == null )
                throw new Exception( "Нет такого рецепта" );

            UserRating userRating = _recipeRepository.GetUserRating( recipeId, userId );
            if ( userRating == null )
            {
                userRating = new UserRating()
                {
                    UserId = userId,
                    RecipeId = recipeId,
                    IsLikeSet = false,
                    IsFavoritesSet = false,
                };
                _recipeRepository.CreateUserRating( userRating );
            }
            else
            {
                if ( userRating.IsFavoritesSet == true )
                    return false;
            }

            userRating.IsFavoritesSet = true;
            recipe.StarsCount++;

            return true;
        }

        public bool RemoveFavourite( int recipeId, int userId )
        {
            Recipe recipe = _recipeRepository.GetRecipe( recipeId, false );
            if ( recipe == null )
                throw new Exception( "Нет такого рецепта" );

            UserRating userRating = _recipeRepository.GetUserRating( recipeId, userId );
            if ( userRating == null )
                throw new Exception( "Нет данных" );

            if ( userRating.IsFavoritesSet == false )
                return false;

            userRating.IsFavoritesSet = false;
            recipe.StarsCount--;

            return true;
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
