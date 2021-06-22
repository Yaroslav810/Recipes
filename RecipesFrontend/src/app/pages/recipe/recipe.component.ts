import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DishCard } from '../../components/dish-card/dish-card';
import { RecipeService } from '../../services/recipe/recipe.service';
import { ImageService } from '../../services/image/image.service';
import { Ingredient, Recipe } from './recipe';
import { RecipeDetailDto } from '../../dto/recipe-detail/recipe-detail-dto';
import { IngredientDto } from '../../dto/ingredient/ingredient-dto';
import { StepDto } from '../../dto/step/step-dto';
import { StepCard } from '../../components/step-card/step-card';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})  
export class RecipeComponent implements OnInit {
  
  public recipeDetails: Recipe = null;
  public card: DishCard = null;
  public isLoadingActive: boolean = true;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private imageService: ImageService,
  ) {  }

  ngOnInit(): void {
    this.loadRecipe();
  }

  public goBack(): void {
    this.location.back();
  }

  public openCard(): void {  }

  public loadRecipe(): void {
    const recipeId: number = this.getRecipeIdFromQuery();
    this.updateRecipe(recipeId);
  }

  public openEditPage(): void {
    this.router.navigate(['edit', this.recipeDetails.id]);
  }

  private getRecipeIdFromQuery(): number {
    return Number(this.activatedRoute.snapshot.paramMap.get("id"));
  }

  private updateRecipe(recipeId: number): void {
    this.isLoadingActive = true;
    this.recipeService.getRecipeDetail(recipeId)
      .then((recipeDetails: RecipeDetailDto) => {
        if (recipeDetails === null) {
          this.router.navigate(['/404']);
        } else {
          this.recipeDetails = this.convertToRecipe(recipeDetails);
          this.card = this.convertRecipeForCard(this.recipeDetails);
        }
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
}
