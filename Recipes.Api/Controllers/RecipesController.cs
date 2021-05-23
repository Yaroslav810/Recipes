using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Application;
using Recipes.Api.Application.Dto;
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
        //protected readonly IUnitOfWork _unitOfWork;

        public RecipesController( IRecipesService recipesService ) //, IUnitOfWork unitOfWork )
        {
            _recipesService = recipesService;
            // _unitOfWork = unitOfWork;
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
                .ConvertAll( item => new RecipeDto( item ) ); ;
        }

        // GET: api/recipes
        [HttpGet( "recipeOfDay" )]
        public List<RecipeDto> Get()  // TODO: не list
        {
            return _recipesService
                .GetRecipes( "", 1, 2 )
                .ConvertAll( item => new RecipeDto( item ) ); // TODO: _recipeService.GetRecipeOfDay();
        }

        // GET api/recipes/5
        /*[HttpGet( "{id}" )]
        public string Get( int id )
        {
            return "value";
        }*/

        // POST api/<RecipesController>
        /*[HttpPost]
        public void Post( [FromBody] string value )
        {
        }*/

        // PUT api/<RecipesController>/5
        /*[HttpPut( "{id}" )]
        public void Put( int id, [FromBody] string value )
        {
        }*/

        // DELETE api/<RecipesController>/5
        /*[HttpDelete( "{id}" )]
        public void Delete( int id )
        {
        }*/
    }
}
