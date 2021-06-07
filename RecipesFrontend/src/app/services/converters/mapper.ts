import { Ingredient, Recipe } from "../../pages/recipe/recipe";
import { StepCard } from "../../components/step-card/step-card";
import { DishCard } from "../../components/dish-card/dish-card"

import { IngredientDto } from "../../dto/ingredient/ingredient-dto";
import { RecipeDetailDto } from "../../dto/recipe-detail/recipe-detail-dto";
import { RecipeDto } from "../../dto/recipe/recipe-dto";
import { StepDto } from "../../dto/step/step-dto";


export class Mapper {

  public static convertToDishCard(recipeDto: RecipeDto): DishCard {
    return {
      id: recipeDto.id,
      title: recipeDto.title,
      description: recipeDto.description,
      keywords: recipeDto.keywords,
      author: recipeDto.author,
      likesCount: recipeDto.likesCount,
      starsCount: recipeDto.starsCount,
      time: recipeDto.timeInMin + ' минут',
      personsCount: recipeDto.personCount + ' человек',
      image: recipeDto.imagePath,
      isStarSet: recipeDto.isStarSet,
      isLikeSet: recipeDto.isLikeSet,
    } as DishCard;
  }

  public static convertToRecipe(recipeDetailDto: RecipeDetailDto): Recipe {
    return {
      id: recipeDetailDto.id,
      title: recipeDetailDto.title,
      description: recipeDetailDto.description,
      keywords: recipeDetailDto.keywords,
      author: recipeDetailDto.author,
      image: recipeDetailDto.imagePath, 
      time: recipeDetailDto.timeInMin + ' мин',
      personsCount: recipeDetailDto.personCount + ' человек',
      likesCount: recipeDetailDto.likesCount,
      starsCount: recipeDetailDto.starsCount,
      isStarSet: recipeDetailDto.isStarSet,
      isLikeSet: recipeDetailDto.isLikeSet,
      ingredients: recipeDetailDto.ingredients.map((ingredientDto: IngredientDto) => ({
        title: ingredientDto.title, 
        value: ingredientDto.items
      } as Ingredient)),
      steps: recipeDetailDto.steps.map((step: StepDto) => ({
        key: step.step,
        value: step.description
      } as StepCard)),
    } as Recipe;
  }
}