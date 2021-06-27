import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegistrationDto } from 'src/app/dto/registration/registration-dto';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input() changePage: Function;

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) { 
    this.formGroup = this.formBuilder.group({
      "name": ["", [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(256),
      ]],
      "login": ["", [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(256),
      ]],
      "password": ["", [
        Validators.required,
        Validators.minLength(1),
      ]],
      "confirmPassword": [""],
    }, { validators: this.checkPasswords, });
  }

  ngOnInit(): void {
  }

  public onRegistration(): void {
    console.log('Давайте зарегестрируемся!');
    this.formGroup.disable();
    
    const registrationDto: RegistrationDto = {
      name: this.formGroup.value.name,
      login: this.formGroup.value.login,
      password: this.formGroup.value.password,
    } as RegistrationDto;
    this.accountService.registration(registrationDto);
  }

  private checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
  
    return password === confirmPassword ? null : { notSame: true }     
  }

  public clickButton(path: string): void {
    this.changePage(path);
  }

}
