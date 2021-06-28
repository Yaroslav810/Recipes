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
        public List<RecipeDto> BuildToListRecipeDetailDto( List<Recipe> recipes );
        public RecipeDetailDto BuildToRecipeDetailDto( Recipe recipe, int? userId );
    }

    public class DtoBuilder : IDtoBuilder
    {
        protected readonly IAccountService _accountService;

        public DtoBuilder( IAccountService accountService )
        {
            _accountService = accountService;
        }

        public List<RecipeDto> BuildToListRecipeDetailDto( List<Recipe> recipes )
        {
            var result = new List<RecipeDto>();
            foreach ( var recipe in recipes )
            {
                var user = _accountService.GetUserById( recipe.AuthorId );
                result.Add( recipe.MapToRecipeDto( user.Login ) );
            }

            return result;
        }

        public RecipeDetailDto BuildToRecipeDetailDto( Recipe recipe, int? userId )
        {
            User user = _accountService.GetUserById( recipe.AuthorId );

            bool isEditable = false;
            if ( userId != null )
            {
                isEditable = user.Id == userId;
            }

            return recipe.MapToRecipeDetailDto( user.Login, isEditable );
        }
    }
}
