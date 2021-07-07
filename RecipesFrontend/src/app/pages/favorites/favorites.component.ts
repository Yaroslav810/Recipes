import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { ImageService } from '../../services/image/image.service';
import { RecipesService } from '../../services/recipes/recipes.service';
import { DishCard } from '../../components/dish-card/dish-card';
import { RecipeDto } from '../../dto/recipe/recipe-dto';
import { User } from '../../store/store.reducer';
import { StoreSelectors } from '../../store/store.selectors';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public favorites: DishCard[] = [];
  public isLoadingActive: boolean = true;
  public isError: boolean = false;
  public error: any = null;
  public subscription: Subscription = Subscription.EMPTY;

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private imageService: ImageService,
    private store$: Store,
  ) {  }

  ngOnInit(): void {
    this.checkUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getFavoritesCard(): void {
    this.isLoadingActive = true;
    this.isError = false;
    this.recipesService.getFavouritesRecipes()
      .then((dishCard: RecipeDto[]) => {
        this.favorites = dishCard.map((recipeDto: RecipeDto) => this.convertToDishCard(recipeDto));
      })
      .catch((response) => {
        this.isError = true;
        this.error = response;
      })
      .finally(() => {
        this.isLoadingActive = false;
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

  private checkUser(): void {
    const user: Observable<User> = this.store$.select(StoreSelectors.user);
    
    this.subscription = user.subscribe(() => {
      this.getFavoritesCard();
    });
  }
}
