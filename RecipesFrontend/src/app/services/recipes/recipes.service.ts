import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RecipeApi } from '../../constants/RecipeApi';
import { RecipeDto } from '../../dto/recipe/recipe-dto';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private readonly recipesUrl = RecipeApi.baseUrl + '/api/recipes';

  constructor(private httpClient: HttpClient) { }

  public async getRecipes(searchString: string, take: number, skip: number): Promise<RecipeDto[]> {
    const params = new HttpParams()
      .set('searchString', searchString)
      .set('take', take.toString())
      .set('skip', skip.toString());
      
    return await this.httpClient
            .get<RecipeDto[]>(this.recipesUrl, { params })
            .toPromise();
  }
}
