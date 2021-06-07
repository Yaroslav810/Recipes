import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeDto } from '../../dto/recipe/recipe-dto';
import { Mapper } from '../converters/mapper';
import { RecipeDetailDto } from 'src/app/dto/recipe-detail/recipe-detail-dto';
import { Recipe } from 'src/app/pages/recipe/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  private readonly recipeUrl = 'http://localhost:5000/api/recipe';

  constructor(private httpClient: HttpClient) { }

  public async getRecipeDetail(recipeId: number): Promise<Recipe> {
    const recipe = await this.getRecipeDetailRequest(recipeId);
    return recipe ? Mapper.convertToRecipe(recipe) : null;
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

  private async getRecipeDetailRequest(recipeId: number): Promise<RecipeDetailDto> {
    const url = `${this.recipeUrl}/${recipeId}`;
    return await this.httpClient
      .get<RecipeDetailDto>(url)
      .toPromise();
  }
}
