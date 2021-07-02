using System;

namespace Recipes.Api.Application.Entities
{
    public class RecipeOfDay
    {
        public int Id { get; protected set; }
        public int RecipeId { get; set; }
        public DateTime Day { get; set; }
    }
}
