import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ISimpleCard } from '../../directives/simple-card/simple-card.interface';
import { IMainCourseCard } from '../../directives/main-course-card/main-course-card.interface';
import { IdentificationWindowModalComponent} from './../../directives/identification-window-modal/identification-window-modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  public cards: ISimpleCard[];
  public mainCourseCard: IMainCourseCard;
  public hintsDishes: string[];

  searchDishes = '';

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {
    this.cards = this.getAdvantagesCards();
    this.mainCourseCard = this.getMainCourseCard();
    this.hintsDishes = this.getDishHints();
  }

  ngOnInit(): void {
  }

  private getAdvantagesCards = (): ISimpleCard[] => {
    return [
      {
        title: 'Простые блюда',
        description: 'Время приготвления таких блюд не более 1 часа',
        icon: 'book.svg',
      },
      {
        title: 'Детское',
        description: 'Самые полезные блюда которые можно детям любого возраста',
        icon: 'magnifier.svg',
      },
      {
        title: 'От шеф-поваров',
        description: 'Требуют умения, времени и терпения, зато как в ресторане',
        icon: 'chefCap.svg',
      },
      {
        title: 'На праздник',
        description: 'Чем удивить гостей, чтобы все были сыты за праздничным столом',
        icon: 'holiday.svg',
      },
    ];
  }

  private getMainCourseCard = (): IMainCourseCard => {
    // var abc = [];
    // const convertedAbcs = abc.map(x => AbcMapper.Map(x));
    // return AbcMapper.Map(abc);
    return {
      id: 1,
      title: 'Тыквенный супчик на кокосовом молоке',
      description: 'Если у вас осталась тыква, и вы не знаете что с ней сделать, то это решение для вас! Ароматный, согревающий суп-пюре на кокосовом молоке. Можно даже в Пост! ',
      author: 'glazest',
      likesCount: 23,
      time: '35 минут',
      image: './assets/images/pumpkin-soup-with-coconut-milk.png', 
      icon: './assets/images/recipeDay.svg',
    };
  }

  private getDishHints = (): string[] => {
    return [
      'Мясо',
      'Деликатесы',
      'Пироги',
      'Рыба',
    ];
  }

  public searchByHint = (hint: string): void => {
    this.searchDishes = hint;
  }

  public openRecipe = (card: IMainCourseCard): void => {
    console.log('Откроем карточку с id ' + card.id + '?');
  }

  public onAddRecipe(): void {
    this.router.navigate(['/add']);
  }

  public showModalWindow(): void {
    const modal = this.dialog.open(IdentificationWindowModalComponent, {
      autoFocus: false,
      data: 'login',
    });
  }

}
