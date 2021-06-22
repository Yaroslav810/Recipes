import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFormBuilder, IFormGroup } from '@rxweb/types';

import { DishCard } from '../../components/dish-card/dish-card';
import { UserDto } from '../../dto/user/user-dto';

export interface Statistic {
  title: string,
  icon: string,
  value: string,
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public passwordHide: boolean = true;
  public isEditing: boolean = false;
  public statistics: Statistic[] = [];
  public recipes: DishCard[];
  public userForm: IFormGroup<UserDto>;
  private formBuilder: IFormBuilder;

  constructor(
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar,
    formBuilder: FormBuilder,
  ) { 
    this.formBuilder = formBuilder;
    this.statistics = [
      {
        title: 'Всего рецептов',
        icon: 'book.svg',
        value: '...',
      },
      {
        title: 'Всего лайков',
        icon: 'book.svg',
        value: '...',
      },
      {
        title: 'В избранных',
        icon: 'book.svg',
        value: '...',
      }
    ];
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
      this.isEditing = false;
    } else {
      this.snackBar.open('Пожалуйста, заполните все обязательные поля', 'Закрыть', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
  }

  public openRecipes(card: DishCard): void {
    this.router.navigate(['/recipe', card.id]);
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
      name: [userData.name, [Validators.required]],
      login: [userData.login, Validators.required],
      password: [''],
      about: [userData.about]
    });
  }

  private getStatistics(): Statistic[] {
    const userData = {
      recipesCount: 15,
      likesCount: 15,
      starsCount: 15,
    }

    return [
      {
        title: 'Всего рецептов',
        icon: 'book.svg',
        value: userData.recipesCount.toString(),
      },
      {
        title: 'Всего лайков',
        icon: 'book.svg',
        value: userData.likesCount.toString(),
      },
      {
        title: 'В избранных',
        icon: 'book.svg',
        value: userData.starsCount.toString(),
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
