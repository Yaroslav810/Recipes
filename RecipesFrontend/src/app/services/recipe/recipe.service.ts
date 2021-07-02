import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RecipeApi } from '../../constants/RecipeApi';
import { RecipeDetailDto } from '../../dto/recipe-detail/recipe-detail-dto';
import { EditRecipeDto } from '../../dto/edit-recipe/edit-recipe-dto';
import { EditRecipeDetailDto } from '../../dto/edit-recipe-detail/edit-recipe-detail-dto';
import { RecipeOfDayDto } from '../../dto/recipe-of-day/recipe-of-day-dto';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  private readonly recipeUrl = RecipeApi.baseUrl + '/api/recipe';

  constructor(private httpClient: HttpClient) { }

  public async getRecipeDetail(recipeId: number): Promise<RecipeDetailDto> {
    const url = `${this.recipeUrl}/${recipeId}`;
    const recipe = await this.httpClient
                    .get<RecipeDetailDto>(url)
                    .toPromise();
    return recipe ?? null;
  }

  public async getRecipeOfDay(): Promise<RecipeOfDayDto> {
    const url = `${this.recipeUrl}/day`;

    return await this.httpClient
      .get<RecipeOfDayDto>(url)
      .toPromise() ?? null;
  }

  public async isRecipeEditable(recipeId: number): Promise<boolean> {
    const url = `${this.recipeUrl}/${recipeId}/is-editable`;
    return await this.httpClient
                    .get<boolean>(url)
                    .toPromise();
  }

  public async getRecipeForEdit(recipeId: number): Promise<EditRecipeDetailDto> {
    const url = `${this.recipeUrl}/${recipeId}/edit`;
    const recipe = await this.httpClient
                    .get<EditRecipeDetailDto>(url)
                    .toPromise();
    return recipe ?? null;
  }

  public async addLike(recipeId: number): Promise<void> {
    const url = `${this.recipeUrl}/${recipeId}/add-like`;
    await this.httpClient
      .get<void>(url)
      .toPromise();
  }

  public async removeLike(recipeId: number): Promise<void> {
    const url = `${this.recipeUrl}/${recipeId}/remove-like`;
    await this.httpClient
      .get<void>(url)
      .toPromise();
  }

  public async addToFavourite(recipeId: number): Promise<void> {
    const url = `${this.recipeUrl}/${recipeId}/add-favourite`;
    await this.httpClient
      .get<void>(url)
      .toPromise();
  }

  public async removeFromFavourite(recipeId: number): Promise<void> {
    const url = `${this.recipeUrl}/${recipeId}/remove-favourite`;
    await this.httpClient
      .get<void>(url)
      .toPromise();
  }

  public async addRecipe(addRecipe: EditRecipeDto): Promise<void> {
    const url = `${this.recipeUrl}/add`;

    const formData = new FormData();
    const data: string = JSON.stringify({
      title: addRecipe.title,
      description: addRecipe.description,
      keywords: addRecipe.keywords,
      timeInMinutes: addRecipe.timeInMinutes,
      personsCount: addRecipe.personsCount,
      ingredients: addRecipe.ingredients,
      steps: addRecipe.steps,
    });
    formData.append('imageFile', addRecipe.imageFile);
    formData.append('data', data);
       
    await this.httpClient
      .post(url, formData)
      .toPromise();
  }

  public async deleteRecipe(recipeId: number): Promise<boolean> {
    const url = `${this.recipeUrl}/${recipeId}/delete`;

    return await this.httpClient
      .post<boolean>(url, {})
      .toPromise();
  }

  public async updateRecipeWithImage(recipeId: number, editRecipe: EditRecipeDto): Promise<void> {
    const url = `${this.recipeUrl}/${recipeId}/update-with-image`;

    const formData = new FormData();
    const data: string = JSON.stringify({
      title: editRecipe.title,
      description: editRecipe.description,
      keywords: editRecipe.keywords,
      timeInMinutes: editRecipe.timeInMinutes,
      personsCount: editRecipe.personsCount,
      ingredients: editRecipe.ingredients,
      steps: editRecipe.steps,
    });
    formData.append('imageFile', editRecipe.imageFile);
    formData.append('data', data);

    await this.httpClient
      .post(url, formData)
      .toPromise();
  }

  public async updateRecipeWithOutImage(recipeId: number, editRecipeDetailDto: EditRecipeDetailDto): Promise<void> {
    const url = `${this.recipeUrl}/${recipeId}/update-without-image`;

    await this.httpClient
      .post(url, editRecipeDetailDto)
      .toPromise();
  }
}
