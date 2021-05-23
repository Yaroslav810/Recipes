using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Api.Application.Entities
{
    public class RecipeTag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int RecipeId { get; set; }
    }
}
