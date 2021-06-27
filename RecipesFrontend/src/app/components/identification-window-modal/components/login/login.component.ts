import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationDto } from 'src/app/dto/authentication/authentication-dto';
import { AccountService } from 'src/app/services/account/account.service';

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
      .then(() => {
        console.log('Auth пройдена');
      })
      .catch(() => {
        console.log('error');
      })
      .finally(() => {
        this.formGroup.enable();
      });
  }

  public clickButton(path: string): void {
    this.changePage(path);
  }

}
