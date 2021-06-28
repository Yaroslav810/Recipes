import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DishCard } from '../../components/dish-card/dish-card';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public favorites: DishCard[];

  constructor(private router: Router) { 
    this.favorites = this.getFavoritesCard();
  }

  ngOnInit(): void {
  }

  private getFavoritesCard(): DishCard[] {
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
    ];
  }

  public openRecipes(card: DishCard): void {
    this.router.navigate(['/recipe', card.id]);
  }
}
