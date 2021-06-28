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
                throw new ApplicationException( "No user ID detected" );

            return int.Parse( userIdString );
        }
    }
}
