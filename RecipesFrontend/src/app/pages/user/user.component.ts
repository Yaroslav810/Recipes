import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IFormBuilder, IFormGroup } from '@rxweb/types';

import { DishCard } from '../../components/dish-card/dish-card';
import { StatisticCard } from '../../components/statistic-card/statistic-card';
import { UserDto } from '../../dto/user/user-dto';
import { PasswordChangeWindowModalComponent } from '../../components/password-change-window-modal/password-change-window-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public isEditing: boolean = true;
  public statistics: StatisticCard[] = [];
  public recipes: DishCard[];
  public userForm: IFormGroup<UserDto>;
  private formBuilder: IFormBuilder;

  constructor(
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    formBuilder: FormBuilder
  ) { 
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.displayData();
  }

  public goBack(): void {
    this.location.back();
  }

  public onSaveUserData(): void {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      console.log('Ты: ', this.userForm.value);
      this.snackBar.open('Данные успешно обновлены!', 'Закрыть', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
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
    this.userForm = this.initializationData();
    this.statistics = this.getStatistics();
    this.recipes = this.getUserRecipes();
  }

  private initializationData(): IFormGroup<UserDto> {
    const userData: UserDto = {
      name: 'Yaroslav',
      login: 'Yaroslav',
      password: '',
      about: ':)',
    } as UserDto;

    return this.formBuilder.group<UserDto>({
      name: [userData.name, [
        Validators.required, 
        Validators.minLength(2),
        Validators.pattern(/^([а-яё][А-ЯЁ]+|[a-z][A-Z]+)$/i)
      ]],
      login: [userData.login, [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern(/^([a-zA-Z0-9]+)$/i)
      ]],
      about: [userData.about]
    });
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
}
