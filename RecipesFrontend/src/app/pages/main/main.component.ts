import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { SimpleCard } from '../../components/simple-card/simple-card';
import { MainCourseCard } from '../../components/main-course-card/main-course-card';
import { IdentificationWindowModalComponent} from './../../components/identification-window-modal/identification-window-modal.component';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/store/store.reducer';
import { Store } from '@ngrx/store';
import { StoreSelectors } from 'src/app/store/store.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  public isShowLoginButton: boolean = false;
  public cards: SimpleCard[];
  public mainCourseCard: MainCourseCard;
  public hintsDishes: string[];
  public sub: Subscription;

  searchDishes = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store$: Store,
  ) {
    this.cards = this.getAdvantagesCards();
    this.hintsDishes = this.getDishHints();
  }

  ngOnInit(): void {
    this.mainCourseCard = this.getMainCourseCard();
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

  private getMainCourseCard = (): MainCourseCard => {
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

  public openRecipe = (card: MainCourseCard): void => {
    console.log('Откроем карточку с id ' + card.id + '?');
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
