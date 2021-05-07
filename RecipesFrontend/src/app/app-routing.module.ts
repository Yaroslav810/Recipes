import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { RecipesComponent } from './pages/recipes/recipes.component'
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'add', component: AddRecipeComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }