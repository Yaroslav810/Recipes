import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { DataLossModalComponent } from './../../components/data-loss-modal/data-loss-modal.component';
import { IComponentCanDeactivate } from './../../guards/user-data-deactivate.guard';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit, IComponentCanDeactivate {

  public timeValue: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120];
  public personValue: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public formGroup: FormGroup;

  constructor(
    private location: Location, 
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      "title": ["", Validators.required],
      "description": [""],
      "keywords": this.formBuilder.array([]),
      "timeInMinutes": [null, Validators.required],
      "personsCount": [null, Validators.required],
      "image": [null],
      "ingredients": this.formBuilder.array([
        this.formBuilder.group({
          title: ["", Validators.required],
          value: this.formBuilder.array([])
        })
      ]),
      "steps": this.formBuilder.array([
        this.formBuilder.group({
          value: ["", Validators.required],
        })
      ]),
    });
  }

  public canDeactivate() {
    return !this.hasUnsavedData() || this.shouldSaveData();
  }

  public goBack(): void {
    this.location.back();
  }

  public saveRecipe(): void {
    console.log('Ещё чего???');
    console.log('Пошёл ты со своим: ', this.formGroup.value);
  }

  public onChangeImage($event: any): void {
    const reader = new FileReader();
    const file = $event.target.files[0];

    reader.onloadend = () => {
      this.formGroup.patchValue({ image: reader.result });
    }

    reader.readAsDataURL(file)
  }

  public onDeleteImage(): void {
    this.formGroup.patchValue({ image: null });
  }

  public addKeyword(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    if (value) {
      (<FormArray>this.formGroup.get('keywords')).push(new FormControl(value));
    }

    if (input) {
      input.value = '';
    }
  }

  public removeKeyword(keyword: string): void {
    const index = (this.formGroup.get('keywords').value).indexOf(keyword);

    if (index >= 0) {
      (<FormArray>this.formGroup.get('keywords')).removeAt(index);
    }
  }

  public onAddIngredient(): void {
    const ingredients = <FormArray>this.formGroup.get('ingredients');
    
    ingredients.push(new FormGroup({
      title: new FormControl('', [Validators.required]),
      value: new FormArray([])
    }));
  }

  public onDeleteIngredient(ingredient: FormGroup): void {
    const index = this.formGroup.get('ingredients').value.indexOf(ingredient.value);

    if (index >= 0) {
      (<FormArray>this.formGroup.get('ingredients')).removeAt(index); 
    }
  }

  public addIngredientItem(ingredient: FormGroup, event: MatChipInputEvent): void {
    const input = event.input;
    const valueInput = (event.value || '').trim();

    if (valueInput) {
      (<FormArray>ingredient.get('value')).push(new FormControl(valueInput));

      if (input) {
        input.value = '';
      }
    }
  }

  public removeIngredientItem(ingredient: FormGroup, index: number): void {
    (<FormArray>ingredient.get('value')).removeAt(index);
  }

  public onAddStep(): void {
    (<FormArray>this.formGroup.get('steps')).push(new FormGroup({
      value: new FormControl("", Validators.required)
    }));
  }

  public onDeleteStep(step: FormGroup): void {
    const index = this.formGroup.get('steps').value.indexOf(step.value);

    if (index >= 0) {
      (<FormArray>this.formGroup.get('steps')).removeAt(index);
    }
  }

  private shouldSaveData(): Observable<boolean> {
    const dialogRef = this.dialog.open(DataLossModalComponent);

    return dialogRef.afterClosed().pipe(map(x => x ?? false));
  }

  private hasUnsavedData(): boolean {
    return this.formGroup.dirty;
  }
}
