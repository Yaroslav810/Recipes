import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  @Input() onLikeClick: Function;
  @Input() onStarClick: Function;

  constructor(
    private recipeService: RecipeService,
    private snackBar: MatSnackBar
  ) {  }

  ngOnInit(): void {  }

  public onStarButtonClick(event): void {
    event.stopPropagation();
    if (this.card.isStarSet) {
      this.card.starsCount = --this.card.starsCount;
      this.recipeService.removeFromFavourite(this.card.id)
        .then(() => {
          this.onStarClick();
        })
        .catch((response) => {
          this.card.starsCount = ++this.card.starsCount;
          this.card.isStarSet = !this.card.isStarSet;
          if (response.status === 401) {
            this.snackBar.open('Войдите в аккаунт!', 'Закрыть', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          } else {
            this.snackBar.open('Ошибка!', 'Закрыть', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          }
        });
    } else {
      this.card.starsCount = ++this.card.starsCount;
      this.recipeService.addToFavourite(this.card.id)
        .then(() => {
          this.onStarClick();
        })
        .catch((response) => {
          this.card.starsCount = --this.card.starsCount;
          this.card.isStarSet = !this.card.isStarSet;
          if (response.status === 401) {
            this.snackBar.open('Войдите в аккаунт!', 'Закрыть', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          } else {
            this.snackBar.open('Ошибка!', 'Закрыть', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          }
        });
    }
    this.card.isStarSet = !this.card.isStarSet;
  }

  public onLikeButtonClick(event): void {
    event.stopPropagation()
    if (this.card.isLikeSet) {
      this.card.likesCount = --this.card.likesCount;
      this.recipeService.removeLike(this.card.id)
        .then(() => {
          this.onLikeClick();
        })
        .catch((response) => {
          this.card.likesCount = ++this.card.likesCount;
          this.card.isLikeSet = !this.card.isLikeSet;
          if (response.status === 401) {
            this.snackBar.open('Войдите в аккаунт!', 'Закрыть', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          } else {
            this.snackBar.open('Ошибка!', 'Закрыть', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          }
        }); 
    } else {
      this.card.likesCount = ++this.card.likesCount;
      this.recipeService.addLike(this.card.id)
        .then(() => {
          this.onLikeClick();
        })
        .catch((response) => {
          this.card.likesCount = --this.card.likesCount;
          this.card.isLikeSet = !this.card.isLikeSet;
          if (response.status === 401) {
            this.snackBar.open('Войдите в аккаунт!', 'Закрыть', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          } else {
            this.snackBar.open('Ошибка!', 'Закрыть', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          }
        });
    }
    this.card.isLikeSet = !this.card.isLikeSet;
  }

  public onCardButtonClick = (): void => {
    this.onOpenDishCard(this.card);
  }
}
