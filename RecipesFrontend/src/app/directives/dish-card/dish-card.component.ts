import { Component, OnInit, Input } from '@angular/core';
import { IDishCard } from '../../directives/dish-card/dish-card.interface';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent implements OnInit {

  @Input() card: IDishCard;

  constructor() { }

  ngOnInit(): void {
  }

  public starCountHandler = (): void => {
    if (this.card.isStarSet)
    {
      this.card.starsCount = --this.card.starsCount;
    } else {
      this.card.starsCount = ++this.card.starsCount;
    }
    this.card.isStarSet = !this.card.isStarSet;
  }

  public likeCountHandler = (): void => {
    if (this.card.isLikeSet)
    {
      this.card.likesCount = --this.card.likesCount;
    } else {
      this.card.likesCount = ++this.card.likesCount;
    }
    this.card.isLikeSet = !this.card.isLikeSet;
  }

}
