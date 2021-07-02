using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Entities;
using Recipes.Api.Application.Mappers;
using Recipes.Api.Application.Services;

namespace Recipes.Api.Application.Builders
{
    public interface IDtoBuilder
    {
        public List<RecipeDto> BuildToListRecipeDetailDto( List<Recipe> recipes, int? userId );
        public List<RecipeDto> BuildToMyListRecipeDetailDto( List<Recipe> recipes, int userId );
        public RecipeDetailDto BuildToRecipeDetailDto( Recipe recipe, int? userId );
        public RecipeOfDayDto BuildToRecipeOfDayDto( Recipe recipe, int? userId );
    }

    public class DtoBuilder : IDtoBuilder
    {
        protected readonly IAccountService _accountService;
        protected readonly IRecipesService _recipesService;

        public DtoBuilder( IAccountService accountService, IRecipesService recipesService )
        {
            _accountService = accountService;
            _recipesService = recipesService;
        }

        public List<RecipeDto> BuildToListRecipeDetailDto( List<Recipe> recipes, int? userId )
        {
            var result = new List<RecipeDto>();
            foreach ( var recipe in recipes )
            {
                var user = _accountService.GetUserById( recipe.AuthorId );
                bool isLikeSet = false;
                bool isFavouriteSet = false;
                if ( userId != null )
                {
                    var userRating = _recipesService.GetUserRating( recipe.Id, ( int )userId );
                    if ( userRating != null )
                    {
                        isLikeSet = userRating.IsLikeSet;
                        isFavouriteSet = userRating.IsFavoritesSet;
                    }

                }
                result.Add( recipe.MapToRecipeDto( user.Login, isLikeSet, isFavouriteSet ) );
            }

            return result;
        }

        public List<RecipeDto> BuildToMyListRecipeDetailDto( List<Recipe> recipes, int userId )
        {
            var result = new List<RecipeDto>();
            var user = _accountService.GetUserById( userId );
            foreach ( var recipe in recipes )
            {
                bool isLikeSet = false;
                bool isFavouriteSet = false;
                var userRating = _recipesService.GetUserRating( recipe.Id, userId );
                if ( userRating != null )
                {
                    isLikeSet = userRating.IsLikeSet;
                    isFavouriteSet = userRating.IsFavoritesSet;
                }
                result.Add( recipe.MapToRecipeDto( user.Login, isLikeSet, isFavouriteSet ) );
            }

            return result;
        }

        public RecipeDetailDto BuildToRecipeDetailDto( Recipe recipe, int? userId )
        {
            User user = _accountService.GetUserById( recipe.AuthorId );

            bool isEditable = false;
            bool isLikeSet = false;
            bool isFavouriteSet = false;
            if ( userId != null )
            {
                isEditable = user.Id == userId;
                var userRating = _recipesService.GetUserRating( recipe.Id, ( int )userId );
                if ( userRating != null )
                {
                    isLikeSet = userRating.IsLikeSet;
                    isFavouriteSet = userRating.IsFavoritesSet;
                }
            }

            return recipe.MapToRecipeDetailDto( user.Login, isEditable, isLikeSet, isFavouriteSet );
        }

        public RecipeOfDayDto BuildToRecipeOfDayDto( Recipe recipe, int? userId )
        {
            bool isLikeSet = false;
            if ( userId != null )
            {
                var userRating = _recipesService.GetUserRating( recipe.Id, ( int )userId );
                if ( userRating != null )
                    isLikeSet = userRating.IsLikeSet;
            }

            User user = _accountService.GetUserById( recipe.AuthorId );
            return recipe.MapToRecipeOfDayDto( user.Login, isLikeSet );
        }
    }
}
