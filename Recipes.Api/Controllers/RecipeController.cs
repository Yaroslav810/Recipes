using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Application;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Entities;
using Recipes.Api.Application.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Recipes.Api.Controllers
{
    [Route( "api/recipe" )]
    [ApiController]
    public class RecipeController : ControllerBase
    {

        protected readonly IRecipesService _recipesService;
        //protected readonly IUnitOfWork _unitOfWork; 

        public RecipeController( IRecipesService recipesService ) // TODO: Сделать подключение UnitOfWork: IUnitOfWork unitOfWork )
        {
            _recipesService = recipesService;
            //_unitOfWork = unitOfWork;
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

        // GET api/recipe/{id}
        [HttpGet( "{id}" )]
        public RecipeDetailDto Get( int id )
        {
            Recipe recipe = _recipesService.GetRecipe( id );
            if ( recipe != null ) return new RecipeDetailDto( recipe );
            return null;
        }

        // GET api/recipe/{recipeId}/addlike
        [HttpGet( "{recipeId}/addlike" )]
        public int? AddLike( int recipeId )
        {
            return _recipesService.AddLike( recipeId );
        }

        // GET api/recipe/{id}/removelike
        [HttpGet( "{id}/removelike" )]
        public string RemoveLike( int id )
        {
            return "Убрали лайк для: " + id;
        }

        // GET api/recipe/{id}/addFavourite
        [HttpGet( "{id}/addfavourite" )]
        public string AddFavourite( int id )
        {
            return "Добавили в Избранное: " + id;
        }

        // GET api/recipe/{id}/removeFavourite
        [HttpGet( "{id}/removefavourite" )]
        public string RemoveFavourite( int id )
        {
            return "Убрали из Избранного: " + id;
        }

        // POST api/recipe
        /*[HttpPost]
        public void Post( [FromBody] string value )
        {
        }*/

        // PUT api/recipe/5
        /*[HttpPut( "{id}" )]
        public void Put( int id, [FromBody] string value )
        {
        }*/

        // DELETE api/recipe/5
        /*[HttpDelete( "{id}" )]
        public void Delete( int id )
        {
        }*/
    }
}
