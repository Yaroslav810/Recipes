import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { IdentificationWindowModalComponent} from './../../components/identification-window-modal/identification-window-modal.component';
import { User } from 'src/app/store/store.reducer';
import { StoreSelectors } from 'src/app/store/store.selectors';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

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
  private user: User;

  constructor(
    private router: Router, 
    private dialog: MatDialog,
    private store$: Store,
  ) { 
    this.links = this.getHeaderNavigation();
    this.showAccountButtons();
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

  private showAccountButtons = (): void => {
    const user: Observable<User> = this.store$.select(StoreSelectors.user);

    user.subscribe(user => {
      if (user) {
        this.accountButtons = [
          {
            title: `Привет, ${user.name}`,
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
        this.accountButtons = [
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
    });
  }

  public isLinkActive(url: string): boolean {
    const queryParamsIndex = this.router.url.indexOf('?');
    const baseUrl = queryParamsIndex === -1 
      ? this.router.url 
      : this.router.url.slice(0, queryParamsIndex);
    return baseUrl === url;
 }

}
