import { Component, OnInit, Input } from '@angular/core';
import { DishCard } from './dish-card';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent implements OnInit {

  @Input() card: DishCard;
  @Input() onOpenDishCard: Function;

  constructor() { }

  ngOnInit(): void {
  }

  public onStarButtonClick(event): void {
    event.stopPropagation();
    if (this.card.isStarSet) {
      this.card.starsCount = --this.card.starsCount;
    } else {
      this.card.starsCount = ++this.card.starsCount;
    }
    this.card.isStarSet = !this.card.isStarSet;
  }

  public onLikeButtonClick(event): void {
    event.stopPropagation()
    if (this.card.isLikeSet) {
      this.card.likesCount = --this.card.likesCount;
    } else {
      this.card.likesCount = ++this.card.likesCount;
    }
    this.card.isLikeSet = !this.card.isLikeSet;
  }

  public onCardButtonClick = (): void => {
    this.onOpenDishCard(this.card);
  }

}
