export interface Ingredient {
  title: string,
  value: string[]
}

export interface Step {
  step: number,
  value: string,
}

export interface AddRecipe {
  title: string,
  description: string,
  keywords: string[],
  timeInMinutes: number | null,
  personsCount: number | null,
  image: string | null, 
  ingredients: Ingredient[],
  steps: Step[],
}