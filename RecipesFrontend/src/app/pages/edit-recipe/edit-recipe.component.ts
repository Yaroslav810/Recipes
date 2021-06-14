import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { IFormGroup, IFormBuilder, IFormArray } from '@rxweb/types';

import { DataLossModalComponent } from '../../components/data-loss-modal/data-loss-modal.component';
import { IComponentCanDeactivate } from '../../guards/user-data-deactivate.guard';
import { EditRecipeDto } from '../../dto/edit-recipe/edit-recipe-dto';
import { RecipeService } from '../../services/recipe/recipe.service';
import { IngredientDto } from '../../dto/ingredient/ingredient-dto';
import { StepDto } from '../../dto/step/step-dto';


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit, IComponentCanDeactivate {

  public timeValue: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120];
  public personValue: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public isLoadingActive: boolean = true;
  public isError: boolean = false;
  public formData: IFormGroup<EditRecipeDto>;
  private formBuilder: IFormBuilder;
  private recipeId: number;

  constructor(
    private location: Location, 
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private snackBar: MatSnackBar,
    formBuilder: FormBuilder,
  ) {
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.displayForm();
  }

  public canDeactivate() {
    return !this.hasUnsavedData() || this.shouldSaveData();
  }

  public goBack(): void {
    this.location.back();
  }

  public loadRecipe(): void {
    this.isLoadingActive = true;
    this.isError = false;
    this.displayForm();
  }

  public saveRecipe(): void {
    this.isLoadingActive = true;
    if (this.recipeId) {
      this.onUpdateRecipe();
    } else {
      this.onAddRecipe();
    }
  }

  public onChangeImage($event: any): void {
    const reader = new FileReader();
    const file = $event.target.files[0];

    reader.onloadend = () => {
      this.formData.patchValue({ imagePath: reader.result.toString() });
    }

    reader.readAsDataURL(file);
  }

  public onDeleteImage(): void {
    this.formData.patchValue({ imagePath: null });
  }

  public addKeyword(event: MatChipInputEvent): void {
    const input: any = event.input;
    const keywords = this.formData.controls.keywords as IFormArray<string>;
    let value: string = (event.value || '').trim().toLowerCase();
    value = value[0].toUpperCase() + value.slice(1);

    if (value) {
      if (keywords.value.indexOf(value) !== -1) {
        this.snackBar.open('Данный тег уже есть в списке тегов!', 'Закрыть', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      } else {
        keywords.push(new FormControl(value));
        input.value = '';
      }
    }
  }

  public removeKeyword(keyword: string): void {
    const index = (this.formData.controls.keywords.value).indexOf(keyword);

    if (index >= 0) {
      const keywords = this.formData.controls.keywords as IFormArray<string>;
      keywords.removeAt(index);
    }
  }

  public onAddIngredient(): void {
    const ingredients = this.formData.controls.ingredients as IFormArray<IngredientDto>;
    const ingredientGroup = this.buildIngredientGroup();
    ingredients.push(ingredientGroup);
  }

  public onDeleteIngredient(ingredient: IFormGroup<IngredientDto>): void {
    const index = (this.formData.controls.ingredients.value).indexOf(ingredient.value);

    if (index >= 0) {
      const ingredients = this.formData.controls.ingredients as IFormArray<IngredientDto>;
      ingredients.removeAt(index);
    }
  }

  public addIngredientItem(ingredient: IFormGroup<IngredientDto>, event: MatChipInputEvent): void {
    const input = event.input;
    const valueInput = (event.value || '').trim();

    if (valueInput) {
      (ingredient.controls.items as IFormArray<string>).push(new FormControl(valueInput));

      (input) ? input.value = '' : input;
    }
  }

  public removeIngredientItem(ingredient: IFormGroup<IngredientDto>, index: number): void {
    (ingredient.controls.items as IFormArray<string>).removeAt(index);
  }

  public dropIngredientItem(ingredient: IFormGroup<IngredientDto>, event: CdkDragDrop<string[]>) {
    const ingredientItems = (ingredient.controls.items as IFormArray<string>);

    const currentItem = ingredientItems.at(event.previousIndex);
    ingredientItems.removeAt(event.previousIndex);
    ingredientItems.insert(event.currentIndex, currentItem);
  }

  public onAddStep(): void {
    const steps = this.formData.controls['steps'] as IFormArray<StepDto>;

    const stepGroup = this.buildStepGroup();
    stepGroup.controls.step.patchValue(steps.value.length + 1);
    steps.push(stepGroup);
  }

  public onDeleteStep(step: IFormGroup<StepDto>): void {
    const index = (this.formData.controls.steps.value).indexOf(step.value);

    if (index >= 0) {
      let steps = this.formData.controls.steps as IFormArray<StepDto>;
      steps.removeAt(index);

      let stepsValue = steps.value;
      steps.clear();

      stepsValue.forEach((stepCurrent, index) => {
        const fb = this.buildStepGroup();
        fb.patchValue({
          step: index + 1,
          description: stepCurrent.description
        });
        steps.push(fb);
      });
    }
  }

  private getRecipeIdOrNullFromQuery(): number {
    const recipeId = (this.activatedRoute.firstChild)
        ? Number(this.activatedRoute.firstChild.snapshot.paramMap.get('id'))
        : null;
    return recipeId;
  }

  private shouldSaveData(): Observable<boolean> {
    const dialogRef = this.dialog.open(DataLossModalComponent);

    return dialogRef.afterClosed().pipe(map(x => x ?? false));
  }

  private hasUnsavedData(): boolean {
    return this.formData.dirty;
  }

  private displayForm(): void {
    this.recipeId = this.getRecipeIdOrNullFromQuery();
    this.formData = this.initializationForm();   

    if (!this.recipeId) {   
      this.isLoadingActive = false;
    } else {
      this.recipeService.getRecipeForEdit(this.recipeId)
        .then((editRecipe: EditRecipeDto) => {
          this.updateFormData(editRecipe);        
        })
        .catch(() => {
          this.snackBar.open('Не удалось загрузить рецепт', 'Закрыть', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.isError = true;
        })
        .finally(() => {
          this.isLoadingActive = false;
        });
    } 
  }

  private initializationForm(): IFormGroup<EditRecipeDto> {
    return this.formBuilder.group<EditRecipeDto>({
      title: ['', [Validators.required]],
      description: ['', Validators.maxLength(150)],
      keywords: this.formBuilder.array<string>([]),
      timeInMinutes: [null, Validators.required],
      personsCount: [null, Validators.required],
      imagePath: [null],
      ingredients: this.formBuilder.array([
        this.buildIngredientGroup()
      ]),
      steps: this.formBuilder.array([
        this.buildStepGroup()
      ]),
    });
  }

  private updateFormData(editRecipe: EditRecipeDto): void {
    this.formData.controls.title.patchValue(editRecipe.title);
    this.formData.controls.description.patchValue(editRecipe.description);
    let keywords = this.formData.controls.keywords;
    editRecipe.keywords.forEach(keyword => {
      (keywords as IFormArray<string>).push(new FormControl(keyword));
    });
    this.formData.controls.timeInMinutes.patchValue(editRecipe.timeInMinutes);
    this.formData.controls.personsCount.patchValue(editRecipe.personsCount);
    this.formData.controls.imagePath.patchValue(editRecipe.imagePath);
    (this.formData.controls.ingredients as IFormArray<IngredientDto>).clear();
    let ingredients = this.formData.controls.ingredients;
    editRecipe.ingredients.forEach(ingredient => {
      const fb = this.buildIngredientGroup();
      fb.patchValue(ingredient);
      ingredient.items.forEach(item => {
        (fb.controls.items as IFormArray<string>).push(new FormControl(item))
      });
      (ingredients as IFormArray<IngredientDto>).push(fb);
    });
    (this.formData.controls.steps as IFormArray<StepDto>).clear();
    let steps = this.formData.controls.steps;
    editRecipe.steps.forEach(step => {
      const fb = this.buildStepGroup();
      fb.patchValue(step);
      (steps as IFormArray<StepDto>).push(fb);
    });
  }

  private buildIngredientGroup(): IFormGroup<IngredientDto> {
    return this.formBuilder.group<IngredientDto>({
      title: ['', Validators.required],
      items: this.formBuilder.array<string>([]),
    });
  }

  private buildStepGroup(): IFormGroup<StepDto> {
    return this.formBuilder.group<StepDto>({
      step: [1],
      description: ['', Validators.required],
    });
  }

  private onAddRecipe(): void {
    this.recipeService.addRecipe(this.formData.value)
      .then(() => {
        this.snackBar.open('Рецепт успешно добавлен!', 'Закрыть', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.formData = this.initializationForm();
        // TODO: Редирект на страницу профиля
      })
      .catch(() => {
        this.snackBar.open(
          `- Как дела? - Проблема исправлена, таблицы теперь вообще нет.
          - Ок - Нет таблицы, нет проблем) Да ладно, просто однажды Эрнест 
          Херменгувей поспорил... For sale, baby shoes, never worn`, 'Закрыть', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
        })
      })
      .finally(() => {
        this.isLoadingActive = false;
      });
  }

  private onUpdateRecipe(): void {
    this.recipeService.updateRecipe(this.recipeId, this.formData.value)
      .then(() => {
        this.snackBar.open('Рецепт успешно обновлён!', 'Закрыть', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      })
      .catch(() => {
        this.snackBar.open(
          `- Как дела? - Проблема исправлена, таблицы теперь вообще нет.
          - Ок - Нет таблицы, нет проблем) Да ладно, просто однажды Эрнест 
          Херменгувей поспорил... For sale, baby shoes, never worn`, 'Закрыть', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
        })
      })
      .finally(() => {
        this.isLoadingActive = false;
      });
  }
}
