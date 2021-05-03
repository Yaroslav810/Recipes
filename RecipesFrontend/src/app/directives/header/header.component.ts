import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface IHeaderLinks {
  title: string,
  link: string,
}

export interface IAccountButtons {
  title: string, 
  icon: string,
  onAction($event): void,
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public links: IHeaderLinks[];
  public accountButtons: IAccountButtons[];

  constructor() { 
    this.links = this.getHeaderNavigation();
    this.accountButtons = this.getAccountButtons();
  }

  ngOnInit(): void {
  }

  private getHeaderNavigation = (): IHeaderLinks[] => {
    return [
      {
        title: 'Главная',
        link: '/',
      },
      {
        title: 'Рецепты',
        link: '/recipes',
      },
      {
        title: 'Избранное',
        link: '/favorites',
      },
    ];
  }

  private getAccountButtons = (): IAccountButtons[] => {
    if (false) {
      return [
        {
          title: 'Привет, Татьяна',
          icon: 'user.svg',
          onAction: ($event) => {
            $event.preventDefault();
            console.log('Ого! Ну зачем тыкать на своё имя?');
          }
        },
        {
          title: '',
          icon: 'exit.svg',
          onAction: ($event) => {
            $event.preventDefault();
            console.log('Зачем выходить?');
          }
        },
      ];
    } else {
      return [
        {
          title: 'Войти',
          icon: 'user.svg',
          onAction: ($event) => {
            $event.preventDefault();
            console.log('Ого! Ну войдите войдите');
          }
        },
      ];
    }
  }

}
