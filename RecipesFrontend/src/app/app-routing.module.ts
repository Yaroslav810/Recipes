import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../../src/app/pages/main/main.component';
import { RecipesComponent } from '../../src/app/pages/recipes/recipes.component'

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'recipes', component: RecipesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }