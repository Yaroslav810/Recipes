using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Application;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Mappers;
using Recipes.Api.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Api.Controllers
{
    [Route( "api/recipes" )]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        protected readonly IRecipesService _recipesService;

        public RecipesController( IRecipesService recipesService )
        {
            _recipesService = recipesService;
        }

        // GET: api/recipes
        [HttpGet]
        public List<RecipeDto> Get(
             [FromQuery] string searchString = "",
             [FromQuery] int take = 10,
             [FromQuery] int skip = 0 )
        {
            return _recipesService
                .GetRecipes( searchString, take, skip )
                .Map();
        }

        // GET: api/recipes/recipe-of-day
        [HttpGet( "recipe-of-day" )]
        public List<RecipeDto> Get()
        {
            return _recipesService
                .GetRecipes( "", 1, 2 )
                .Map(); // TODO: Сделать _recipeService.GetRecipeOfDay();
        }
    }
}
