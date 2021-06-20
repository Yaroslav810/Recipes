using System;
using System.Collections.Generic;
using System.Linq;
using Recipes.Api.Application.Dto;
using Recipes.Api.Application.Entities;

namespace Recipes.Api.Application.Mappers
{
    public static class RecipeMapper
    {
        public static List<RecipeDto> Map( this List<Recipe> recipe )
        {
            if ( recipe == null )
                return null;

            return recipe.ConvertAll( x => new RecipeDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Author = x.Author,
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

        public static RecipeDetailDto MapToDetail( this Recipe recipe )
        {
            return new RecipeDetailDto
            {
                Id = recipe.Id,
                Title = recipe.Title,
                Description = recipe.Description,
                Author = recipe.Author,
                Keywords = recipe.Tags.Select( x => x.Name ).ToArray(),
                ImagePath = recipe.ImagePath,
                TimeInMin = recipe.TimeInMin,
                PersonCount = recipe.PersonCount,
                LikesCount = recipe.LikesCount,
                StarsCount = recipe.StarsCount,
                IsStarSet = false,
                IsLikeSet = true,
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

        public static Recipe Map( this RecipeDetailDto recipeDetailDto )
        {
            if ( recipeDetailDto == null )
                return null;

            return new Recipe
            {
                Title = recipeDetailDto.Title,
                Description = recipeDetailDto.Description,
                Author = recipeDetailDto.Author,
                Tags = recipeDetailDto.Keywords.Select( x => new RecipeTag { Name = x } ).ToList(),
                ImagePath = recipeDetailDto.ImagePath ?? null,
                TimeInMin = recipeDetailDto.TimeInMin,
                PersonCount = recipeDetailDto.PersonCount,
                LikesCount = recipeDetailDto.LikesCount | 0,
                StarsCount = recipeDetailDto.StarsCount | 0,
                CreationDateTime = DateTime.Now,
                Ingredients = recipeDetailDto.Ingredients
                    .Select( x => new Ingredient
                    {
                        Name = x.Title,
                        IngredientItems = x.Items.Select( y => new IngredientItem { Name = y } ).ToList(),
                    } )
                    .ToList(),
                Steps = recipeDetailDto.Steps
                    .OrderBy( x => x.Step )
                    .Select( x => new Step
                    {
                        StepNumber = x.Step,
                        Description = x.Description,
                    } ).ToList(),
            };
        }

        public static Recipe MapToRecipe( this EditRecipeDetailDto editRecipeDetailDto )
        {
            return new Recipe
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
                Author = "Elon Musk",
                CreationDateTime = DateTime.Now,
                LikesCount = 0,
                StarsCount = 0,
            };
        }

        public static EditRecipeDetailDto MapToEditDetail( this Recipe recipe )
        {
            return new EditRecipeDetailDto
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

        public static EditRecipe MapToEdit( this EditRecipeDto editRecipeDto )
        {
            return new EditRecipe
            {
                Title = editRecipeDto.Title,
                Description = editRecipeDto.Description,
                Tags = editRecipeDto.Keywords.Select( x => new RecipeTag { Name = x } ).ToList(),
                TimeInMinutes = editRecipeDto.TimeInMinutes,
                PersonsCount = editRecipeDto.PersonsCount,
                Image = null,
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

        public static Recipe MapToRecipe( this EditRecipe editRecipe )
        {
            return new Recipe
            {
                Title = editRecipe.Title,
                Description = editRecipe.Description,
                Tags = editRecipe.Tags,
                TimeInMin = editRecipe.TimeInMinutes,
                PersonCount = editRecipe.PersonsCount,
                Ingredients = editRecipe.Ingredients,
                Steps = editRecipe.Steps,
                ImagePath = null,
                Author = null,
                CreationDateTime = DateTime.Now,
                LikesCount = 0,
                StarsCount = 0,
            };
        }
    }
}