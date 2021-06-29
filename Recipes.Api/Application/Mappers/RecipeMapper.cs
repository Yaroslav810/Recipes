using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Application.Mappers
{
    public static class RecipeMapper
    {
        public static List<RecipeDto> MapToRecipeDto( this List<Recipe> recipe )
        {
            return recipe.ConvertAll( x => new RecipeDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Author = "",
                Keywords = x.Tags.Select( item => item.Name ).ToArray(),
                ImagePath = x.ImagePath,
                TimeInMin = x.TimeInMin,
                PersonCount = x.PersonCount,
                LikesCount = x.LikesCount,
                StarsCount = x.StarsCount,
                IsStarSet = false,
                IsLikeSet = true,
            } );
        }

        public static RecipeDto MapToRecipeDto( this Recipe recipe, string userLogin )
        {
            return new()
            {
                Id = recipe.Id,
                Title = recipe.Title,
                Description = recipe.Description,
                Author = userLogin,
                Keywords = recipe.Tags.Select( item => item.Name ).ToArray(),
                ImagePath = recipe.ImagePath,
                TimeInMin = recipe.TimeInMin,
                PersonCount = recipe.PersonCount,
                LikesCount = recipe.LikesCount,
                StarsCount = recipe.StarsCount,
                IsStarSet = false,
                IsLikeSet = false,
            };
        }

        public static RecipeDetailDto MapToRecipeDetailDto( this Recipe recipe, string userLogin, bool isEditable )
        {
            return new()
            {
                Id = recipe.Id,
                Title = recipe.Title,
                Description = recipe.Description,
                Author = userLogin,
                Keywords = recipe.Tags.Select( x => x.Name ).ToArray(),
                ImagePath = recipe.ImagePath,
                TimeInMin = recipe.TimeInMin,
                PersonCount = recipe.PersonCount,
                LikesCount = recipe.LikesCount,
                StarsCount = recipe.StarsCount,
                IsStarSet = false,
                IsLikeSet = false,
                IsEditable = isEditable,
                Ingredients = recipe.Ingredients
                    .Select( x => new IngredientDto
                    {
                        Title = x.Name,
                        Items = x.IngredientItems.Select( y => y.Name ).ToArray(),
                    } )
                    .ToArray(),
                Steps = recipe.Steps
                    .OrderBy( x => x.StepNumber )
                    .Select( x => new StepDto
                    {
                        Step = x.StepNumber,
                        Description = x.Description,
                    } )
                    .ToArray(),
            };
        }

        public static Recipe MapToRecipe( this EditRecipeDetailDto editRecipeDetailDto )
        {
            return new()
            {
                Title = editRecipeDetailDto.Title,
                Description = editRecipeDetailDto.Description,
                Tags = editRecipeDetailDto.Keywords.Select( x => new RecipeTag { Name = x } ).ToList(),
                ImagePath = editRecipeDetailDto.ImagePath,
                TimeInMin = editRecipeDetailDto.TimeInMinutes,
                PersonCount = editRecipeDetailDto.PersonsCount,
                Ingredients = editRecipeDetailDto.Ingredients
                    .Select( x => new Ingredient
                    {
                        Name = x.Title,
                        IngredientItems = x.Items.Select( y => new IngredientItem { Name = y } ).ToList(),
                    } )
                    .ToList(),
                Steps = editRecipeDetailDto.Steps
                    .OrderBy( x => x.Step )
                    .Select( x => new Step
                    {
                        StepNumber = x.Step,
                        Description = x.Description,
                    } )
                    .ToList(),
                CreationDateTime = DateTime.Now,
                LikesCount = 0,
                StarsCount = 0,
            };
        }

        public static EditRecipeDetailDto MapToEditDetail( this Recipe recipe )
        {
            return new()
            {
                Title = recipe.Title,
                Description = recipe.Description,
                Keywords = recipe.Tags.Select( x => x.Name ).ToArray(),
                ImagePath = recipe.ImagePath,
                TimeInMinutes = recipe.TimeInMin,
                PersonsCount = recipe.PersonCount,
                Ingredients = recipe.Ingredients
                    .Select( x => new IngredientDto
                    {
                        Title = x.Name,
                        Items = x.IngredientItems.Select( y => y.Name ).ToArray(),
                    } )
                    .ToArray(),
                Steps = recipe.Steps
                    .Select( x => new StepDto
                    {
                        Step = x.StepNumber,
                        Description = x.Description,
                    } )
                    .ToArray(),
            };
        }

        public static EditRecipe MapToEditRecipe( this EditRecipeDto editRecipeDto, IFormFile image )
        {
            return new()
            {
                Title = editRecipeDto.Title,
                Description = editRecipeDto.Description,
                Tags = editRecipeDto.Keywords.Select( x => new RecipeTag { Name = x } ).ToList(),
                TimeInMinutes = editRecipeDto.TimeInMinutes,
                PersonsCount = editRecipeDto.PersonsCount,
                Image = image ?? null,
                Ingredients = editRecipeDto.Ingredients
                    .Select( x => new Ingredient
                    {
                        Name = x.Title,
                        IngredientItems = x.Items.Select( y => new IngredientItem { Name = y } ).ToList(),
                    } )
                    .ToList(),
                Steps = editRecipeDto.Steps
                    .OrderBy( x => x.Step )
                    .Select( x => new Step
                    {
                        StepNumber = x.Step,
                        Description = x.Description,
                    } )
                    .ToList(),
            };
        }

        public static Recipe MapToRecipe( this EditRecipe editRecipe, int authorId, string imagePath, DateTime creationDateTime, int likesCount = 0, int starsCount = 0 )
        {
            return new()
            {
                Title = editRecipe.Title,
                Description = editRecipe.Description,
                Tags = editRecipe.Tags,
                TimeInMin = editRecipe.TimeInMinutes,
                PersonCount = editRecipe.PersonsCount,
                Ingredients = editRecipe.Ingredients,
                Steps = editRecipe.Steps,
                AuthorId = authorId,
                ImagePath = imagePath,
                CreationDateTime = creationDateTime,
                LikesCount = likesCount,
                StarsCount = starsCount,
            };
        }
    }
}