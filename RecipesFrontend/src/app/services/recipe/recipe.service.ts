import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditRecipeDto } from 'src/app/dto/edit-recipe/edit-recipe-dto';

import { RecipeApi } from '../../constants/RecipeApi';
import { RecipeDetailDto } from '../../dto/recipe-detail/recipe-detail-dto';

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

  public async getRecipeForEdit(recipeId: number): Promise<EditRecipeDto> {
    const url = `${this.recipeUrl}/${recipeId}/edit`;
    const recipe = await this.httpClient
                    .get<EditRecipeDto>(url)
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

  public async addRecipe(recipe: EditRecipeDto): Promise<void> {
    const url = `${this.recipeUrl}/add`;
    await this.httpClient
      .post(url, recipe)
      .toPromise();
  }

  public async updateRecipe(recipeId: number, editRecipe: EditRecipeDto): Promise<void> {
    const url = `${this.recipeUrl}/${recipeId}/update`;
    await this.httpClient
      .post(url, editRecipe)
      .toPromise();
  }
}
