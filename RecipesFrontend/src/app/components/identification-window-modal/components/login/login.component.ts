import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AuthenticationDto } from 'src/app/dto/authentication/authentication-dto';
import { AccountService } from 'src/app/services/account/account.service';
import { StoreActions } from 'src/app/store/store.actions';
import { IdentificationWindowModalComponent } from '../../identification-window-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() changePage: Function;

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private store$: Store,
    private dialogRef: MatDialogRef<IdentificationWindowModalComponent>,
  ) { 
    this.formGroup = this.formBuilder.group({
      "login": ["", [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(256),
      ]],
      "password": ["", [
        Validators.required,
        Validators.minLength(1),
      ]],
    });
  }

  ngOnInit(): void {
  }

  public onAuthentication(): void {
    this.formGroup.disable();
    
    const authenticationDto: AuthenticationDto = this.formGroup.value;
    this.accountService.authentication(authenticationDto)
      .then((response) => {
        if (response === true) {
          this.accountService.getCurrentUser()
            .then(user => {
              this.store$.dispatch(StoreActions.setUser({user}));
              this.dialogRef.close();
            })
        } else {
          this.snackBar.open(`Неправильный логин или пароль`, 'Закрыть', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      })
      .catch(() => {
        this.snackBar.open(`Ошибка!`, 'Закрыть', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      })
      .finally(() => {
        this.formGroup.enable();
      });
  }

  public clickButton(path: string): void {
    this.changePage(path);
  }

}
