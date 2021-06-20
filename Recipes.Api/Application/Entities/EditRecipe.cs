using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Recipes.Api.Application.Dto;

namespace Recipes.Api.Application.Entities
{
    public class EditRecipe
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public List<RecipeTag> Tags { get; set; }
        public int TimeInMinutes { get; set; }
        public int PersonsCount { get; set; }
        public IFormFile Image { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public List<Step> Steps { get; set; }
    }
}
