using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Mappers;
using Recipes.Api.Application.Services;
using System.Collections.Generic;
using Recipes.Api.Application.Builders;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Controllers
{
    [Route( "api/recipes" )]
    [ApiController]
    public class RecipesController : BaseController
    {
        protected readonly IRecipesService _recipesService;
        protected readonly IDtoBuilder _dtoBuilder;

        public RecipesController( IRecipesService recipesService, IDtoBuilder dtoBuilder )
        {
            _recipesService = recipesService;
            _dtoBuilder = dtoBuilder;
        }

        // GET: api/recipes
        [HttpGet]
        public List<RecipeDto> Get(
             [FromQuery] string searchString = "",
             [FromQuery] int take = 10,
             [FromQuery] int skip = 0 )
        {
            List<Recipe> recipes = _recipesService
                .GetRecipes( searchString, take, skip );

            int? userId = ( ( User.Identity is { IsAuthenticated: true } ) ) ? UserId : null;
            return _dtoBuilder.BuildToListRecipeDetailDto( recipes, userId );
        }

        // GET: api/recipes/my
        [HttpGet( "my" )]
        public IActionResult GetMyRecipe()
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Unauthorized();

            List<Recipe> recipes = _recipesService.GetRecipesByAuthorId( UserId );

            return Ok( _dtoBuilder.BuildToMyListRecipeDetailDto( recipes, UserId ) );
        }

        // GET: api/recipes/favourites
        [HttpGet( "favourites" )]
        public IActionResult GetFavouritesRecipe()
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Unauthorized();

            List<Recipe> recipes = _recipesService.GetFavouritesRecipes( UserId );

            return Ok( _dtoBuilder.BuildToListRecipeDetailDto( recipes, UserId ) );
        }

        // GET: api/recipes/recipe-of-day
        [HttpGet( "recipe-of-day" )]
        public List<RecipeDto> GetRecipeOfDay()
        {
            return _recipesService
                .GetRecipes( "", 1, 2 )
                .MapToRecipeDto(); // TODO: Do _recipeService.GetRecipeOfDay();
        }
    }
}
