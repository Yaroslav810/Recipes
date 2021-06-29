using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Application;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Entities;
using Recipes.Api.Application.Mappers;
using Recipes.Api.Application.Services;

namespace Recipes.Api.Controllers
{
    [Route( "api/account" )]
    [ApiController]
    public class AccountController : BaseController
    {
        private readonly IAccountService _accountService;
        private readonly IUnitOfWork _unitOfWork;

        public AccountController( IAccountService accountService, IUnitOfWork unitOfWork )
        {
            _accountService = accountService;
            _unitOfWork = unitOfWork;
        }

        // POST api/account/registration
        [HttpPost( "registration" )]
        public IActionResult Registration( [FromBody] RegistrationDto registrationDto )
        {
            if ( User.Identity is { IsAuthenticated: true } )
                return BadRequest();

            if ( registrationDto == null )
                return BadRequest();

            User user = registrationDto.MapToUser();

            bool status = _accountService.TryRegistrationUser( user );
            if ( status )
            {
                _unitOfWork.Commit();
            }

            return Ok( status );
        }

        // POST api/account/authentication
        [HttpPost( "authentication" )]
        public async Task<IActionResult> Authentication( [FromBody] AuthenticationDto authenticationDto )
        {
            if ( User.Identity is { IsAuthenticated: true } )
                return BadRequest();

            if ( authenticationDto == null )
                return BadRequest();

            User user = authenticationDto.MapToUser();
            User currentUser = _accountService.GetUserIfValid( user );
            if ( currentUser == null )
                return Ok( false );

            await Authenticate( currentUser );
            return Ok( true );
        }

        // GET api/account/get-current-user
        [HttpGet( "get-current-user" )]
        public IActionResult GetCurrentUser()
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Ok( null );

            User user = _accountService.GetUserById( UserId );
            UserDataDto userDataDto = user.MapToUserData();

            return Ok( userDataDto );
        }

        // POST api/account/change-user-data
        [HttpPost( "change-user-data" )]
        public IActionResult ChangeUserData( [FromBody] UserDto userDto )
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Unauthorized();

            if ( userDto == null )
                return BadRequest();

            User user = userDto.MapToUser();
            bool status = _accountService.ChangeUserData( user, UserId );
            if ( status )
                _unitOfWork.Commit();

            return Ok( status );
        }

        // POST api/account/change-user-password
        [HttpPost( "change-user-password" )]
        public IActionResult ChangeUserPassword( [FromBody] PasswordDto passwordDto )
        {
            if ( !( User.Identity is { IsAuthenticated: true } ) )
                return Unauthorized();

            if ( passwordDto == null )
                return BadRequest();

            try
            {
                bool status = _accountService.ChangeUserPassword( passwordDto, UserId );
                if ( status )
                    _unitOfWork.Commit();

                return Ok( status );
            }
            catch ( Exception error )
            {
                return BadRequest( error.Message );
            }
        }

        // POST api/account/logout
        [HttpPost( "logout" )]
        public void Logout()
        {
            HttpContext.SignOutAsync( CookieAuthenticationDefaults.AuthenticationScheme );
        }

        private async Task Authenticate( User user )
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
                new Claim("UserId", user.Id.ToString()),
            };
            ClaimsIdentity identity = new ClaimsIdentity( claims, CookieAuthenticationDefaults.AuthenticationScheme );

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal( identity ),
                new AuthenticationProperties
                {
                    AllowRefresh = true,
                    ExpiresUtc = DateTime.UtcNow.AddDays( 30 ),
                    IsPersistent = true,
                    IssuedUtc = DateTime.SpecifyKind( DateTime.UtcNow, DateTimeKind.Utc ),
                } );
        }
    }
}
