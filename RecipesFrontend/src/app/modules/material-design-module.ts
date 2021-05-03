import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [
    MatListModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class MaterialModule { }