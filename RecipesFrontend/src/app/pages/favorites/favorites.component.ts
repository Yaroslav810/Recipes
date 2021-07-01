import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ImageService } from '../../services/image/image.service';
import { RecipesService } from '../../services/recipes/recipes.service';
import { DishCard } from '../../components/dish-card/dish-card';
import { RecipeDto } from '../../dto/recipe/recipe-dto';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public favorites: DishCard[] = [];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private recipesService: RecipesService,
    private imageService: ImageService,
    ) { 
    this.getFavoritesCard();
  }

  ngOnInit(): void {
  }

  private getFavoritesCard(): void {
    this.recipesService.getFavouritesRecipes()
      .then((dishCard: RecipeDto[]) => {
        this.favorites = dishCard.map((recipeDto: RecipeDto) => this.convertToDishCard(recipeDto));
      })
      .catch(() => {
        this.snackBar.open('Ошибка соединения!', 'Закрыть', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
  }

  public openRecipes(card: DishCard): void {
    this.router.navigate(['/recipe', card.id]);
  }

  public onLikeClick(): void { }

  public onStarClick(): void {
    this.getFavoritesCard();
  }

  private convertToDishCard(recipeDto: RecipeDto): DishCard {
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
      image: this.imageService.buildFullPath(recipeDto.imagePath),
      isStarSet: recipeDto.isStarSet,
      isLikeSet: recipeDto.isLikeSet,
    } as DishCard;
  }
}
