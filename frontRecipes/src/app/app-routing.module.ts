import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { RecipesComponent } from './pages/recipes/recipes.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: '/recipes', component: RecipesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }