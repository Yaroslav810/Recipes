using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Application.Dto
{
    public class RecipeDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string[] Keywords { get; set; }
        public string Author { get; set; }
        public string ImagePath { get; set; }
        public int TimeInMin { get; set; }
        public int PersonCount { get; set; }
        public int LikesCount { get; set; }
        public int StarsCount { get; set; }
        public bool IsStarSet { get; set; }
        public bool IsLikeSet { get; set; }
        public bool IsEditable { get; set; }
        public IngredientDto[] Ingredients { get; set; }
        public StepDto[] Steps { get; set; }
    }
}
