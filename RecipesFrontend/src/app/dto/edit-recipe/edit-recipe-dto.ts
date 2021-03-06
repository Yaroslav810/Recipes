import { IngredientDto } from "../ingredient/ingredient-dto";
import { StepDto } from "../step/step-dto";

export interface EditRecipeDto {
  title: string,
  description: string,
  keywords: string[],
  imageFile: File, 
  timeInMinutes: number,
  personsCount: number,
  ingredients: IngredientDto[],
  steps: StepDto[],
}
