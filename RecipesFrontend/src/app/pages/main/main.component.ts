import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { SimpleCard } from '../../components/simple-card/simple-card';
import { MainCourseCard } from '../../components/main-course-card/main-course-card';
import { IdentificationWindowModalComponent} from './../../components/identification-window-modal/identification-window-modal.component';
import { StoreSelectors } from '../../store/store.selectors';
import { User } from '../../store/store.reducer';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { ImageService } from 'src/app/services/image/image.service';
import { RecipeOfDayDto } from 'src/app/dto/recipe-of-day/recipe-of-day-dto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  public isShowLoginButton: boolean = false;
  public cards: SimpleCard[];
  public mainCourseCard: MainCourseCard = null;
  public hintsDishes: string[];
  public searchDishes = '';
  public sub: Subscription;

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

  private getMainCourseCard = (): void => {
    this.recipeService.getRecipeOfDay()
      .then((recipeOfDayDto: RecipeOfDayDto) => {
        this.mainCourseCard = this.convertToMainCourseCard(recipeOfDayDto);
      })
      .catch(() => {})
  }

  public searchByHint = (hint: string): void => {
    this.searchDishes = hint;
  }

  public openRecipe = (card: MainCourseCard): void => {
    this.router.navigate(['recipe', card.id]);
  }

  public onAddRecipe(): void {
    this.router.navigate(['/edit']);
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
    const modal = this.dialog.open(IdentificationWindowModalComponent, {
      autoFocus: false,
      data: 'login',
    });
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

  private getDishHints = (): string[] => {
    return [
      'Мясо',
      'Деликатесы',
      'Пироги',
      'Рыба',
    ];
  }

  private checkUser(): void {
    const user: Observable<User> = this.store$.select(StoreSelectors.user);
    
    this.sub = user.subscribe((user) => {
      if (user !== null) {
        this.isShowLoginButton = false;
      } else {
        this.isShowLoginButton = true;
      }
    });
  }
}
