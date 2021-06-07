import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeDto } from '../../dto/recipe/recipe-dto';
import { DishCard } from 'src/app/components/dish-card/dish-card';
import { Mapper } from '../converters/mapper';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private readonly recipesUrl = 'http://localhost:5000/api/recipes';

  constructor(private httpClient: HttpClient) { }

  public async getRecipes(searchString: string, take: number, skip: number): Promise<DishCard[]> {
    const recipes = await this.getRecipesRequest(searchString, take ,skip);

    return recipes.map((recipeDto: RecipeDto) => Mapper.convertToDishCard(recipeDto));
  }

  private async getRecipesRequest(searchString: string, take: number, skip: number): Promise<RecipeDto[]> {
    const params = new HttpParams()
      .set('searchString', searchString)
      .set('take', take.toString())
      .set('skip', skip.toString());
    return await this.httpClient
      .get<RecipeDto[]>(this.recipesUrl, { params })
      .toPromise();
  }
}
