import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './../../src/app/pages/main/main.component';
import { RecipesComponent } from './../../src/app/pages/recipes/recipes.component'
import { FavoritesComponent } from './../../src/app/pages/favorites/favorites.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'favorites', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }