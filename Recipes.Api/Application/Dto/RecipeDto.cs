using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Application.Dto
{
    public class RecipeDto
    {
        public int Id { get; protected set; }
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

        public RecipeDto( Recipe recipe )
        {
            Id = recipe.Id;
            Title = recipe.Title;
            Description = recipe.Description;
            Author = recipe.Author;
            Keywords = recipe.Tags.Select( item => item.Name.ToString() ).ToArray();
            ImagePath = recipe.ImagePath;
            TimeInMin = recipe.TimeInMin;
            PersonCount = recipe.PersonCount;
            LikesCount = recipe.LikesCount;
            StarsCount = recipe.StarsCount;
            IsStarSet = false;
            IsLikeSet = true;
        }

    }
}
