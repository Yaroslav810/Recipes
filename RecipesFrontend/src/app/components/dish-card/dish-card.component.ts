import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { DishCard } from './dish-card';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent implements OnInit {

  @Input() card: DishCard;
  @Input() onOpenDishCard: Function;

  constructor(private recipeService: RecipeService) {  }

  ngOnInit(): void {  }

  public onStarButtonClick(event): void {
    event.stopPropagation();
    if (this.card.isStarSet) {
      this.recipeService.removeFromFavourite(this.card.id);
      this.card.starsCount = --this.card.starsCount;
    } else {
      this.recipeService.addToFavourite(this.card.id);
      this.card.starsCount = ++this.card.starsCount;
    }
    this.card.isStarSet = !this.card.isStarSet;
  }

  public onLikeButtonClick(event): void {
    event.stopPropagation()
    if (this.card.isLikeSet) {
      this.recipeService.removeLike(this.card.id);
      this.card.likesCount = --this.card.likesCount;
    } else {
      this.recipeService.addLike(this.card.id);
      this.card.likesCount = ++this.card.likesCount;
    }
    this.card.isLikeSet = !this.card.isLikeSet;
  }

  public onCardButtonClick = (): void => {
    this.onOpenDishCard(this.card);
  }
}
