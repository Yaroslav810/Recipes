import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountService } from './services/account/account.service';

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
        console.log(user);
        // this.store$.dispatch(StoreActions.setUser({}));
      })
  }
}
