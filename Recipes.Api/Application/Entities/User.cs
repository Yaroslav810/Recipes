using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Api.Application.Entities
{
    public class User
    {
        public int Id { get; protected set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        public string About { get; set; }
        public string Password { get; set; }
    }
}
