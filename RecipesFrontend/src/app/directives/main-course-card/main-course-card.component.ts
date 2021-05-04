import { Component, OnInit, Input } from '@angular/core';
import { IMainCourseCard } from './main-course-card.interface';

@Component({
  selector: 'app-main-course-card',
  templateUrl: './main-course-card.component.html',
  styleUrls: ['./main-course-card.component.css']
})

export class MainCourseCardComponent implements OnInit {

  @Input() card: IMainCourseCard;
  @Input() onOpenDishCard: Function;

  constructor() { }

  ngOnInit(): void {
  }

  public onCardButtonClick = (): void => {
    this.onOpenDishCard(this.card);
  }

}
