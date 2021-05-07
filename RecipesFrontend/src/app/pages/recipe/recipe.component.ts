import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IDishCard } from '../../directives/dish-card/dish-card.interface';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})  

export class RecipeComponent implements OnInit {


  public recipeDetails;
  public card: IDishCard;

  constructor(private location: Location) {
    this.recipeDetails = this.getRecipeDetails();
    this.card = this.convertRecipeForCard();
  }

  ngOnInit(): void {
  }

  private getRecipeDetails() {
    return {
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
      ingredients: [
        {
          title: 'Для панна котты',
          value: ['Сливки-20-30% - 500мл.', 'Молоко - 100мл.', 'Желатин - 2ч.л.', 'Сахар - 3ст.л.', 'Ванильный сахар - 2 ч.л.'],
        },
        {
          title: 'Для клубничного желе',
          value: ['Сливки-20-30% - 500мл.', 'Молоко - 100мл.', 'Желатин - 2ч.л.', 'Сахар - 3ст.л.', 'Ванильный сахар - 2 ч.л.'],
        },
      ],
      steps: {
        1: 'Приготовим панна котту: Зальем желатин молоком и поставим на 30 минут для набухания. В сливки добавим сахар и ванильный сахар. Доводим до кипения (не кипятим!).',
        2: 'Добавим в сливки набухший в молоке желатин. Перемешаем до полного растворения. Огонь отключаем. Охладим до комнатной температуры.',
        3: 'Разольем охлажденные сливки по креманкам и поставим в холодильник до полного застывания. Это около 3-5 часов.',
        4: 'Приготовим клубничное желе: Клубнику помоем, очистим от плодоножек. Добавим сахар. Взбиваем клубнику с помощью блендера в пюре.',
        5: 'Добавим в миску с желатином 2ст.ложки холодной воды и сок лимона. Перемешаем и поставим на 30 минут для набухания. Доведем клубничное пюре до кипения. Добавим набухший желатин, перемешаем до полного растворения. Огонь отключаем. Охладим до комнатной температуры.',
        6: 'Сверху на застывшие сливки добавим охлажденное клубничное желе. Поставим в холодильник до полного застывания клубничного желе. Готовую панна коту подаем с фруктами.',
      },
    }
  };

  public goBack(): void {
    this.location.back();
  }

  private convertRecipeForCard(): IDishCard {
    return { 
      id: this.recipeDetails.id,
      title: this.recipeDetails.title,
      description: this.recipeDetails.description,
      keywords: this.recipeDetails.keywords,
      author: this.recipeDetails.author,
      likesCount: this.recipeDetails.likesCount,
      starsCount: this.recipeDetails.starsCount,
      time: this.recipeDetails.time,
      personsCount: this.recipeDetails.personsCount,
      image: this.recipeDetails.image, 
      isStarSet: this.recipeDetails.isStarSet,
      isLikeSet: this.recipeDetails.isLikeSet,
    } as IDishCard;
  }

  public openCard(): void {  }
}
