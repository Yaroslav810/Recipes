import { StepCard } from "src/app/components/step-card/step-card";

export interface Ingredient {
  title: string,
  value: string[],
}

export interface Recipe {
  id: number,
  title: string,
  description: string,
  keywords: string[],
  author: string,
  image: string, 
  time: string,
  personsCount: string,
  likesCount: number,
  starsCount: number,
  isStarSet: boolean,
  isLikeSet: boolean,
  ingredients: Ingredient[],
  steps: StepCard[],
}