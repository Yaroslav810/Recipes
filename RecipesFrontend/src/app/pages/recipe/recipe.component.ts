import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DishCard } from '../../components/dish-card/dish-card';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { Recipe } from './recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})  

export class RecipeComponent implements OnInit {
  
  public recipeDetails: Recipe;
  public card: DishCard;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {  }

  ngOnInit(): void {
    const recipeId: number = this.getUser();

    this.recipeService.getRecipeDetail(recipeId).then((recipeDetails: Recipe) => {
      if (recipeDetails === null) {
        this.router.navigate(['/404']);
      } else {
        this.recipeDetails = recipeDetails;
        this.card = this.convertRecipeForCard(recipeDetails);
      }
    });
  }

  private getUser(): number {
    return Number(this.activatedRoute.snapshot.paramMap.get("id"));
  }

  public goBack(): void {
    this.location.back();
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

  public openCard(): void {  }
}
