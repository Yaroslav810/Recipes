import { IngredientDto } from "../ingredient/ingredient-dto";
import { StepDto } from "../step/step-dto";

export interface EditRecipeDetailDto {
  title: string,
  description: string,
  keywords: string[],
  imagePath: string, 
  timeInMinutes: number,
  personsCount: number,
  ingredients: IngredientDto[],
  steps: StepDto[],
}
