using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Application.Mappers
{
    public static class AccountMapper
    {
        public static User MapToUser( this RegistrationDto registrationDto )
        {
            return new()
            {
                FirstName = registrationDto.Name,
                Login = registrationDto.Login,
                Password = registrationDto.Password,
                LastName = "",
                About = "",
            };
        }

        public static User MapToUser( this AuthenticationDto authenticationDto )
        {
            return new()
            {
                Login = authenticationDto.Login,
                Password = authenticationDto.Password,
                FirstName = "",
                LastName = "",
                About = "",
            };
        }

        public static UserDataDto MapToUserData( this User user )
        {
            return new()
            {
                Id = user.Id,
                Name = user.FirstName,
                Login = user.Login,
                About = user.About,
            };
        }

        public static User MapToUser( this UserDto userDto )
        {
            return new User()
            {
                FirstName = userDto.Name,
                Login = userDto.Login,
                About = userDto.About,
            };
        }
    }
}
