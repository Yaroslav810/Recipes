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
        public List<Recipe> GetRecipesByAuthorId( int userId );
        public List<Recipe> GetFavouritesRecipes( int userId );
        public Recipe? GetRecipe( int recipeId );
        public Recipe? GetRecipeOfDay();
        public UserRating? GetUserRating( int recipeId, int userId );
        public bool AddLike( int recipeId, int userId );
        public bool RemoveLike( int recipeId, int userId );
        public bool AddFavourite( int recipeId, int userId );
        public bool RemoveFavourite( int recipeId, int userId );
        public Task CreateRecipeAsync( EditRecipe editRecipe, int userId );
        public Task UpdateRecipeWithImageAsync( int recipeId, EditRecipe editRecipe, int userId );
        public void UpdateRecipeWithOutImage( int recipeId, Recipe recipe, int userId );
        public void DeleteRecipe( int recipeId );
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

        public List<Recipe> GetRecipesByAuthorId( int userId )
        {
            return _recipeRepository.GetRecipesByAuthorId( userId );
        }

        public List<Recipe> GetFavouritesRecipes( int userId )
        {
            List<UserRating> userRatings = _recipeRepository.GetFavouriteUserRatings( userId );

            var result = new List<Recipe>();
            foreach ( var userRating in userRatings )
            {
                result.Add( _recipeRepository.GetRecipe( userRating.RecipeId, false ) );
            }

            return result;
        }

        public Recipe? GetRecipe( int recipeId )
        {
            return _recipeRepository.GetRecipe( recipeId ) ?? null;
        }

        public Recipe? GetRecipeOfDay()
        {
            RecipeOfDay? recipeOfDay = _recipeRepository.GetRecipeOfDayForToday();
            if ( recipeOfDay == null )
            {
                RecipeRating recipeRating = _recipeRepository.GetRecipeWithMaxRating( 0 );
                RecipeOfDay? recipeOfDayYesterday = _recipeRepository.GetRecipeOfDayForYesterday();
                if ( recipeRating != null )
                {
                    if ( recipeOfDayYesterday != null && recipeRating.RecipeId == recipeOfDayYesterday.RecipeId )
                    {
                        recipeRating = _recipeRepository.GetRecipeWithMaxRating( 1 );
                    }
                }

                int recipeId = 1;
                if ( recipeRating == null )
                {
                    if ( recipeOfDayYesterday != null && recipeOfDayYesterday.RecipeId == recipeId )
                        recipeId = 2;
                }
                else
                {
                    recipeId = recipeRating.RecipeId;
                }

                CreateRecipeOfDay( recipeId );
                _recipeRepository.DeleteRecipeRating();

                return _recipeRepository.GetRecipe( recipeId, false );
            }

            return _recipeRepository.GetRecipe( recipeOfDay.RecipeId, false );
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

            RecipeRating recipeRating = _recipeRepository.GetRecipeRatingById( recipeId );
            if ( recipeRating == null )
            {
                recipeRating = new RecipeRating()
                {
                    RecipeId = recipeId,
                    Rating = 0,
                };
                _recipeRepository.CreateRecipeRating( recipeRating );
            }

            userRating.IsLikeSet = true;
            recipe.LikesCount++;
            recipeRating.Rating++;

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

        public void DeleteRecipe( int recipeId )
        {
            Recipe recipe = _recipeRepository.GetRecipe( recipeId, true );
            List<UserRating> userRatings = _recipeRepository.GetUserRatings( recipeId );
            _recipeRepository.DeleteUserRating( userRatings );
            _recipeRepository.DeleteRecipe( recipe );
        }

        private void CreateRecipeOfDay( int recipeId )
        {
            var recipeOfDay = new RecipeOfDay()
            {
                RecipeId = recipeId,
                Day = DateTime.Today,
            };
            _recipeRepository.CreateRecipeOfDay( recipeOfDay );
        }
    }
}
