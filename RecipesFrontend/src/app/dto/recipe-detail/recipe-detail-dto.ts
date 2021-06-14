import { IngredientDto } from "../ingredient/ingredient-dto";
import { StepDto } from "../step/step-dto";

export interface RecipeDetailDto {
  id: number,
  title: string,
  description: string,
  keywords: string[],
  author: string,
  imagePath: string, 
  timeInMin: number,
  personCount: number,
  likesCount: number,
  starsCount: number,
  isStarSet: boolean,
  isLikeSet: boolean,
  ingredients: IngredientDto[],
  steps: StepDto[],
}
