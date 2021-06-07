export interface RecipeDto {
  id: number,
  title: string,
  description: string,
  keywords: string[],
  author: string,
  likesCount: number,
  starsCount: number,
  timeInMin: number,
  personCount: number,
  imagePath: string, 
  isStarSet: boolean,
  isLikeSet: boolean,
}
