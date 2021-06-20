import { Injectable } from '@angular/core';
import { RecipeApi } from '../../constants/RecipeApi';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  public buildFullPath(imageName: string) {
    return imageName ? RecipeApi.staticUrl + 'images' + imageName : null;
  }
}
