using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Recipes.Api.Application;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Entities;
using Recipes.Api.Application.Mappers;
using Recipes.Api.Application.Services;

namespace Recipes.Api.Controllers
{
    [Route( "api/recipe" )]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipesService _recipesService;
        private readonly IUnitOfWork _unitOfWork;

        public RecipeController( IRecipesService recipesService, IUnitOfWork unitOfWork )
        {
            _recipesService = recipesService;
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
        public RecipeDetailDto GetRecipe( [FromRoute] int recipeId )
        {
            Recipe recipe = _recipesService.GetRecipe( recipeId );
            return ( recipe != null )
                ? recipe.MapToDetail()
                : null;
        }

        // GET api/recipe/{recipeId}/add-like
        [HttpGet( "{recipeId}/add-like" )]
        public void AddLike( [FromRoute] int recipeId )
        {
            _recipesService.AddLike( recipeId );
            _unitOfWork.Commit();
        }

        // GET api/recipe/{recipeId}/remove-like
        [HttpGet( "{recipeId}/remove-like" )]
        public void RemoveLike( [FromRoute] int recipeId )
        {
            _recipesService.RemoveLike( recipeId );
            _unitOfWork.Commit();
        }

        // GET api/recipe/{recipeId}/add-favourite
        [HttpGet( "{recipeId}/add-favourite" )]
        public void AddFavourite( [FromRoute] int recipeId )
        {
            _recipesService.AddFavourite( recipeId );
            _unitOfWork.Commit();
        }

        // GET api/recipe/{recipeId}/remove-favourite
        [HttpGet( "{recipeId}/remove-favourite" )]
        public void RemoveFavourite( [FromRoute] int recipeId )
        {
            _recipesService.RemoveFavourite( recipeId );
            _unitOfWork.Commit();
        }

        // GET api/recipe/{recipeId}/edit
        [HttpGet( "{recipeId}/edit" )]
        public EditRecipeDetailDto GetRecipeForEdit( [FromRoute] int recipeId )
        {
            Recipe recipe = _recipesService.GetRecipe( recipeId );
            return ( recipe != null )
                ? recipe.MapToEditDetail()
                : null;
        }

        // POST api/recipe/add
        [HttpPost( "add" )]
        public async Task<IActionResult> PostAsync()
        {
            try
            {
                IFormFile file = Request.Form.Files.GetFile( "imageFile" );
                EditRecipeDto editRecipeDto = JsonConvert.DeserializeObject<EditRecipeDto>( Request.Form[ "data" ].ToString() );

                EditRecipe addRecipeDto = editRecipeDto.MapToEdit();
                addRecipeDto.Image = file ?? null;

                await _recipesService.CreateRecipeAsync( addRecipeDto );
                _unitOfWork.Commit();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }


        }

        // POST api/recipe/{recipeId}/update-with-image
        [HttpPost( "{recipeId}/update-with-image" )]
        public async Task<IActionResult> PostAsync( [FromRoute] int recipeId )
        {
            try
            {
                IFormFile file = Request.Form.Files.GetFile( "imageFile" );
                EditRecipeDto editRecipeDto = JsonConvert.DeserializeObject<EditRecipeDto>( Request.Form[ "data" ].ToString() );

                EditRecipe editRecipe = editRecipeDto.MapToEdit();
                editRecipe.Image = file ?? null;

                await _recipesService.UpdateRecipeWithImageAsync( recipeId, editRecipe );
                _unitOfWork.Commit();

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        // POST api/recipe/{recipeId}/update-without-image
        [HttpPost( "{recipeId}/update-without-image" )]
        public IActionResult PostWithOutImageAsync( [FromRoute] int recipeId, [FromBody] EditRecipeDetailDto editRecipeDetailDto )
        {
            try
            {
                Recipe recipe = editRecipeDetailDto.MapToRecipe();
                _recipesService.UpdateRecipeWithOutImage( recipeId, recipe );
                _unitOfWork.Commit();

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
