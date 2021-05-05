import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISimpleCard } from '../../directives/simple-card/simple-card.interface';
import { IDishCard } from '../../directives/dish-card/dish-card.interface';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  public cards: ISimpleCard[];
  public dishTags: string[];
  public dishCards: IDishCard[];

  searchDishes = '';

  constructor(private router: Router) {
    this.cards = this.getAdvantagesCards();
    this.dishTags = this.getDishTags();
    this.dishCards = this.getDishCards();
  }

  ngOnInit(): void {
  }

  public fillSearchInput = (search: string): void => {
    this.searchDishes = search;
  }

  public loadAdditionalCards(): void {
    let response = [
      {
        id: 6,
        title: 'Клубничная панна-котта',
        description: 'Десерт, который невероятно легко и быстро готовится. Советую подавать его порционно в красивых бокалах, украсив взбитыми сливками, свежими ягодами и мятой.',
        keywords: ['десерты', 'клубника', 'сливки'],
        author: 'glazest',
        likesCount: 8,
        starsCount: 10,
        time: '35  мин',
        personsCount: '5 персон',
        image: './assets/images/strawberry-panna-cotta.png', 
        isStarSet: true,
        isLikeSet: false,
      },
      {
        id: 17,
        title: 'Мясные фрикадельки',
        description: 'Мясные фрикадельки в томатном соусе - несложное и вкусное блюдо, которым можно порадовать своих близких.',
        keywords: ['вторые блюда', 'мясо', 'соевый соус'],
        author: 'glazest',
        likesCount: 7,
        starsCount: 4,
        time: '90  мин',
        personsCount: '4 персоны',
        image: './assets/images/meat-meatballs.png', 
        isStarSet: false,
        isLikeSet: false,
      },
    ];
    this.dishCards = this.dishCards.concat(response);
  }

  private getAdvantagesCards(): ISimpleCard[] {
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

  private getDishTags(): string[] {
    return [
      'мясо',
      'деликатесы',
      'пироги',
      'рыба',
      'пост',
      'пасха2021',
    ];
  }

  private getDishCards(): IDishCard[] {
    return [
      {
        id: 2,
        title: 'Клубничная панна-котта',
        description: 'Десерт, который невероятно легко и быстро готовится. Советую подавать его порционно в красивых бокалах, украсив взбитыми сливками, свежими ягодами и мятой.',
        keywords: ['десерты', 'клубника', 'сливки'],
        author: 'glazest',
        likesCount: 8,
        starsCount: 10,
        time: '35  мин',
        personsCount: '5 персон',
        image: './assets/images/strawberry-panna-cotta.png', 
        isStarSet: true,
        isLikeSet: false,
      },
      {
        id: 3,
        title: 'Мясные фрикадельки',
        description: 'Мясные фрикадельки в томатном соусе - несложное и вкусное блюдо, которым можно порадовать своих близких.',
        keywords: ['вторые блюда', 'мясо', 'соевый соус'],
        author: 'horilka',
        likesCount: 7,
        starsCount: 4,
        time: '90  мин',
        personsCount: '4 персоны',
        image: './assets/images/meat-meatballs.png', 
        isStarSet: false,
        isLikeSet: false,
      },
      {
        id: 4,
        title: 'Панкейки',
        description: 'Панкейки: меньше, чем блины, но больше, чем оладьи. Основное отличие — в тесте, оно должно быть воздушным, чтобы панкейки не растекались по сковородке...',
        keywords: ['десерты', 'завтрак', 'блины'],
        author: 'turum-pum-pum',
        likesCount: 7,
        starsCount: 25,
        time: '40  мин',
        personsCount: '3 персон',
        image: './assets/images/pancakes.png', 
        isStarSet: true,
        isLikeSet: true,
      },
      {
        id: 5,
        title: 'Полезное мороженое без сахара',
        description: 'Йогуртовое мороженое сочетает в себе нежный вкус и низкую калорийность, что будет особенно актуально для сладкоежек, соблюдающих диету.',
        keywords: ['десерты', 'вишня', 'мороженое'],
        author: 'sweet-girl',
        likesCount: 7,
        starsCount: 4,
        time: '35  мин',
        personsCount: '2 персоны',
        image: './assets/images/healthy-ice-cream-without-sugar.png', 
        isStarSet: false,
        isLikeSet: false,
      }
    ];
  }

  public openRecipes(card: IDishCard): void {
    this.router.navigate(['/recipe', card.id]);
  }

}
