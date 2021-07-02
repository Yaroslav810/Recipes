using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Recipes.Api.Application;
using Recipes.Api.Application.Builders;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Entities;
using Recipes.Api.Application.Mappers;
using Recipes.Api.Application.Services;

namespace Recipes.Api.Controllers
{
    [Route( "api/recipe" )]
    [ApiController]
    public class RecipeController : BaseController
    {
        protected readonly IRecipesService _recipesService;
        protected readonly IDtoBuilder _dtoBuilder;
        protected readonly IUnitOfWork _unitOfWork;

        public RecipeController( IRecipesService recipesService, IDtoBuilder dtoBuilder, IUnitOfWork unitOfWork )
        {
            _recipesService = recipesService;
            _dtoBuilder = dtoBuilder;
            _unitOfWork = unitOfWork;
        }

        // GET: api/recipe
        [HttpGet]
        public string Get()
        {
            string[] phrases = {
                "Кто не работает — тот ест! Учись, студент! (Х/ф “Операция «Ы» и другие приключения Шурика”)",
                "Кушать подано. Садидесь жрать, пожалуйста! (Х/ф “Джентльмены удачи”)",
                "Икра черная! Икра красная! Икра заморская, баклажановая!.. (Х/ф “Иван Васильевич меняет профессию”)",
                "Наши люди в булочную на такси не ездят! (Х/ф “Бриллиантовая рука”)",
                "Дичь не улетит, она жареная! (Х/ф “Бриллиантовая рука”)",
                "За чужой счет пьют даже язвенники и трезвенники! (Х/ф “Бриллиантовая рука”)",
                "Ну, за рыбалку! (Х/ф “Особенности национальной охоты”)",
                "Шампанское по утрам пьют только аристократы или дегенераты! (Х/ф “Бриллиантовая рука”)",
                "Детям - мороженое, жене - цветы. Гляди, не перепутай, Кутузов! (Х/ф “Бриллиантовая рука”)",
                "Я требую продолжения банкета! (Х/ф “Иван Васильевич меняет профессию”)",
                "А компот?! (Х/ф “Операция «Ы» и другие приключения Шурика”)",
                "Губит людей не пиво, губит людей вода (Х/ф “Не может быть”)",
                "А не пора ли Вам подкрепиться? (М/ф “Винни-Пух идёт в гости”)",
                "Тебе что намазать? Мёду или сгущенного молока? - И того, и другого, и можно без хлеба (М/ф “Винни-Пух идёт в гости”)",
                "Поверь мне, не в пирогах счастье… - Ты что, с ума сошёл? А в чем же еще? (М/ф “Малыш и Карлсон”)",
                "Неправильно ты, дядя Федор, бутерброд ешь. Ты его колбасой кверху держишь, а надо колбасой на язык класть, так вкуснее получится. (М/ф “Трое из Простоквашино”)"
            };
            return phrases[ new Random().Next( 0, phrases.Length ) ];
        }

        // GET api/recipe/{recipeId}
        [HttpGet( "{recipeId}" )]
        public IActionResult GetRecipe( [FromRoute] int recipeId )
        {
            Recipe? recipe = _recipesService.GetRecipe( recipeId );
            if ( recipe == null )
                return NotFound();

            int? userId = ( User.Identity is { IsAuthenticated: true } ) ? UserId : null;
            return Ok( _dtoBuilder.BuildToRecipeDetailDto( recipe, userId ) );
        }

        // GET api/recipe/day
        [HttpGet( "day" )]
        public IActionResult GetRecipeOfDay()
        {
            Recipe? recipe = _recipesService.GetRecipeOfDay();
            if ( recipe == null )
                return NotFound();

            _unitOfWork.Commit();
            int? userId = ( User.Identity is { IsAuthenticated: true } ) ? UserId : null;

            return Ok( _dtoBuilder.BuildToRecipeOfDayDto( recipe, userId ) );
        }

        // GET api/recipe/{recipeId}/is-editable
        [HttpGet( "{recipeId}/is-editable" )]
        public IActionResult IsRecipeEditable( [FromRoute] int recipeId )
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Ok( false );

            Recipe recipe = _recipesService.GetRecipe( recipeId );
            if ( recipe == null )
                return BadRequest();

            return Ok( UserId == recipe.AuthorId );
        }

        // GET api/recipe/{recipeId}/add-like
        [HttpGet( "{recipeId}/add-like" )]
        public IActionResult AddLike( [FromRoute] int recipeId )
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Unauthorized();

            bool status = _recipesService.AddLike( recipeId, UserId );
            if ( status )
            {
                _unitOfWork.Commit();
                return Ok();
            }

            return BadRequest();
        }

        // GET api/recipe/{recipeId}/remove-like
        [HttpGet( "{recipeId}/remove-like" )]
        public IActionResult RemoveLike( [FromRoute] int recipeId )
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Unauthorized();

            bool status = _recipesService.RemoveLike( recipeId, UserId );
            if ( status )
            {
                _unitOfWork.Commit();
                return Ok();
            }

            return BadRequest();
        }

        // GET api/recipe/{recipeId}/add-favourite
        [HttpGet( "{recipeId}/add-favourite" )]
        public IActionResult AddFavourite( [FromRoute] int recipeId )
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Unauthorized();

            bool status = _recipesService.AddFavourite( recipeId, UserId );
            if ( status )
            {
                _unitOfWork.Commit();
                return Ok();
            }

            return BadRequest();
        }

        // GET api/recipe/{recipeId}/remove-favourite
        [HttpGet( "{recipeId}/remove-favourite" )]
        public IActionResult RemoveFavourite( [FromRoute] int recipeId )
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Unauthorized();

            bool status = _recipesService.RemoveFavourite( recipeId, UserId );
            if ( status )
            {
                _unitOfWork.Commit();
                return Ok();
            }

            return BadRequest();
        }

        // GET api/recipe/{recipeId}/edit
        [HttpGet( "{recipeId}/edit" )]
        public IActionResult GetRecipeForEdit( [FromRoute] int recipeId )
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Unauthorized();

            Recipe recipe = _recipesService.GetRecipe( recipeId );
            if ( recipe == null )
                return NotFound();

            if ( recipe.AuthorId != UserId )
                return StatusCode( ( int )HttpStatusCode.Forbidden );

            return Ok( recipe.MapToEditDetail() );
        }

        // POST api/recipe/{recipeId}/delete
        [HttpPost( "{recipeId}/delete" )]
        public IActionResult DeleteRecipe( [FromRoute] int recipeId )
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Unauthorized();

            Recipe recipe = _recipesService.GetRecipe( recipeId );
            if ( recipe == null )
                return NotFound();

            if ( recipe.AuthorId != UserId )
                return StatusCode( ( int )HttpStatusCode.Forbidden );

            bool status = _recipesService.DeleteRecipe( recipeId );
            if ( status )
                _unitOfWork.Commit();

            return Ok( status );
        }

        // POST api/recipe/add
        [HttpPost( "add" )]
        public async Task<IActionResult> AddRecipeAsync()
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Unauthorized();

            try
            {
                IFormFile file = Request.Form.Files.GetFile( "imageFile" );
                EditRecipeDto editRecipeDto = JsonConvert.DeserializeObject<EditRecipeDto>( Request.Form[ "data" ].ToString() );

                EditRecipe addRecipeDto = editRecipeDto.MapToEditRecipe( file );

                await _recipesService.CreateRecipeAsync( addRecipeDto, UserId );
                _unitOfWork.Commit();

                return Ok();
            }
            catch ( Exception error )
            {
                return BadRequest( error.Message );
            }
        }

        // POST api/recipe/{recipeId}/update-with-image
        [HttpPost( "{recipeId}/update-with-image" )]
        public async Task<IActionResult> UpdateRecipeWithImageAsync( [FromRoute] int recipeId )
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Unauthorized();

            try
            {
                IFormFile file = Request.Form.Files.GetFile( "imageFile" );
                EditRecipeDto editRecipeDto = JsonConvert.DeserializeObject<EditRecipeDto>( Request.Form[ "data" ].ToString() );

                EditRecipe editRecipe = editRecipeDto.MapToEditRecipe( file );

                await _recipesService.UpdateRecipeWithImageAsync( recipeId, editRecipe, UserId );
                _unitOfWork.Commit();

                return Ok();
            }
            catch ( Exception error )
            {
                return BadRequest( error.Message );
            }
        }

        // POST api/recipe/{recipeId}/update-without-image
        [HttpPost( "{recipeId}/update-without-image" )]
        public IActionResult UpdateRecipeWithoutImage( [FromRoute] int recipeId, [FromBody] EditRecipeDetailDto editRecipeDetailDto )
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Unauthorized();

            try
            {
                Recipe recipe = editRecipeDetailDto.MapToRecipe();
                _recipesService.UpdateRecipeWithOutImage( recipeId, recipe, UserId );
                _unitOfWork.Commit();

                return Ok();
            }
            catch ( Exception error )
            {
                return BadRequest( error.Message );
            }
        }
    }
}
