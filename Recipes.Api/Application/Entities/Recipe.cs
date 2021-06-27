using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Api.Application.Entities
{
    public class Recipe
    {
        public int Id { get; protected set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int AuthorId { get; set; }
        public int LikesCount { get; set; }
        public int StarsCount { get; set; }
        public int TimeInMin { get; set; }
        public int PersonCount { get; set; }
        public string ImagePath { get; set; }
        public DateTime CreationDateTime { get; set; }
        public List<RecipeTag> Tags { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public List<Step> Steps { get; set; }
    }
}
