using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Api.Application.Entities
{
    public class Step
    {
        public int Id { get; protected set; }
        public string Description { get; set; }
        public int RecipeId { get; set; }
    }
}
