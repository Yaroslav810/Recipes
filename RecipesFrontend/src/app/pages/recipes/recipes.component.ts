import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SimpleCard } from '../../components/simple-card/simple-card';
import { DishCard } from '../../components/dish-card/dish-card';
import { RecipesService } from '../../services/recipes/recipes.service';
import { RecipeDto } from '../../dto/recipe/recipe-dto';
import { ImageService } from 'src/app/services/image/image.service';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/store/store.reducer';
import { StoreSelectors } from 'src/app/store/store.selectors';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  public cards: SimpleCard[];
  public dishCards: DishCard[] = null;

  public searchDishes: string = '';
  public dishTags: string[];
  public isButtonActive: boolean = false;
  public isLoadingActive: boolean = true;
  public isShowAddButton: boolean = false;
  public sub: Subscription;

  private take: number = 2;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private recipesService: RecipesService,
    private imageService: ImageService,
    private snackBar: MatSnackBar,
    private store$: Store,
  ) {
    this.cards = this.getAdvantagesCards();
    this.dishTags = this.getDishTags();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchDishes = params['search'] || '';
      this.updateRecipes('get');   
    });
    this.checkUser();
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
    this.updateRecipes('update');
  }

  public tryLoadAgain(): void {
    this.updateRecipes('get');  
  }

  public openRecipes(card: DishCard): void {
    this.router.navigate(['/recipe', card.id]);
  }

  public onAddRecipe(): void {
    this.router.navigate(['/edit']);
  }

  public onLikeClick(): void { }

  public onStarClick(): void { }

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

  private updateRecipes(action: string): void {
    const searchString = this.searchDishes.trim();
    const length = (this.dishCards && action !== 'get')? this.dishCards.length : 0;

    this.isLoadingActive = true;
    this.recipesService.getRecipes(searchString, this.take, length)
      .then((dishCard: RecipeDto[]) => {
        const recipes = dishCard.map((recipeDto: RecipeDto) => this.convertToDishCard(recipeDto));
        switch (action) {
          case 'get':
            this.dishCards = recipes
            break;
          case 'update': 
            this.dishCards = this.dishCards.concat(recipes)
            break;
        };    
        this.isButtonActive = dishCard.length === this.take;
      })
      .catch(() => {
        this.snackBar.open('Ошибка соединения!', 'Закрыть', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      })
      .finally(() => {
        this.isLoadingActive = false;
      });
  }

  private convertToDishCard(recipeDto: RecipeDto): DishCard {
    return {
      id: recipeDto.id,
      title: recipeDto.title,
      description: recipeDto.description,
      keywords: recipeDto.keywords,
      author: recipeDto.author,
      likesCount: recipeDto.likesCount,
      starsCount: recipeDto.starsCount,
      time: recipeDto.timeInMin + ' минут',
      personsCount: recipeDto.personCount + ' человек',
      image: this.imageService.buildFullPath(recipeDto.imagePath),
      isStarSet: recipeDto.isStarSet,
      isLikeSet: recipeDto.isLikeSet,
    } as DishCard;
  }

  private checkUser(): void {
    const user: Observable<User> = this.store$.select(StoreSelectors.user);
    
    this.sub = user.subscribe((user) => {
      if (user !== null) {
        this.isShowAddButton = true;
      } else {
        this.isShowAddButton = false;
      }
      this.updateRecipes('get');
    });
  }
}
