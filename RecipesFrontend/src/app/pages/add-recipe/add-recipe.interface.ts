export interface IIngredient {
  title: string,
  value: string[]
}

export interface IStep {
  step: number,
  value: string,
}

export interface IAddRecipe {
  title: string,
  description: string,
  keywords: string[],
  timeInMinutes: number | null,
  personsCount: number | null,
  image: string | null, 
  ingredients: IIngredient[],
  steps: IStep[],
}