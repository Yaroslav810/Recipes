import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './../../src/app/pages/main/main.component';
import { RecipesComponent } from './../../src/app/pages/recipes/recipes.component'
import { RecipeComponent } from './../../src/app/pages/recipe/recipe.component'
import { FavoritesComponent } from './../../src/app/pages/favorites/favorites.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { NotFoundComponent } from './../../src/app/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'add', component: AddRecipeComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }