import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountService } from './services/account/account.service';
import { StoreActions } from './store/store.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecipesFrontend';

  constructor(
    private store$: Store,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser()
      .then(user => {
        this.store$.dispatch(StoreActions.setUser({user}));
      })
  }
}
