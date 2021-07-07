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
import { RecipeDto } from '../../dto/recipe/recipe-dto';
import { UserDataDto } from '../../dto/user-data/user-data-dto';
import { UserStatisticsDto } from '../../dto/user-statistics/user-statistics-dto';
import { AccountService } from '../../services/account/account.service';
import { RecipesService } from '../../services/recipes/recipes.service';
import { ImageService } from '../../services/image/image.service';

import { User } from '../../store/store.reducer';
import { StoreSelectors } from '../../store/store.selectors';
import { StoreActions } from '../../store/store.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  public userForm: IFormGroup<UserDto> = null;
  public statistics: StatisticCard[] = [];
  public recipes: DishCard[] = [];
  public isEditing: boolean = false;
  public isLoadingActive: boolean = true;
  public isError: boolean = false;
  public error: any = null;
  private formBuilder: IFormBuilder;
  private subscription: Subscription;

  constructor(
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private store$: Store,
    private accountService: AccountService,
    private recipesService: RecipesService,
    private imageService: ImageService,
    formBuilder: FormBuilder,
  ) { 
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.checkUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
            this.isEditing = false;
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
    this.dialog.open(PasswordChangeWindowModalComponent, {
      autoFocus: false
    });
  }

  public onLikeClick(): void {
    this.getStatistics();
  }

  public onStarClick(): void {
    this.getStatistics();
  }

  private displayData(): void {
    this.isError = false;
    this.isLoadingActive = true;
    this.accountService.getCurrentUserData()
      .then((user: UserDataDto) => {
        this.updateUserInfo(user);
        this.getStatistics();
        this.getUserRecipes();
      })
      .catch((response) => {
        this.isError = true;
        this.error = response;
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

  private getStatistics(): void {
    this.accountService.getStatistics()
      .then((userStatisticsDto: UserStatisticsDto) => {
        this.statistics =  [
          {
            title: 'Всего рецептов',
            icon: 'book.svg',
            value: userStatisticsDto.recipesCount,
          },
          {
            title: 'Всего лайков',
            icon: 'book.svg',
            value: userStatisticsDto.likesCount,
          },
          {
            title: 'В избранных',
            icon: 'book.svg',
            value: userStatisticsDto.favouritesCount,
          }
        ];
      })
      .catch((response) => {
        this.isError = true;
        this.error = response;
      }); 
  }

  private getUserRecipes(): void {
    this.recipesService.getUserRecipes()
      .then((dishCard: RecipeDto[]) => {
        this.recipes = dishCard.map((recipeDto: RecipeDto) => this.convertToDishCard(recipeDto));
      })
      .catch((response) => {
        this.isError = true;
        this.error = response;
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
    
    this.subscription = user.subscribe(() => {
      this.displayData();
    });
  }
}
