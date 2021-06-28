import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 

@NgModule({
  exports: [
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    DragDropModule,
    MatFormFieldModule,
  ]
})
export class MaterialModule { }