import { DishCard } from "../../components/dish-card/dish-card"
import { RecipeDto } from "../../dto/recipe/recipe-dto";

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
}