using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Application.Entities;
using Recipes.Api.Application.Services;

namespace Recipes.Api.Controllers
{
    [Route( "static" )]
    [ApiController]
    public class StaticController : ControllerBase
    {
        protected readonly IFileService _fileService;

        public StaticController( IFileService fileService )
        {
            _fileService = fileService;
        }

        // GET: static/images/{directory}/{name}
        [HttpGet( "images/{directory}/{name}" )]
        public async Task<IActionResult> GetAsync( string directory, string name )
        {
            string fullPath = $"{directory}/{name}";
            Image image = await _fileService.GetImageAsync( fullPath );

            if ( image != null )
            {
                return File( image.Content, $"image/{image.Type}", image.Name );
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
