export interface DishCard {
  id: number,
  title: string,
  description: string,
  keywords: string[],
  author: string,
  likesCount: number,
  starsCount: number,
  time: string,
  personsCount: string,
  image: string, 
  isStarSet: boolean,
  isLikeSet: boolean,
}