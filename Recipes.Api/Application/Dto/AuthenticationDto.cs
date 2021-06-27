using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Api.Application.Dto
{
    public class AuthenticationDto
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
