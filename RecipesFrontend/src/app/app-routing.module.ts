import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDataDeactivateGuard } from './guards/user-data-deactivate.guard';

import { MainComponent } from './../../src/app/pages/main/main.component';
import { RecipesComponent } from './../../src/app/pages/recipes/recipes.component'
import { RecipeComponent } from './../../src/app/pages/recipe/recipe.component'
import { FavoritesComponent } from './../../src/app/pages/favorites/favorites.component';
import { EditRecipeComponent } from './pages/edit-recipe/edit-recipe.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'edit', component: EditRecipeComponent, canDeactivate: [UserDataDeactivateGuard], children: [
    { path: ':id', component: EditRecipeComponent } // TODO: Добавить canDeactivate
  ] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  providers: [UserDataDeactivateGuard],
})
export class AppRoutingModule { }