import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDataDeactivateGuard } from './guards/user-data-deactivate/user-data-deactivate.guard';
import { AuthenticationAccessGuard } from './guards/authentication-access/authentication-access.guard';

import { MainComponent } from './pages/main/main.component';
import { RecipesComponent } from './pages/recipes/recipes.component'
import { RecipeComponent } from './pages/recipe/recipe.component'
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { EditRecipeComponent } from './pages/edit-recipe/edit-recipe.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthenticationAccessGuard] },
  { path: 'edit', component: EditRecipeComponent, 
    canDeactivate: [UserDataDeactivateGuard], 
    children: [
      { path: ':id', component: EditRecipeComponent, canActivate: [AuthenticationAccessGuard] }
    ] 
  },
  { path: 'user', component: UserComponent, canActivate: [AuthenticationAccessGuard] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  providers: [UserDataDeactivateGuard],
})
export class AppRoutingModule { }
