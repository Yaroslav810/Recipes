import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentificationWindowModalComponent } from '../../components/identification-window-modal/identification-window-modal.component';
import { StoreSelectors } from '../../store/store.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationAccessGuard implements CanActivate {
  constructor(
    private store$: Store,
    private dialog: MatDialog,
  ) {  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store$
      .select(StoreSelectors.user)
      .pipe(map(user => {
        if (user !== null) {
          return user !== null
        } else {
          this.dialog.open(IdentificationWindowModalComponent, {
            autoFocus: false,
            data: '',
          });
        }
      }));
  }
}
