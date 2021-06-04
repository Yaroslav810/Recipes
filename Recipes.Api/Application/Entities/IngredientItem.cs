using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Api.Application.Entities
{
    public class IngredientItem
    {
        public int Id { get; protected set; }
        public string Name { get; set; }
        public int IngredientId { get; set; }
    }
}
