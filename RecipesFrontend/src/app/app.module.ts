import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material-design-module';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SimpleCardComponent } from './components/simple-card/simple-card.component';
import { MainCourseCardComponent } from './components/main-course-card/main-course-card.component';
import { DishCardComponent } from './components/dish-card/dish-card.component';
import { StepCardComponent } from './components/step-card/step-card.component';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { DataLossModalComponent } from './components/data-loss-modal/data-loss-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RecipesComponent,
    HeaderComponent,
    SimpleCardComponent,
    MainCourseCardComponent,
    FooterComponent,
    FavoritesComponent,
    DishCardComponent,
    NotFoundComponent,
    RecipeComponent,
    StepCardComponent,
    AddRecipeComponent,
    DataLossModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
