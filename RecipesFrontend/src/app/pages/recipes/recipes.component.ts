import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SimpleCard } from '../../components/simple-card/simple-card';
import { RecipesService } from '../../services/recipes/recipes.service';
import { DishCard } from 'src/app/components/dish-card/dish-card';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  public cards: SimpleCard[];
  public dishTags: string[];
  public dishCards: DishCard[] = null;

  public searchDishes: string = '';
  public isButtonActive: boolean = false;

  private take: number = 2;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private recipesService: RecipesService
  ) {
    this.cards = this.getAdvantagesCards();
    this.dishTags = this.getDishTags();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const searchString = params['search'] || '';
      this.searchDishes = searchString;
      this.recipesService.getRecipes(searchString, this.take, 0).then((dishCard: DishCard[]) => {
        this.dishCards = dishCard;
        this.isButtonActive = dishCard.length === this.take;
      });
    });
  }

  public changeQuery(): void {
    const inputString = this.searchDishes.trim();
    if (inputString !== '') {
      this.router.navigate(['/recipes'], {
        queryParams: {
          search: inputString, 
        }
      });
    }
  }

  public searchByHint = (search: string): void => {
    this.searchDishes = search;
    this.changeQuery();
  }

  public loadAdditionalCards(): void {
    this.recipesService.getRecipes(this.searchDishes, this.take, this.dishCards.length).then((dishCard: DishCard[]) => {
      this.dishCards = this.dishCards.concat(dishCard);
      this.isButtonActive = dishCard.length === this.take;
    });
  }

  public openRecipes(card: DishCard): void {
    this.router.navigate(['/recipe', card.id]);
  }

  public onAddRecipe(): void {
    this.router.navigate(['/add']);
  }

  private getAdvantagesCards(): SimpleCard[] {
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
}
