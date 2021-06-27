using System;
using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Application.Services;

namespace Recipes.Api.Controllers
{
    public class BaseController : ControllerBase
    {
        public int UserId => GetUserId();

        private int GetUserId()
        {
            string userIdString = User.FindFirst( "UserId" )?.Value;
            if ( string.IsNullOrEmpty( userIdString ) )
                throw new Exception( "The user with this id was not found" );

            return int.Parse( userIdString );
        }
    }
}
