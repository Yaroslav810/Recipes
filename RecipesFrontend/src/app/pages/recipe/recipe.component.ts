import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';

import { DishCard } from '../../components/dish-card/dish-card';
import { RecipeService } from '../../services/recipe/recipe.service';
import { ImageService } from '../../services/image/image.service';
import { Ingredient, Recipe } from './recipe';
import { RecipeDetailDto } from '../../dto/recipe-detail/recipe-detail-dto';
import { IngredientDto } from '../../dto/ingredient/ingredient-dto';
import { StepDto } from '../../dto/step/step-dto';
import { StepCard } from '../../components/step-card/step-card';
import { User } from '../../store/store.reducer';
import { StoreSelectors } from '../../store/store.selectors';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})  
export class RecipeComponent implements OnInit, OnDestroy  {
  
  public recipeDetails: Recipe = null;
  public card: DishCard = null;
  public isLoadingActive: boolean = true;
  public isShowControlButtons: boolean = false;
  private sub: Subscription;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private imageService: ImageService,
    private store$: Store,
    private snackBar: MatSnackBar,
  ) {  }

  ngOnInit(): void {
    const recipeId: number = this.getRecipeIdFromQuery();

    this.loadRecipe(recipeId);
    this.checkUser(recipeId);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public goBack(): void {
    this.location.back();
  }

  public openCard(): void {  }

  public loadRecipe(recipeId: number): void {
    this.updateRecipe(recipeId);
  }

  public openEditPage(): void {
    this.router.navigate(['edit', this.recipeDetails.id]);
  }

  public onDeleteRecipe(): void {
    const recipeId = this.getRecipeIdFromQuery();

    this.recipeService.deleteRecipe(recipeId)
      .then(() => {
        this.router.navigate(['recipes']);
        this.snackBar.open('Рецепт успешно удалён!', 'Закрыть', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      })
      .catch(() => {
        this.snackBar.open('Такой логин уже есть в системе', 'Закрыть', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
  }

  public onLikeClick(): void { }

  public onStarClick(): void { }

  private getRecipeIdFromQuery(): number {
    return Number(this.activatedRoute.snapshot.paramMap.get("id"));
  }

  private updateRecipe(recipeId: number): void {
    this.isLoadingActive = true;
    this.recipeService.getRecipeDetail(recipeId)
      .then((recipeDetails: RecipeDetailDto) => {
        this.recipeDetails = this.convertToRecipe(recipeDetails);
        this.card = this.convertRecipeForCard(this.recipeDetails);
        this.isShowControlButtons = recipeDetails.isEditable;
      })
      .catch((response) => {
        if (response.status === 404) {
          this.router.navigate(['/404']);
        };
      })
      .finally(() => {
        this.isLoadingActive = false;
      });
  }

  private convertToRecipe(recipeDetailDto: RecipeDetailDto): Recipe {
    return {
      id: recipeDetailDto.id,
      title: recipeDetailDto.title,
      description: recipeDetailDto.description,
      keywords: recipeDetailDto.keywords,
      author: recipeDetailDto.author,
      image: this.imageService.buildFullPath(recipeDetailDto.imagePath), 
      time: recipeDetailDto.timeInMin + ' мин',
      personsCount: recipeDetailDto.personCount + ' человек',
      likesCount: recipeDetailDto.likesCount,
      starsCount: recipeDetailDto.starsCount,
      isStarSet: recipeDetailDto.isStarSet,
      isLikeSet: recipeDetailDto.isLikeSet,
      ingredients: recipeDetailDto.ingredients.map((ingredientDto: IngredientDto) => ({
        title: ingredientDto.title, 
        value: ingredientDto.items
      } as Ingredient)),
      steps: recipeDetailDto.steps.map((step: StepDto) => ({
        key: step.step,
        value: step.description
      } as StepCard)),
    } as Recipe;
  }

  private convertRecipeForCard(recipeDetails: Recipe): DishCard {
    return { 
      id: recipeDetails.id,
      description: recipeDetails.description,
      keywords: recipeDetails.keywords,
      author: recipeDetails.author,
      likesCount: recipeDetails.likesCount,
      starsCount: recipeDetails.starsCount,
      time: recipeDetails.time,
      personsCount: recipeDetails.personsCount,
      image: recipeDetails.image, 
      isStarSet: recipeDetails.isStarSet,
      isLikeSet: recipeDetails.isLikeSet,
    } as DishCard;
  }

  private checkUser(recipeId: number): void {
    const user: Observable<User> = this.store$.select(StoreSelectors.user);
    
    this.sub = user.subscribe(() => {
      this.recipeService.isRecipeEditable(recipeId)
        .then((isEditable: boolean) => {
          this.isShowControlButtons = isEditable;
          const recipeId: number = this.getRecipeIdFromQuery();
          this.loadRecipe(recipeId);
        });
    });
  }
}
