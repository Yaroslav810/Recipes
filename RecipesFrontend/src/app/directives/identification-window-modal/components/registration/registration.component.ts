import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input() changePage: Function;

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
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

  private checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
  
    return password === confirmPassword ? null : { notSame: true }     
  }

  public clickButton(path: string): void {
    this.changePage(path);
  }

}
