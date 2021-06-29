import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AccountService } from '../../services/account/account.service';
import { PasswordDto } from '../../dto/password/password-dto';

@Component({
  selector: 'app-password-change-window-modal',
  templateUrl: './password-change-window-modal.component.html',
  styleUrls: ['./password-change-window-modal.component.css']
})
export class PasswordChangeWindowModalComponent implements OnInit {
  public isPasswordHide: boolean = true;
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    public dialogRef: MatDialogRef<PasswordChangeWindowModalComponent>
  ) { 
    this.formGroup = this.initializationForm();
  }

  ngOnInit(): void {
  }

  public onChangePassword(): void {
    if (this.formGroup.valid) {
      const value = {
        currentPassword: this.formGroup.value.currentPassword,
        newPassword: this.formGroup.value.newPassword,
      } as PasswordDto;
      this.formGroup.disable();
      this.accountService.onChangePassword(value)
        .then((response) => {
          console.log(response);
          if (response) {
            this.snackBar.open('Пароль успешно изменён!', 'Закрыть', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
            this.dialogRef.close();
          } else {
            this.snackBar.open('Введён неправильный пароль', 'Закрыть', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.formGroup.enable();
          }, 3000);
        })
    } else {
      this.snackBar.open('Проверьте введённые данные', 'Закрыть', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
  }

  private initializationForm(): FormGroup {
    return this.formGroup = this.formBuilder.group({
      "currentPassword": ["", [
        Validators.required, 
        Validators.minLength(5),
      ]],
      "newPassword": ["", [
        Validators.required, 
        Validators.minLength(5),
      ]],
      "newConfirmPassword": [""],
    }, { validators: this.checkPasswords, });
  }

  private checkPasswords(group: FormGroup) {
    const password = group.get('newPassword').value;
    const confirmPassword = group.get('newConfirmPassword').value;
  
    return password === confirmPassword ? null : { notSame: true }    
  }
}
