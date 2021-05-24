import { Component, OnInit, Input } from '@angular/core';
import { MainCourseCard } from './main-course-card';

@Component({
  selector: 'app-main-course-card',
  templateUrl: './main-course-card.component.html',
  styleUrls: ['./main-course-card.component.css']
})

export class MainCourseCardComponent implements OnInit {

  @Input() card: MainCourseCard;
  @Input() onOpenDishCard: Function;

  constructor() { }

  ngOnInit(): void {
  }

  public onCardButtonClick = (): void => {
    this.onOpenDishCard(this.card);
  }

}
