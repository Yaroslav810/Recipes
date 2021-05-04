import { Component, OnInit } from '@angular/core';
import { ISimpleCard } from '../../directives/simple-card/simple-card.interface';
import { IDishCard } from '../../directives/dish-card/dish-card.interface';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  public cards: ISimpleCard[];
  public dishHints: string[];
  public dishCards: IDishCard[];

  searchDishes = '';

  constructor() {
    this.cards = this.getAdvantagesCards();
    this.dishHints = this.getDishHints();
    this.dishCards = this.getDishCards();
  }

  ngOnInit(): void {
  }

  public fillSearchInput = (search: string): void => {
    this.searchDishes = search;
  }

  addCardsHandler = (): void => {
    let response = [
      {
        title: 'Клубничная панна-котта',
        description: 'Десерт, который невероятно легко и быстро готовится. Советую подавать его порционно в красивых бокалах, украсив взбитыми сливками, свежими ягодами и мятой.',
        keywords: ['десерты', 'клубника', 'сливки'],
        likesCount: 8,
        starsCount: 10,
        time: '35  мин',
        personsCount: '5 персон',
        image: 'strawberry-panna-cotta.png', 
        isStarSet: true,
        isLikeSet: false,
      },
      {
        title: 'Мясные фрикадельки',
        description: 'Мясные фрикадельки в томатном соусе - несложное и вкусное блюдо, которым можно порадовать своих близких.',
        keywords: ['вторые блюда', 'мясо', 'соевый соус'],
        likesCount: 7,
        starsCount: 4,
        time: '90  мин',
        personsCount: '4 персоны',
        image: 'meat-meatballs.png', 
        isStarSet: false,
        isLikeSet: false,
      },
    ];
    this.dishCards = this.dishCards.concat(response);
  }

  private getAdvantagesCards = (): ISimpleCard[] => {
    return [
      {
        title: 'Простые блюда',
        description: '',
        icon: 'book.svg',
      },
      {
        title: 'Детское',
        description: '',
        icon: 'magnifier.svg',
      },
      {
        title: 'От шеф-поваров',
        description: '',
        icon: 'chefCap.svg',
      },
      {
        title: 'На праздник',
        description: '',
        icon: 'holiday.svg',
      },
    ];
  }

  private getDishHints = (): string[] => {
    return [
      'мясо',
      'деликатесы',
      'пироги',
      'рыба',
      'пост',
      'пасха2021',
    ];
  }

  private getDishCards = (): IDishCard[] => {
    return [
      {
        title: 'Клубничная панна-котта',
        description: 'Десерт, который невероятно легко и быстро готовится. Советую подавать его порционно в красивых бокалах, украсив взбитыми сливками, свежими ягодами и мятой.',
        keywords: ['десерты', 'клубника', 'сливки'],
        likesCount: 8,
        starsCount: 10,
        time: '35  мин',
        personsCount: '5 персон',
        image: 'strawberry-panna-cotta.png', 
        isStarSet: true,
        isLikeSet: false,
      },
      {
        title: 'Мясные фрикадельки',
        description: 'Мясные фрикадельки в томатном соусе - несложное и вкусное блюдо, которым можно порадовать своих близких.',
        keywords: ['вторые блюда', 'мясо', 'соевый соус'],
        likesCount: 7,
        starsCount: 4,
        time: '90  мин',
        personsCount: '4 персоны',
        image: 'meat-meatballs.png', 
        isStarSet: false,
        isLikeSet: false,
      },
      {
        title: 'Панкейки',
        description: 'Панкейки: меньше, чем блины, но больше, чем оладьи. Основное отличие — в тесте, оно должно быть воздушным, чтобы панкейки не растекались по сковородке...',
        keywords: ['десерты', 'завтрак', 'блины'],
        likesCount: 7,
        starsCount: 25,
        time: '40  мин',
        personsCount: '3 персон',
        image: 'pancakes.png', 
        isStarSet: true,
        isLikeSet: true,
      },
      {
        title: 'Полезное мороженое без сахара',
        description: 'Йогуртовое мороженое сочетает в себе нежный вкус и низкую калорийность, что будет особенно актуально для сладкоежек, соблюдающих диету.',
        keywords: ['десерты', 'вишня', 'мороженое'],
        likesCount: 7,
        starsCount: 4,
        time: '35  мин',
        personsCount: '2 персоны',
        image: 'healthy-ice-cream-without-sugar.png', 
        isStarSet: false,
        isLikeSet: false,
      }
    ];
  }

}
