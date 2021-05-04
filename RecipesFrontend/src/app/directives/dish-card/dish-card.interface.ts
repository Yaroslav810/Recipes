export interface IDishCard {
  id: number,
  title: string,
  description: string,
  keywords: string[],
  likesCount: number,
  starsCount: number,
  time: string,
  personsCount: string,
  image: string, 
  isStarSet: boolean,
  isLikeSet: boolean,
}