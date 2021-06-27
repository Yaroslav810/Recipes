using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Mappers;
using Recipes.Api.Application.Services;
using System.Collections.Generic;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Controllers
{
    [Route( "api/recipes" )]
    [ApiController]
    public class RecipesController : BaseController
    {
        protected readonly IRecipesService _recipesService;
        private readonly IAccountService _accountService;

        public RecipesController( IRecipesService recipesService, IAccountService accountService )
        {
            _recipesService = recipesService;
            _accountService = accountService;
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

            return recipes?.MapToRecipeDto();
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
