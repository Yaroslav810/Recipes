import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { SimpleCard } from '../../components/simple-card/simple-card';
import { DishCard } from '../../components/dish-card/dish-card';
import { RecipesService } from '../../services/recipes/recipes.service';
import { RecipeDto } from '../../dto/recipe/recipe-dto';
import { ImageService } from '../../services/image/image.service';
import { IdentificationWindowModalComponent } from '../../components/identification-window-modal/identification-window-modal.component';
import { StoreSelectors } from '../../store/store.selectors';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  public cards: SimpleCard[] = [];
  public dishCards: DishCard[] = null;
  public searchDishes: string = '';
  public dishTags: string[] = [];
  public isButtonActive: boolean = false;
  public isLoadingActive: boolean = true;
  public isError: boolean = false;
  public error: any = null;
  public subscription: Subscription = new Subscription();
  private take: number = 2;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private recipesService: RecipesService,
    private imageService: ImageService,
    private store$: Store,
    private dialog: MatDialog,
  ) {
    this.cards = this.getAdvantagesCards();
    this.dishTags = this.getDishTags();
  }

  ngOnInit(): void {
    this.checkQuery();
    this.checkUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  public openRecipes(card: DishCard): void {
    this.router.navigate(['/recipe', card.id]);
  }

  public onAddRecipe(): void {
    this.store$
      .select(StoreSelectors.user)
      .pipe(take(1))
      .subscribe((user) => {
        if (user !== null) {
          this.router.navigate(['/edit']);
        } else {
          this.dialog.open(IdentificationWindowModalComponent, {
            autoFocus: false,
            data: '',
          });
        }
      });
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
    const length = (this.dishCards && action !== 'get') ? this.dishCards.length : 0;

    this.isLoadingActive = true;
    this.isError = false;
    this.recipesService.getRecipes(searchString, this.take, length)
      .then((recipesDto: RecipeDto[]) => {
        const recipes = recipesDto.map((recipeDto: RecipeDto) => 
          this.convertToDishCard(recipeDto));
        switch (action) {
          case 'get':
            this.dishCards = recipes
            break;
          case 'update': 
            this.dishCards = this.dishCards.concat(recipes)
            break;
        };    
        this.isButtonActive = recipesDto.length === this.take;
      })
      .catch((response) => {
        this.isError = true;
        this.error = response;
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

  private checkQuery(): void {
    this.subscription.add(
      this.activatedRoute.queryParams
        .subscribe(params => {
          this.searchDishes = params['search'] || '';
          this.updateRecipes('get');   
        })
    );
  }

  private checkUser(): void {  
    const user = this.store$.select(StoreSelectors.user);

    this.subscription.add(
      user.subscribe(() => {
        this.updateRecipes('get');
      })
    );
  }
}
