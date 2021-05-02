import { Component, OnInit, Input } from '@angular/core';
import { IMainCourseCard } from './../../directives/main-course-card/main-course-card-interface';

@Component({
  selector: 'app-main-course-card',
  templateUrl: './main-course-card.component.html',
  styleUrls: ['./main-course-card.component.css']
})

export class MainCourseCardComponent implements OnInit {

  @Input() card: IMainCourseCard;

  constructor() { }

  ngOnInit(): void {
  }

}
