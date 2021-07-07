import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  public warning: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    this.warning = data;
  }

  ngOnInit(): void {
  }

}
