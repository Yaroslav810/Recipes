import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-identification-window-modal',
  templateUrl: './identification-window-modal.component.html',
  styleUrls: ['./identification-window-modal.component.css']
})
export class IdentificationWindowModalComponent implements OnInit {

  public currentPage: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { 
    this.currentPage = data;
  }

  ngOnInit(): void {  }

  public changePage(path: string): void {
    this.currentPage = path;
  }

}