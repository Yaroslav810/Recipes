import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { DishCard } from '../../components/dish-card/dish-card';
import { StatisticCard } from '../../components/statistic-card/statistic-card';
import { PasswordChangeWindowModalComponent } from '../../components/password-change-window-modal/password-change-window-modal.component';
import { UserDto } from '../../dto/user/user-dto';
import { AccountService } from '../../services/account/account.service';

import { User } from '../../store/store.reducer';
import { StoreSelectors } from '../../store/store.selectors';
import { StoreActions } from '../../store/store.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  public isEditing: boolean = false;
  public isLoadingActive: boolean = true;
  public isError: boolean = false;
  public statistics: StatisticCard[] = [];
  public recipes: DishCard[];
  public userForm: IFormGroup<UserDto> = null;
  private formBuilder: IFormBuilder;
  private sub: Subscription;

  constructor(
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private store$: Store,
    private accountService: AccountService,
    formBuilder: FormBuilder,
  ) { 
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.displayData();
    this.checkUser();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public goBack(): void {
    this.location.back();
  }

  public onSaveUserData(): void {
    if (this.userForm.valid) {
      this.isLoadingActive = true;
      this.accountService.onChangeUserData(this.userForm.value)
        .then((response) => {
          if (response) {
            this.snackBar.open('Данные успешно обновлены!', 'Закрыть', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
            const user = {
              name: this.userForm.value.name,
              login: this.userForm.value.login,
              about: this.userForm.value.about,
            } as User;
            this.store$.dispatch(StoreActions.setUser({user}));
          } else {
            this.snackBar.open('Такой логин уже есть в системе', 'Закрыть', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          }
        })
        .finally(() => {
          this.isLoadingActive = false;
        })
    } else {
      this.snackBar.open('Ошибка заполнения полей!', 'Закрыть', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
  }

  public openRecipes(card: DishCard): void {
    this.router.navigate(['/recipe', card.id]);
  }

  public onChangePassword(): void {
    const modal = this.dialog.open(PasswordChangeWindowModalComponent, {
      autoFocus: false
    });
  }

  private displayData(): void {
    this.initializationData();
    this.statistics = this.getStatistics();
    this.recipes = this.getUserRecipes();
  }

  private initializationData(): void {
    this.isError = false;
    this.isLoadingActive = true;
    this.accountService.getCurrentUser()
      .then(user => {
        if (user === null){
          this.isError = true;
          this.snackBar.open(`Для доступа к этому ресурсу, необходимо
              войти в аккаунт`, 'Закрыть', {
                duration: 5000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
              });
        } else {
          this.updateUserInfo(user);
        }
      })
      .catch(() => {
        this.isError = true;
      })
      .finally(() => {
        this.isLoadingActive = false;
      });
  }

  private updateUserInfo(user): void {
    if (user !== null) {
      this.userForm = this.formBuilder.group<UserDto>({
        name: [user.name, [
          Validators.required, 
          Validators.minLength(2),
          Validators.pattern(/^([а-яё][А-ЯЁ]+|[a-z][A-Z]+)$/i)
        ]],
        login: [user.login, [
          Validators.required, 
          Validators.minLength(3),
          Validators.pattern(/^([a-zA-Z0-9]+)$/i)
        ]],
        about: [user.about]
      });
    };
  }

  private getStatistics(): StatisticCard[] {
    const userData = {
      recipesCount: 15,
      likesCount: 15,
      starsCount: 15,
    }

    return [
      {
        title: 'Всего рецептов',
        icon: 'book.svg',
        value: userData.recipesCount,
      },
      {
        title: 'Всего лайков',
        icon: 'book.svg',
        value: userData.likesCount,
      },
      {
        title: 'В избранных',
        icon: 'book.svg',
        value: userData.starsCount,
      }
    ];
  }

  private getUserRecipes(): DishCard[] {
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

  private checkUser(): void {
    const user: Observable<User> = this.store$.select(StoreSelectors.user);
    
    this.sub = user.subscribe(() => {
      this.initializationData();
    });
  }
}
