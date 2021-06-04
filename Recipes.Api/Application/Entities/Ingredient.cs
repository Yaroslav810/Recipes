using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Api.Application.Entities
{
    public class Ingredient
    {
        public int Id { get; protected set; }
        public string Name { get; set; }
        public int RecipeId { get; set; }
        public List<IngredientItem> IngredientItems { get; set; }
    }
}
