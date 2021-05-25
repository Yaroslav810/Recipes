import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IdentificationWindowModalComponent} from './../../directives/identification-window-modal/identification-window-modal.component';

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

  constructor(private dialog: MatDialog) { 
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
            const modal = this.dialog.open(IdentificationWindowModalComponent, {
              autoFocus: false,
              data: '',
            });
          }
        },
      ];
    }
  }

}
