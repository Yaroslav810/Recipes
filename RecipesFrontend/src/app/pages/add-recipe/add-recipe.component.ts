import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';

export interface IIngredient {
  title: string,
  value: string[]
}

export interface IStep {
  step: number,
  value: string,
}

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})

export class AddRecipeComponent implements OnInit {

  public details = {
    title: '',
    description: '',
    keywords: [],
    time: null,
    personsCount: null,
    image: null, 
    ingredients: [
      {
        title: '',
        value: [],
      } as IIngredient,
    ],
    steps: [
      {
        step: 1,
        value: '',
      } as IStep,
    ],
  };

  public timeValue = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120];
  public personValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  public goBack(): void {
    this.location.back();
  }

  public onSaveRecipe(): void {
    console.log('Ещё чего???');
    console.log('Пошёл ты со своим: ', this.details);
  }

  public onChangeImage($event: any): void {
    let reader = new FileReader();
    let file = $event.target.files[0];


    reader.onloadend = () => {
      this.details.image = reader.result;
    }

    reader.readAsDataURL(file)
  }

  public onDeleteImage(): void {
    this.details.image = null;
  }

  public addKeyword(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    if (value) {
      this.details.keywords.push(value);
    }

    if (input) {
      input.value = '';
    }
  }

  public removeKeyword(keyword: string): void {
    const index = this.details.keywords.indexOf(keyword);

    if (index >= 0) {
      this.details.keywords.splice(index, 1);
    }
  }

  public addIngredientItem(ingredient: IIngredient, event: MatChipInputEvent): void {
    console.log(ingredient);
    const index = this.details.ingredients.indexOf(ingredient);
    const input = event.input;
    const valueInput = (event.value || '').trim();

    if (valueInput && (index >= 0)) {
      this.details.ingredients[index].value.push(valueInput);
    }

    if (input) {
      input.value = '';
    }
  }

  public removeIngredientItem(item: string, ingredient: IIngredient): void {
    const index = ingredient.value.indexOf(item);

    if (index >= 0) {
      ingredient.value.splice(index, 1);
    }
  }

  public onAddIngredient(): void {
    const ingredients = this.details.ingredients;
    ingredients.push(
      {
        title: '',
        value: [],
      } as IIngredient,
    );
  }

  public onDeleteIngredient(ingredient: IIngredient): void {
    const index = this.details.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.details.ingredients.splice(index, 1); 
    }
  }

  public onAddStep(): void {
    const steps = this.details.steps;

    steps.push(
      {
        step: steps.length + 1,
        value: '',
      } as IStep,
    );
    console.log(this.details.steps);
  }

  public onDeleteStep(step: IStep): void {
    const index = this.details.steps.indexOf(step);

    if (index >= 0) {
      this.details.steps.splice(index, 1); 
    }

    this.details.steps.forEach((item, index) => {
      item.step = index + 1;
    });
  }
}
