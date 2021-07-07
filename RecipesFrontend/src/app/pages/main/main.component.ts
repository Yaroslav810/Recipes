import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { SimpleCard } from '../../components/simple-card/simple-card';
import { MainCourseCard } from '../../components/main-course-card/main-course-card';
import { IdentificationWindowModalComponent} from './../../components/identification-window-modal/identification-window-modal.component';
import { RecipeService } from '../../services/recipe/recipe.service';
import { ImageService } from '../../services/image/image.service';
import { RecipeOfDayDto } from '../../dto/recipe-of-day/recipe-of-day-dto';
import { User } from '../../store/store.reducer';
import { StoreSelectors } from '../../store/store.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, OnDestroy {
  public cards: SimpleCard[] = [];
  public hintsDishes: string[] = [];
  public mainCourseCard: MainCourseCard = null;
  public searchDishes = '';
  public isShowLoginButton: boolean = false;
  public subscription: Subscription;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private recipeService: RecipeService,
    private imageService: ImageService,
    private store$: Store,
  ) {
    this.cards = this.getAdvantagesCards();
    this.hintsDishes = this.getDishHints();
  }

  ngOnInit(): void {
    this.getMainCourseCard();
    this.checkUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public searchByHint = (hint: string): void => {
    this.searchDishes = hint;
  }

  public openRecipe = (card: MainCourseCard): void => {
    this.router.navigate(['recipe', card.id]);
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

  public onSearch(): void {
    let inputString = this.searchDishes.trim();
    if (inputString !== '') 
      this.router.navigate(['/recipes'], {
        queryParams: {
          search: inputString, 
        }
      })
  }

  public showModalWindow(): void {
    this.dialog.open(IdentificationWindowModalComponent, {
      autoFocus: false,
      data: 'login',
    });
  }

  private getAdvantagesCards = (): SimpleCard[] => {
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

  private getDishHints = (): string[] => {
    return [
      'Мясо',
      'Деликатесы',
      'Пироги',
      'Рыба',
    ];
  }

  private getMainCourseCard = (): void => {
    this.recipeService.getRecipeOfDay()
      .then((recipeOfDayDto: RecipeOfDayDto) => {
        this.mainCourseCard = this.convertToMainCourseCard(recipeOfDayDto);
      })
      .catch(() => {})
  }

  private convertToMainCourseCard(recipeOfDayDto: RecipeOfDayDto): MainCourseCard {
    return {
      id: recipeOfDayDto.id,
      title: recipeOfDayDto.title,
      description: recipeOfDayDto.description,
      author: recipeOfDayDto.author,
      likesCount: recipeOfDayDto.likesCount,
      imagePath: this.imageService.buildFullPath(recipeOfDayDto.imagePath), 
      timeInMin: recipeOfDayDto.timeInMin + ' мин',
      icon: './assets/images/recipeDay.svg',
    } as MainCourseCard;
  }

  private checkUser(): void {
    const user: Observable<User> = this.store$.select(StoreSelectors.user);
    
    this.subscription = user.subscribe((user) => {
      if (user !== null) {
        this.isShowLoginButton = false;
      } else {
        this.isShowLoginButton = true;
      }
    });
  }
}
