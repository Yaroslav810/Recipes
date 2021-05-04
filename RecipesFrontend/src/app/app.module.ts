import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { HeaderComponent } from './directives/header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material-design-module';
import { SimpleCardComponent } from './directives/simple-card/simple-card.component';
import { MainCourseCardComponent } from './directives/main-course-card/main-course-card.component';
import { FooterComponent } from './directives/footer/footer.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { DishCardComponent } from './directives/dish-card/dish-card.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';



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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
