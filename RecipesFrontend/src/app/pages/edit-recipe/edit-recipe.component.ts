import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { IFormGroup, IFormBuilder, IFormArray } from '@rxweb/types';
import { Observable, Subscription } from "rxjs";
import { map } from 'rxjs/operators';

import { DataLossModalComponent } from '../../components/data-loss-modal/data-loss-modal.component';
import { IComponentCanDeactivate } from '../../guards/user-data-deactivate/user-data-deactivate.guard';
import { RecipeService } from '../../services/recipe/recipe.service';
import { ImageService } from '../../services/image/image.service';
import { EditRecipeDto } from '../../dto/edit-recipe/edit-recipe-dto';
import { IngredientDto } from '../../dto/ingredient/ingredient-dto';
import { StepDto } from '../../dto/step/step-dto';
import { EditRecipeDetailDto } from '../../dto/edit-recipe-detail/edit-recipe-detail-dto';
import { User } from '../../store/store.reducer';
import { StoreSelectors } from '../../store/store.selectors';


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit, IComponentCanDeactivate {
  public typeFile: string[] = ['image/png', 'image/jpeg', 'image/webp'];
  public timeValue: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120];
  public personValue: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public previewImage: string = null;
  public formData: IFormGroup<EditRecipeDto>;
  public isLoadingActive: boolean = true;
  public isError: boolean = false;
  public error: any = null;
  private formBuilder: IFormBuilder;
  private subscription: Subscription = Subscription.EMPTY;
  private recipeId: number;

  constructor(
    private location: Location, 
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private imageService: ImageService,
    private snackBar: MatSnackBar,
    private store$: Store,
    formBuilder: FormBuilder,
  ) {
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.checkUser(); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    const files = $event.target.files;

    if (files.length > 0) {
      const file = files.item(0);
      if (this.typeFile.indexOf(file.type) !== -1) {
        this.getBase64(file)
          .then(base64string => {
            this.previewImage = base64string.toString();
            this.formData.controls.imageFile.patchValue(file);
          });
      } else {
        this.snackBar.open(`«Единственная реально ценная вещь – это интуиция» - 
        Альберт Эйнштейн. Попробуй ещё, у тебя обязательно получится! 
        Хочешь загружать не только картинки? https://clck.ru/VcNKK`, 'Закрыть', {
          duration: 10000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    }
  }

  public onDeleteImage(): void {
    this.previewImage = null;
    this.formData.patchValue({ imageFile: null });
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
        .then((editRecipe: EditRecipeDetailDto) => {
          this.updateFormData(editRecipe);       
        })
        .catch((response) => {
          this.isError = true;
          this.error = response;
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
      imageFile: [null],
      ingredients: this.formBuilder.array([
        this.buildIngredientGroup()
      ]),
      steps: this.formBuilder.array([
        this.buildStepGroup()
      ]),
    });
  }

  private updateFormData(editRecipeDetail: EditRecipeDetailDto): void {
    this.formData.controls.title.patchValue(editRecipeDetail.title);
    this.formData.controls.description.patchValue(editRecipeDetail.description);
    let keywords = this.formData.controls.keywords;
    editRecipeDetail.keywords.forEach(keyword => {
      (keywords as IFormArray<string>).push(new FormControl(keyword));
    });
    this.formData.controls.timeInMinutes.patchValue(editRecipeDetail.timeInMinutes);
    this.formData.controls.personsCount.patchValue(editRecipeDetail.personsCount);
    this.formData.controls.imageFile.patchValue(null);
    (this.formData.controls.ingredients as IFormArray<IngredientDto>).clear();
    let ingredients = this.formData.controls.ingredients;
    editRecipeDetail.ingredients.forEach(ingredient => {
      const fb = this.buildIngredientGroup();
      fb.patchValue(ingredient);
      ingredient.items.forEach(item => {
        (fb.controls.items as IFormArray<string>).push(new FormControl(item))
      });
      (ingredients as IFormArray<IngredientDto>).push(fb);
    });
    (this.formData.controls.steps as IFormArray<StepDto>).clear();
    let steps = this.formData.controls.steps;
    editRecipeDetail.steps.forEach(step => {
      const fb = this.buildStepGroup();
      fb.patchValue(step);
      (steps as IFormArray<StepDto>).push(fb);
    });
    this.previewImage = this.imageService.buildFullPath(editRecipeDetail.imagePath);
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
        this.previewImage = null;
      })
      .catch((response) => {
        let errorText;
        if (response.status === 401) {
          errorText = `Пожалуйста, войдите в свой аккаунт!`;
        } else {
          errorText = `- Как дела? - Проблема исправлена, таблицы теперь вообще нет.
          - Ок - Нет таблицы, нет проблем) Да ладно, просто однажды Эрнест 
          Херменгувей поспорил... For sale, baby shoes, never worn`;
        }
        this.snackBar.open(
          errorText, 'Закрыть', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
        })
      })
      .finally(() => {
        this.isLoadingActive = false;
      });
  }

  private onUpdateRecipe(): void {
    if (this.formData.value.imageFile === null && this.previewImage !== null) {
      this.onUpdateRecipeWithOutImage();
    } else {
      this.onUpdateRecipeWithImage();
    }
  }

  private onUpdateRecipeWithImage(): void {
    this.recipeService.updateRecipeWithImage(this.recipeId, this.formData.value)
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
        this.formData.reset(this.formData.value);
      });
  }

  private onUpdateRecipeWithOutImage(): void {
    const editRecipeDetailDto: EditRecipeDetailDto = {
      title: this.formData.value.title,
      description: this.formData.value.description,
      keywords: this.formData.value.keywords,
      imagePath: this.previewImage, 
      timeInMinutes: this.formData.value.timeInMinutes,
      personsCount: this.formData.value.personsCount,
      ingredients: this.formData.value.ingredients,
      steps: this.formData.value.steps,
    } as EditRecipeDetailDto;

    this.recipeService.updateRecipeWithOutImage(this.recipeId, editRecipeDetailDto)
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
        this.formData.reset(this.formData.value);
      });
  }

  private getBase64(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString());
    });
  }

  private checkUser(): void {
    const user: Observable<User> = this.store$.select(StoreSelectors.user);
    
    this.subscription = user.subscribe(() => {
      this.loadRecipe();
    });
  }
}
